"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCache = exports.buildDefaultLocalAdapterCache = exports.AdapterCache = exports.redactOptions = exports.defaultOptions = void 0;
const tslib_1 = require("tslib");
const modules_1 = require("../../modules");
const burst_limit_1 = require("../burst-limit");
const util_1 = require("../../util");
const ttl_1 = require("./ttl");
const local = tslib_1.__importStar(require("./local"));
const metrics = tslib_1.__importStar(require("./metrics"));
const redis = tslib_1.__importStar(require("./redis"));
const DEFAULT_CACHE_KEY_GROUP = util_1.uuid();
const defaultOptions = (shouldUseLocal, adapterContext) => {
    return {
        enabled: util_1.parseBool(util_1.getEnv('CACHE_ENABLED', undefined, adapterContext)),
        cacheImplOptions: shouldUseLocal ? local.defaultOptions() : defaultCacheImplOptions(),
        cacheBuilder: defaultCacheBuilder(),
        key: {
            group: util_1.getEnv('CACHE_KEY_GROUP') || DEFAULT_CACHE_KEY_GROUP,
        },
        // Request coalescing
        requestCoalescing: {
            enabled: util_1.parseBool(util_1.getEnv('REQUEST_COALESCING_ENABLED')),
            // Capped linear back-off: 100, 200, 400, 800, 1000..
            interval: Number(util_1.getEnv('REQUEST_COALESCING_INTERVAL')),
            intervalMax: Number(util_1.getEnv('REQUEST_COALESCING_INTERVAL_MAX')),
            intervalCoefficient: Number(util_1.getEnv('REQUEST_COALESCING_INTERVAL_COEFFICIENT')),
            // Add entropy to absorb bursts
            entropyMax: Number(util_1.getEnv('REQUEST_COALESCING_ENTROPY_MAX')),
            maxRetries: Number(util_1.getEnv('REQUEST_COALESCING_MAX_RETRIES')),
        },
        minimumAge: Number(util_1.getEnv('CACHE_MIN_AGE')),
    };
};
exports.defaultOptions = defaultOptions;
const defaultCacheImplOptions = () => {
    const type = util_1.getEnv('CACHE_TYPE');
    const options = type === 'redis' ? redis.defaultOptions() : local.defaultOptions();
    return options;
};
const defaultCacheBuilder = () => {
    return async (options) => {
        switch (options.type) {
            case 'redis': {
                return await redis.RedisCache.build(options);
            }
            default: {
                return await Promise.resolve(local.LocalLRUCache.getInstance(options));
            }
        }
    };
};
// Options without sensitive data
const redactOptions = (options) => ({
    ...options,
    cacheImplOptions: options.cacheImplOptions.type === 'redis'
        ? redis.redactOptions(options.cacheImplOptions)
        : local.redactOptions(options.cacheImplOptions),
});
exports.redactOptions = redactOptions;
class AdapterCache {
    constructor(context) {
        if (!context?.cache?.instance)
            throw Error(`cache not initiated`);
        const { cache: options, cache: { instance: cache }, } = context;
        this.options = options;
        this.cache = cache;
    }
    getKey(key) {
        return `${this.options.key.group}:${key}`;
    }
    get instance() {
        return this.cache;
    }
    getCoalescingKey(key) {
        return `inFlight:${key}`;
    }
    async setInFlightMarker(key, maxAge) {
        if (!this.options.requestCoalescing.enabled)
            return;
        await this.cache.setFlightMarker(key, maxAge);
        modules_1.logger.debug(`Request coalescing: SET ${key}`);
    }
    async delInFlightMarker(key) {
        if (!this.options.requestCoalescing.enabled)
            return;
        await this.cache.del(key);
        modules_1.logger.debug(`Request coalescing: DEL ${key}`);
    }
    getWithCoalescing(key) {
        return util_1.getWithCoalescing({
            get: async (retryCount) => {
                const entry = await this.cache.getResponse(key);
                if (entry)
                    modules_1.logger.debug(`Request coalescing: GET on retry #${retryCount}`);
                return entry;
            },
            isInFlight: async (retryCount) => {
                if (retryCount === 1 && this.options.requestCoalescing.entropyMax) {
                    // Add some entropy here because of possible scenario where the key won't be set before multiple
                    // other instances in a burst request try to access the coalescing key.
                    const randomMs = Math.random() * this.options.requestCoalescing.entropyMax;
                    await util_1.sleep(randomMs);
                }
                const inFlight = await this.cache.getFlightMarker(this.getCoalescingKey(key));
                modules_1.logger.debug(`Request coalescing: CHECK inFlight:${inFlight} on retry #${retryCount}`);
                return inFlight;
            },
            retries: this.options.requestCoalescing.maxRetries,
            interval: (retryCount) => util_1.exponentialBackOffMs(retryCount, this.options.requestCoalescing.interval, this.options.requestCoalescing.intervalMax, this.options.requestCoalescing.intervalCoefficient),
        });
    }
    async getResultForRequest(adapterRequest) {
        if (!adapterRequest?.debug?.cacheKey)
            throw new Error('Cache key not found');
        const key = this.getKey(adapterRequest.debug.cacheKey);
        const observe = metrics.beginObserveCacheMetrics({
            isFromWs: !!adapterRequest.debug?.ws,
            participantId: key,
            feedId: adapterRequest.metricsMeta?.feedId || 'N/A',
        });
        const cachedAdapterResponse = this.options.requestCoalescing.enabled
            ? await this.getWithCoalescing(key)
            : await this.cache.getResponse(key);
        if (cachedAdapterResponse) {
            const maxAgeOverride = ttl_1.getMaxAgeOverride(adapterRequest);
            if (adapterRequest?.debug?.warmer)
                modules_1.logger.trace(`Cache: SKIP(Cache Warmer middleware)`);
            else if (adapterRequest?.debug?.ws)
                modules_1.logger.trace(`Cache: SKIP(Websockets middleware)`);
            else if (maxAgeOverride && maxAgeOverride < 0)
                modules_1.logger.trace(`Cache: SKIP(maxAge < 0)`);
            else {
                modules_1.logger.trace(`Cache: GET ${key}`, cachedAdapterResponse);
                const ttl = await this.cache.ttl(key);
                // TODO: isnt this a bug? cachedAdapterResponse.maxAge will be different
                // if the above conditional gets executed!
                const staleness = (cachedAdapterResponse.maxAge - ttl) / 1000;
                const debug = {
                    ...cachedAdapterResponse?.debug,
                    cacheHit: true,
                    staleness,
                    performance: observe.stalenessAndExecutionTime(true, staleness),
                    providerCost: 0,
                };
                // we should be smarter about this in the future
                // and allow path configuration if result is not a number or string
                observe.cacheGet({ value: cachedAdapterResponse.result });
                const response = {
                    jobRunID: adapterRequest.id,
                    ...cachedAdapterResponse,
                    debug,
                };
                return response;
            }
        }
        return undefined;
    }
}
exports.AdapterCache = AdapterCache;
const handleFailedCacheRead = async (adapterRequest, context, error, execute, adapterCache) => {
    const type = util_1.getEnv('CACHE_TYPE');
    if (type === 'local') {
        modules_1.logger.warn('Cache type already set to local.  Passing through...');
        return await execute(adapterRequest, context);
    }
    try {
        modules_1.logger.warn('Trying to fetch from local cache.', error);
        return await adapterCache.getResultForRequest(adapterRequest);
    }
    catch (error) {
        modules_1.logger.warn('Failed to fetch response from local cache.  Passing through...');
        return await execute(adapterRequest, context);
    }
};
const buildDefaultLocalAdapterCache = async (context) => {
    const options = exports.defaultOptions(true, context);
    options.instance = await options.cacheBuilder(options.cacheImplOptions);
    return new AdapterCache({
        ...context,
        cache: {
            ...context.cache,
            instance: options.instance,
        },
    });
};
exports.buildDefaultLocalAdapterCache = buildDefaultLocalAdapterCache;
const withCache = (rateLimit) => async (execute, context) => {
    // If disabled noop
    if (!context?.cache?.instance)
        return (data) => execute(data, context);
    const adapterCache = new AdapterCache(context);
    const localAdapterCache = await exports.buildDefaultLocalAdapterCache(context);
    const { cache: options, cache: { instance: cache }, } = context;
    return async (adapterRequest) => {
        let cacheToUse = cache;
        let adapterCacheToUse = adapterCache;
        if (!adapterRequest?.debug?.cacheKey)
            throw new Error('Cache key not found');
        const key = adapterCacheToUse.getKey(adapterRequest.debug.cacheKey);
        const coalescingKey = adapterCacheToUse.getCoalescingKey(key);
        const observe = metrics.beginObserveCacheMetrics({
            isFromWs: !!adapterRequest.debug?.ws,
            participantId: key,
            feedId: adapterRequest.metricsMeta?.feedId || 'N/A',
        });
        const tryDoDistributedCacheAction = async (fn) => {
            try {
                return await fn();
            }
            catch (error) {
                const response = await handleFailedCacheRead(adapterRequest, context, error, execute, localAdapterCache);
                if (response) {
                    return response;
                }
                cacheToUse = localAdapterCache.instance;
                adapterCacheToUse = localAdapterCache;
            }
        };
        const adapterResponse = await tryDoDistributedCacheAction(async () => await adapterCacheToUse.getResultForRequest(adapterRequest));
        if (adapterResponse)
            return adapterResponse;
        const maxAge = ttl_1.getTTL(adapterRequest, options);
        const inFlightMarkerResponse = await tryDoDistributedCacheAction(async () => await adapterCacheToUse.setInFlightMarker(coalescingKey, maxAge));
        if (inFlightMarkerResponse)
            return inFlightMarkerResponse;
        const burstRateLimit = burst_limit_1.withBurstLimit(rateLimit);
        const executeWithBackoff = await burstRateLimit(execute, context);
        const result = await executeWithBackoff(adapterRequest, context);
        try {
            // Add successful result to cache
            const _cacheOnSuccess = async ({ statusCode, data, result, debug, }) => {
                if (statusCode === 200) {
                    const debugBatchablePropertyPath = debug
                        ? { batchablePropertyPath: debug.batchablePropertyPath }
                        : {};
                    const entry = {
                        statusCode,
                        data,
                        result,
                        maxAge,
                        debug: debugBatchablePropertyPath,
                    };
                    // we should observe non-200 entries too
                    await cacheToUse.setResponse(key, entry, maxAge);
                    observe.cacheSet({ statusCode, maxAge });
                    modules_1.logger.trace(`Cache: SET ${key}`, entry);
                    // Individually cache batch requests
                    if (data?.results) {
                        for (const batchParticipant of Object.values(data.results)) {
                            const [key, , result] = batchParticipant;
                            const childKey = adapterCacheToUse.getKey(key);
                            const debugBatchablePropertyPath = debug
                                ? { batchablePropertyPath: debug.batchablePropertyPath }
                                : {};
                            const entryBatchParticipant = {
                                statusCode,
                                data: { result },
                                result,
                                maxAge,
                                debug: debugBatchablePropertyPath,
                            };
                            await cacheToUse.setResponse(childKey, entryBatchParticipant, maxAge);
                            modules_1.logger.trace(`Cache Split Batch: SET ${childKey}`, entryBatchParticipant);
                        }
                    }
                }
                // Notify pending requests by removing the in-flight mark
                await adapterCacheToUse.delInFlightMarker(coalescingKey);
            };
            await _cacheOnSuccess(result);
            const debug = {
                staleness: 0,
                performance: observe.stalenessAndExecutionTime(false, 0),
                providerCost: result.data.cost || 1,
            };
            return { ...result, debug: { ...debug, ...result.debug } };
        }
        catch (error) {
            return result;
        }
    };
};
exports.withCache = withCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21pZGRsZXdhcmUvY2FjaGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BLDJDQUFzQztBQUd0QyxnREFBK0M7QUFDL0MscUNBQW9HO0FBQ3BHLCtCQUFpRDtBQUNqRCx1REFBZ0M7QUFFaEMsMkRBQW9DO0FBQ3BDLHVEQUFnQztBQUdoQyxNQUFNLHVCQUF1QixHQUFHLFdBQUksRUFBRSxDQUFBO0FBdUIvQixNQUFNLGNBQWMsR0FBRyxDQUM1QixjQUF3QixFQUN4QixjQUErQixFQUNqQixFQUFFO0lBQ2hCLE9BQU87UUFDTCxPQUFPLEVBQUUsZ0JBQVMsQ0FBQyxhQUFNLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RSxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLEVBQUU7UUFDckYsWUFBWSxFQUFFLG1CQUFtQixFQUFFO1FBQ25DLEdBQUcsRUFBRTtZQUNILEtBQUssRUFBRSxhQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSx1QkFBdUI7U0FDNUQ7UUFDRCxxQkFBcUI7UUFDckIsaUJBQWlCLEVBQUU7WUFDakIsT0FBTyxFQUFFLGdCQUFTLENBQUMsYUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDeEQscURBQXFEO1lBQ3JELFFBQVEsRUFBRSxNQUFNLENBQUMsYUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDdkQsV0FBVyxFQUFFLE1BQU0sQ0FBQyxhQUFNLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUM5RCxtQkFBbUIsRUFBRSxNQUFNLENBQUMsYUFBTSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7WUFDOUUsK0JBQStCO1lBQy9CLFVBQVUsRUFBRSxNQUFNLENBQUMsYUFBTSxDQUFDLGdDQUFnQyxD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RUFBRSxLQUFLLENBQUMscUJBQXFCLEVBQUU7Z0NBQ3hELENBQUMsQ0FBQyxFQUFFLENBQUE7NEJBQ04sTUFBTSxxQkFBcUIsR0FBRztnQ0FDNUIsVUFBVTtnQ0FDVixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUU7Z0NBQ2hCLE1BQU07Z0NBQ04sTUFBTTtnQ0FDTixLQUFLLEVBQUUsMEJBQTBCOzZCQUNsQyxDQUFBOzRCQUNELE1BQU0sVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUE7NEJBQ3JFLGdCQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixRQUFRLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO3lCQUMxRTtxQkFDRjtpQkFDRjtnQkFDRCx5REFBeUQ7Z0JBQ3pELE1BQU0saUJBQWlCLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDMUQsQ0FBQyxDQUFBO1lBQ0QsTUFBTSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFN0IsTUFBTSxLQUFLLEdBQUc7Z0JBQ1osU0FBUyxFQUFFLENBQUM7Z0JBQ1osV0FBVyxFQUFFLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQzthQUNwQyxDQUFBO1lBQ0QsT0FBTyxFQUFFLEdBQUcsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUE7U0FDM0Q7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sTUFBTSxDQUFBO1NBQ2Q7SUFDSCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUE7QUE1SFUsUUFBQSxTQUFTLGFBNEhuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFkYXB0ZXJDb250ZXh0LFxuICBBZGFwdGVyUmVxdWVzdCxcbiAgQWRhcHRlclJlc3BvbnNlLFxuICBFeGVjdXRlLFxuICBNaWRkbGV3YXJlLFxufSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vbW9kdWxlcydcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyByZWR1Y2VyIH0gZnJvbSAnLi4vYnVyc3QtbGltaXQnXG5pbXBvcnQgeyB3aXRoQnVyc3RMaW1pdCB9IGZyb20gJy4uL2J1cnN0LWxpbWl0J1xuaW1wb3J0IHsgZXhwb25lbnRpYWxCYWNrT2ZmTXMsIGdldEVudiwgZ2V0V2l0aENvYWxlc2NpbmcsIHBhcnNlQm9vbCwgdXVpZCwgc2xlZXAgfSBmcm9tICcuLi8uLi91dGlsJ1xuaW1wb3J0IHsgZ2V0TWF4QWdlT3ZlcnJpZGUsIGdldFRUTCB9IGZyb20gJy4vdHRsJ1xuaW1wb3J0ICogYXMgbG9jYWwgZnJvbSAnLi9sb2NhbCdcbmltcG9ydCB7IExvY2FsT3B0aW9ucyB9IGZyb20gJy4vbG9jYWwnXG5pbXBvcnQgKiBhcyBtZXRyaWNzIGZyb20gJy4vbWV0cmljcydcbmltcG9ydCAqIGFzIHJlZGlzIGZyb20gJy4vcmVkaXMnXG5pbXBvcnQgeyBDYWNoZUVudHJ5IH0gZnJvbSAnLi90eXBlcydcblxuY29uc3QgREVGQVVMVF9DQUNIRV9LRVlfR1JPVVAgPSB1dWlkKClcblxuZXhwb3J0IHR5cGUgQ2FjaGUgPSByZWRpcy5SZWRpc0NhY2hlIHwgbG9jYWwuTG9jYWxMUlVDYWNoZVxuXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlT3B0aW9ucyB7XG4gIGluc3RhbmNlPzogQ2FjaGVcbiAgZW5hYmxlZDogYm9vbGVhblxuICBjYWNoZUltcGxPcHRpb25zOiBsb2NhbC5Mb2NhbE9wdGlvbnMgfCByZWRpcy5SZWRpc09wdGlvbnNcbiAgY2FjaGVCdWlsZGVyOiAob3B0aW9uczogQ2FjaGVJbXBsT3B0aW9ucykgPT4gUHJvbWlzZTxyZWRpcy5SZWRpc0NhY2hlIHwgbG9jYWwuTG9jYWxMUlVDYWNoZT5cbiAga2V5OiB7XG4gICAgZ3JvdXA6IHN0cmluZ1xuICB9XG4gIHJlcXVlc3RDb2FsZXNjaW5nOiB7XG4gICAgZW5hYmxlZDogYm9vbGVhblxuICAgIGludGVydmFsOiBudW1iZXJcbiAgICBpbnRlcnZhbE1heDogbnVtYmVyXG4gICAgaW50ZXJ2YWxDb2VmZmljaWVudDogbnVtYmVyXG4gICAgZW50cm9weU1heDogbnVtYmVyXG4gICAgbWF4UmV0cmllczogbnVtYmVyXG4gIH1cbiAgbWluaW11bUFnZTogbnVtYmVyXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IChcbiAgc2hvdWxkVXNlTG9jYWw/OiBib29sZWFuLFxuICBhZGFwdGVyQ29udGV4dD86IEFkYXB0ZXJDb250ZXh0LFxuKTogQ2FjaGVPcHRpb25zID0+IHtcbiAgcmV0dXJuIHtcbiAgICBlbmFibGVkOiBwYXJzZUJvb2woZ2V0RW52KCdDQUNIRV9FTkFCTEVEJywgdW5kZWZpbmVkLCBhZGFwdGVyQ29udGV4dCkpLFxuICAgIGNhY2hlSW1wbE9wdGlvbnM6IHNob3VsZFVzZUxvY2FsID8gbG9jYWwuZGVmYXVsdE9wdGlvbnMoKSA6IGRlZmF1bHRDYWNoZUltcGxPcHRpb25zKCksXG4gICAgY2FjaGVCdWlsZGVyOiBkZWZhdWx0Q2FjaGVCdWlsZGVyKCksXG4gICAga2V5OiB7XG4gICAgICBncm91cDogZ2V0RW52KCdDQUNIRV9LRVlfR1JPVVAnKSB8fCBERUZBVUxUX0NBQ0hFX0tFWV9HUk9VUCxcbiAgICB9LFxuICAgIC8vIFJlcXVlc3QgY29hbGVzY2luZ1xuICAgIHJlcXVlc3RDb2FsZXNjaW5nOiB7XG4gICAgICBlbmFibGVkOiBwYXJzZUJvb2woZ2V0RW52KCdSRVFVRVNUX0NPQUxFU0NJTkdfRU5BQkxFRCcpKSxcbiAgICAgIC8vIENhcHBlZCBsaW5lYXIgYmFjay1vZmY6IDEwMCwgMjAwLCA0MDAsIDgwMCwgMTAwMC4uXG4gICAgICBpbnRlcnZhbDogTnVtYmVyKGdldEVudignUkVRVUVTVF9DT0FMRVNDSU5HX0lOVEVSVkFMJykpLFxuICAgICAgaW50ZXJ2YWxNYXg6IE51bWJlcihnZXRFbnYoJ1JFUVVFU1RfQ09BTEVTQ0lOR19JTlRFUlZBTF9NQVgnKSksXG4gICAgICBpbnRlcnZhbENvZWZmaWNpZW50OiBOdW1iZXIoZ2V0RW52KCdSRVFVRVNUX0NPQUxFU0NJTkdfSU5URVJWQUxfQ09FRkZJQ0lFTlQnKSksXG4gICAgICAvLyBBZGQgZW50cm9weSB0byBhYnNvcmIgYnVyc3RzXG4gICAgICBlbnRyb3B5TWF4OiBOdW1iZXIoZ2V0RW52KCdSRVFVRVNUX0NPQUxFU0NJTkdfRU5UUk9QWV9NQVgnKSksXG4gICAgICBtYXhSZXRyaWVzOiBOdW1iZXIoZ2V0RW52KCdSRVFVRVNUX0NPQUxFU0NJTkdfTUFYX1JFVFJJRVMnKSksXG4gICAgfSxcbiAgICBtaW5pbXVtQWdlOiBOdW1iZXIoZ2V0RW52KCdDQUNIRV9NSU5fQUdFJykpLFxuICB9XG59XG5cbmV4cG9ydCB0eXBlIENhY2hlSW1wbE9wdGlvbnMgPSBMb2NhbE9wdGlvbnMgfCByZWRpcy5SZWRpc09wdGlvbnNcbmNvbnN0IGRlZmF1bHRDYWNoZUltcGxPcHRpb25zID0gKCk6IENhY2hlSW1wbE9wdGlvbnMgPT4ge1xuICBjb25zdCB0eXBlID0gZ2V0RW52KCdDQUNIRV9UWVBFJylcbiAgY29uc3Qgb3B0aW9ucyA9IHR5cGUgPT09ICdyZWRpcycgPyByZWRpcy5kZWZhdWx0T3B0aW9ucygpIDogbG9jYWwuZGVmYXVsdE9wdGlvbnMoKVxuICByZXR1cm4gb3B0aW9uc1xufVxuXG5jb25zdCBkZWZhdWx0Q2FjaGVCdWlsZGVyID0gKCkgPT4ge1xuICByZXR1cm4gYXN5bmMgKG9wdGlvbnM6IENhY2hlSW1wbE9wdGlvbnMpID0+IHtcbiAgICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgICAgY2FzZSAncmVkaXMnOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCByZWRpcy5SZWRpc0NhY2hlLmJ1aWxkKG9wdGlvbnMgYXMgcmVkaXMuUmVkaXNPcHRpb25zKVxuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGxvY2FsLkxvY2FsTFJVQ2FjaGUuZ2V0SW5zdGFuY2Uob3B0aW9ucykpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIE9wdGlvbnMgd2l0aG91dCBzZW5zaXRpdmUgZGF0YVxuZXhwb3J0IGNvbnN0IHJlZGFjdE9wdGlvbnMgPSAob3B0aW9uczogQ2FjaGVPcHRpb25zKTogQ2FjaGVPcHRpb25zID0+ICh7XG4gIC4uLm9wdGlvbnMsXG4gIGNhY2hlSW1wbE9wdGlvbnM6XG4gICAgb3B0aW9ucy5jYWNoZUltcGxPcHRpb25zLnR5cGUgPT09ICdyZWRpcydcbiAgICAgID8gcmVkaXMucmVkYWN0T3B0aW9ucyhvcHRpb25zLmNhY2hlSW1wbE9wdGlvbnMgYXMgcmVkaXMuUmVkaXNPcHRpb25zKVxuICAgICAgOiBsb2NhbC5yZWRhY3RPcHRpb25zKG9wdGlvbnMuY2FjaGVJbXBsT3B0aW9ucyksXG59KVxuXG5leHBvcnQgY2xhc3MgQWRhcHRlckNhY2hlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zOiBDYWNoZU9wdGlvbnNcbiAgcHJpdmF0ZSBjYWNoZTogQ2FjaGVcblxuICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBZGFwdGVyQ29udGV4dCkge1xuICAgIGlmICghY29udGV4dD8uY2FjaGU/Lmluc3RhbmNlKSB0aHJvdyBFcnJvcihgY2FjaGUgbm90IGluaXRpYXRlZGApXG5cbiAgICBjb25zdCB7XG4gICAgICBjYWNoZTogb3B0aW9ucyxcbiAgICAgIGNhY2hlOiB7IGluc3RhbmNlOiBjYWNoZSB9LFxuICAgIH0gPSBjb250ZXh0XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuY2FjaGUgPSBjYWNoZVxuICB9XG5cbiAgcHVibGljIGdldEtleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMub3B0aW9ucy5rZXkuZ3JvdXB9OiR7a2V5fWBcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5zdGFuY2UoKTogQ2FjaGUge1xuICAgIHJldHVybiB0aGlzLmNhY2hlXG4gIH1cblxuICBwdWJsaWMgZ2V0Q29hbGVzY2luZ0tleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBpbkZsaWdodDoke2tleX1gXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0SW5GbGlnaHRNYXJrZXIoa2V5OiBzdHJpbmcsIG1heEFnZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVxdWVzdENvYWxlc2NpbmcuZW5hYmxlZCkgcmV0dXJuXG4gICAgYXdhaXQgdGhpcy5jYWNoZS5zZXRGbGlnaHRNYXJrZXIoa2V5LCBtYXhBZ2UpXG4gICAgbG9nZ2VyLmRlYnVnKGBSZXF1ZXN0IGNvYWxlc2Npbmc6IFNFVCAke2tleX1gKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlbEluRmxpZ2h0TWFya2VyKGtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVxdWVzdENvYWxlc2NpbmcuZW5hYmxlZCkgcmV0dXJuXG4gICAgYXdhaXQgdGhpcy5jYWNoZS5kZWwoa2V5KVxuICAgIGxvZ2dlci5kZWJ1ZyhgUmVxdWVzdCBjb2FsZXNjaW5nOiBERUwgJHtrZXl9YClcbiAgfVxuXG4gIHB1YmxpYyBnZXRXaXRoQ29hbGVzY2luZyhrZXk6IHN0cmluZyk6IFByb21pc2U8dW5kZWZpbmVkIHwgQ2FjaGVFbnRyeT4ge1xuICAgIHJldHVybiBnZXRXaXRoQ29hbGVzY2luZyh7XG4gICAgICBnZXQ6IGFzeW5jIChyZXRyeUNvdW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgZW50cnkgPSBhd2FpdCB0aGlzLmNhY2hlLmdldFJlc3BvbnNlKGtleSlcbiAgICAgICAgaWYgKGVudHJ5KSBsb2dnZXIuZGVidWcoYFJlcXVlc3QgY29hbGVzY2luZzogR0VUIG9uIHJldHJ5ICMke3JldHJ5Q291bnR9YClcbiAgICAgICAgcmV0dXJuIGVudHJ5XG4gICAgICB9LFxuICAgICAgaXNJbkZsaWdodDogYXN5bmMgKHJldHJ5Q291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAocmV0cnlDb3VudCA9PT0gMSAmJiB0aGlzLm9wdGlvbnMucmVxdWVzdENvYWxlc2NpbmcuZW50cm9weU1heCkge1xuICAgICAgICAgIC8vIEFkZCBzb21lIGVudHJvcHkgaGVyZSBiZWNhdXNlIG9mIHBvc3NpYmxlIHNjZW5hcmlvIHdoZXJlIHRoZSBrZXkgd29uJ3QgYmUgc2V0IGJlZm9yZSBtdWx0aXBsZVxuICAgICAgICAgIC8vIG90aGVyIGluc3RhbmNlcyBpbiBhIGJ1cnN0IHJlcXVlc3QgdHJ5IHRvIGFjY2VzcyB0aGUgY29hbGVzY2luZyBrZXkuXG4gICAgICAgICAgY29uc3QgcmFuZG9tTXMgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5vcHRpb25zLnJlcXVlc3RDb2FsZXNjaW5nLmVudHJvcHlNYXhcbiAgICAgICAgICBhd2FpdCBzbGVlcChyYW5kb21NcylcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbkZsaWdodCA9IGF3YWl0IHRoaXMuY2FjaGUuZ2V0RmxpZ2h0TWFya2VyKHRoaXMuZ2V0Q29hbGVzY2luZ0tleShrZXkpKVxuICAgICAgICBsb2dnZXIuZGVidWcoYFJlcXVlc3QgY29hbGVzY2luZzogQ0hFQ0sgaW5GbGlnaHQ6JHtpbkZsaWdodH0gb24gcmV0cnkgIyR7cmV0cnlDb3VudH1gKVxuICAgICAgICByZXR1cm4gaW5GbGlnaHRcbiAgICAgIH0sXG4gICAgICByZXRyaWVzOiB0aGlzLm9wdGlvbnMucmVxdWVzdENvYWxlc2NpbmcubWF4UmV0cmllcyxcbiAgICAgIGludGVydmFsOiAocmV0cnlDb3VudDogbnVtYmVyKSA9PlxuICAgICAgICBleHBvbmVudGlhbEJhY2tPZmZNcyhcbiAgICAgICAgICByZXRyeUNvdW50LFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5yZXF1ZXN0Q29hbGVzY2luZy5pbnRlcnZhbCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMucmVxdWVzdENvYWxlc2NpbmcuaW50ZXJ2YWxNYXgsXG4gICAgICAgICAgdGhpcy5vcHRpb25zLnJlcXVlc3RDb2FsZXNjaW5nLmludGVydmFsQ29lZmZpY2llbnQsXG4gICAgICAgICksXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRSZXN1bHRGb3JSZXF1ZXN0KFxuICAgIGFkYXB0ZXJSZXF1ZXN0OiBBZGFwdGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxBZGFwdGVyUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAoIWFkYXB0ZXJSZXF1ZXN0Py5kZWJ1Zz8uY2FjaGVLZXkpIHRocm93IG5ldyBFcnJvcignQ2FjaGUga2V5IG5vdCBmb3VuZCcpXG4gICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkoYWRhcHRlclJlcXVlc3QuZGVidWcuY2FjaGVLZXkpXG5cbiAgICBjb25zdCBvYnNlcnZlID0gbWV0cmljcy5iZWdpbk9ic2VydmVDYWNoZU1ldHJpY3Moe1xuICAgICAgaXNGcm9tV3M6ICEhYWRhcHRlclJlcXVlc3QuZGVidWc/LndzLFxuICAgICAgcGFydGljaXBhbnRJZDoga2V5LFxuICAgICAgZmVlZElkOiBhZGFwdGVyUmVxdWVzdC5tZXRyaWNzTWV0YT8uZmVlZElkIHx8ICdOL0EnLFxuICAgIH0pXG5cbiAgICBjb25zdCBjYWNoZWRBZGFwdGVyUmVzcG9uc2UgPSB0aGlzLm9wdGlvbnMucmVxdWVzdENvYWxlc2NpbmcuZW5hYmxlZFxuICAgICAgPyBhd2FpdCB0aGlzLmdldFdpdGhDb2FsZXNjaW5nKGtleSlcbiAgICAgIDogYXdhaXQgdGhpcy5jYWNoZS5nZXRSZXNwb25zZShrZXkpXG5cbiAgICBpZiAoY2FjaGVkQWRhcHRlclJlc3BvbnNlKSB7XG4gICAgICBjb25zdCBtYXhBZ2VPdmVycmlkZSA9IGdldE1heEFnZU92ZXJyaWRlKGFkYXB0ZXJSZXF1ZXN0KVxuICAgICAgaWYgKGFkYXB0ZXJSZXF1ZXN0Py5kZWJ1Zz8ud2FybWVyKSBsb2dnZXIudHJhY2UoYENhY2hlOiBTS0lQKENhY2hlIFdhcm1lciBtaWRkbGV3YXJlKWApXG4gICAgICBlbHNlIGlmIChhZGFwdGVyUmVxdWVzdD8uZGVidWc/LndzKSBsb2dnZXIudHJhY2UoYENhY2hlOiBTS0lQKFdlYnNvY2tldHMgbWlkZGxld2FyZSlgKVxuICAgICAgZWxzZSBpZiAobWF4QWdlT3ZlcnJpZGUgJiYgbWF4QWdlT3ZlcnJpZGUgPCAwKSBsb2dnZXIudHJhY2UoYENhY2hlOiBTS0lQKG1heEFnZSA8IDApYClcbiAgICAgIGVsc2Uge1xuICAgICAgICBsb2dnZXIudHJhY2UoYENhY2hlOiBHRVQgJHtrZXl9YCwgY2FjaGVkQWRhcHRlclJlc3BvbnNlKVxuICAgICAgICBjb25zdCB0dGwgPSBhd2FpdCB0aGlzLmNhY2hlLnR0bChrZXkpXG4gICAgICAgIC8vIFRPRE86IGlzbnQgdGhpcyBhIGJ1Zz8gY2FjaGVkQWRhcHRlclJlc3BvbnNlLm1heEFnZSB3aWxsIGJlIGRpZmZlcmVudFxuICAgICAgICAvLyBpZiB0aGUgYWJvdmUgY29uZGl0aW9uYWwgZ2V0cyBleGVjdXRlZCFcbiAgICAgICAgY29uc3Qgc3RhbGVuZXNzID0gKGNhY2hlZEFkYXB0ZXJSZXNwb25zZS5tYXhBZ2UgLSB0dGwpIC8gMTAwMFxuICAgICAgICBjb25zdCBkZWJ1ZyA9IHtcbiAgICAgICAgICAuLi5jYWNoZWRBZGFwdGVyUmVzcG9uc2U/LmRlYnVnLFxuICAgICAgICAgIGNhY2hlSGl0OiB0cnVlLFxuICAgICAgICAgIHN0YWxlbmVzcyxcbiAgICAgICAgICBwZXJmb3JtYW5jZTogb2JzZXJ2ZS5zdGFsZW5lc3NBbmRFeGVjdXRpb25UaW1lKHRydWUsIHN0YWxlbmVzcyksXG4gICAgICAgICAgcHJvdmlkZXJDb3N0OiAwLFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2Ugc2hvdWxkIGJlIHNtYXJ0ZXIgYWJvdXQgdGhpcyBpbiB0aGUgZnV0dXJlXG4gICAgICAgIC8vIGFuZCBhbGxvdyBwYXRoIGNvbmZpZ3VyYXRpb24gaWYgcmVzdWx0IGlzIG5vdCBhIG51bWJlciBvciBzdHJpbmdcbiAgICAgICAgb2JzZXJ2ZS5jYWNoZUdldCh7IHZhbHVlOiBjYWNoZWRBZGFwdGVyUmVzcG9uc2UucmVzdWx0IH0pXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBBZGFwdGVyUmVzcG9uc2UgPSB7XG4gICAgICAgICAgam9iUnVuSUQ6IGFkYXB0ZXJSZXF1ZXN0LmlkLFxuICAgICAgICAgIC4uLmNhY2hlZEFkYXB0ZXJSZXNwb25zZSxcbiAgICAgICAgICBkZWJ1ZyxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVGYWlsZWRDYWNoZVJlYWQgPSBhc3luYyAoXG4gIGFkYXB0ZXJSZXF1ZXN0OiBBZGFwdGVyUmVxdWVzdCxcbiAgY29udGV4dDogQWRhcHRlckNvbnRleHQsXG4gIGVycm9yOiBFcnJvcixcbiAgZXhlY3V0ZTogRXhlY3V0ZSxcbiAgYWRhcHRlckNhY2hlOiBBZGFwdGVyQ2FjaGUsXG4pOiBQcm9taXNlPEFkYXB0ZXJSZXNwb25zZSB8IHVuZGVmaW5lZD4gPT4ge1xuICBjb25zdCB0eXBlID0gZ2V0RW52KCdDQUNIRV9UWVBFJylcbiAgaWYgKHR5cGUgPT09ICdsb2NhbCcpIHtcbiAgICBsb2dnZXIud2FybignQ2FjaGUgdHlwZSBhbHJlYWR5IHNldCB0byBsb2NhbC4gIFBhc3NpbmcgdGhyb3VnaC4uLicpXG4gICAgcmV0dXJuIGF3YWl0IGV4ZWN1dGUoYWRhcHRlclJlcXVlc3QsIGNvbnRleHQpXG4gIH1cbiAgdHJ5IHtcbiAgICBsb2dnZXIud2FybignVHJ5aW5nIHRvIGZldGNoIGZyb20gbG9jYWwgY2FjaGUuJywgZXJyb3IpXG4gICAgcmV0dXJuIGF3YWl0IGFkYXB0ZXJDYWNoZS5nZXRSZXN1bHRGb3JSZXF1ZXN0KGFkYXB0ZXJSZXF1ZXN0KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZ2dlci53YXJuKCdGYWlsZWQgdG8gZmV0Y2ggcmVzcG9uc2UgZnJvbSBsb2NhbCBjYWNoZS4gIFBhc3NpbmcgdGhyb3VnaC4uLicpXG4gICAgcmV0dXJuIGF3YWl0IGV4ZWN1dGUoYWRhcHRlclJlcXVlc3QsIGNvbnRleHQpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkRGVmYXVsdExvY2FsQWRhcHRlckNhY2hlID0gYXN5bmMgKFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbik6IFByb21pc2U8QWRhcHRlckNhY2hlPiA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucyh0cnVlLCBjb250ZXh0KVxuICBvcHRpb25zLmluc3RhbmNlID0gYXdhaXQgb3B0aW9ucy5jYWNoZUJ1aWxkZXIob3B0aW9ucy5jYWNoZUltcGxPcHRpb25zKVxuXG4gIHJldHVybiBuZXcgQWRhcHRlckNhY2hlKHtcbiAgICAuLi5jb250ZXh0LFxuICAgIGNhY2hlOiB7XG4gICAgICAuLi5jb250ZXh0LmNhY2hlLFxuICAgICAgaW5zdGFuY2U6IG9wdGlvbnMuaW5zdGFuY2UsXG4gICAgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHdpdGhDYWNoZSA9XG4gIChyYXRlTGltaXQ/OiBTdG9yZTxyZWR1Y2VyLkJ1cnN0TGltaXRTdGF0ZT4pOiBNaWRkbGV3YXJlID0+XG4gIGFzeW5jIChleGVjdXRlLCBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCkgPT4ge1xuICAgIC8vIElmIGRpc2FibGVkIG5vb3BcbiAgICBpZiAoIWNvbnRleHQ/LmNhY2hlPy5pbnN0YW5jZSkgcmV0dXJuIChkYXRhOiBBZGFwdGVyUmVxdWVzdCkgPT4gZXhlY3V0ZShkYXRhLCBjb250ZXh0KVxuXG4gICAgY29uc3QgYWRhcHRlckNhY2hlID0gbmV3IEFkYXB0ZXJDYWNoZShjb250ZXh0KVxuICAgIGNvbnN0IGxvY2FsQWRhcHRlckNhY2hlID0gYXdhaXQgYnVpbGREZWZhdWx0TG9jYWxBZGFwdGVyQ2FjaGUoY29udGV4dClcblxuICAgIGNvbnN0IHtcbiAgICAgIGNhY2hlOiBvcHRpb25zLFxuICAgICAgY2FjaGU6IHsgaW5zdGFuY2U6IGNhY2hlIH0sXG4gICAgfSA9IGNvbnRleHRcblxuICAgIHJldHVybiBhc3luYyAoYWRhcHRlclJlcXVlc3QpID0+IHtcbiAgICAgIGxldCBjYWNoZVRvVXNlID0gY2FjaGVcbiAgICAgIGxldCBhZGFwdGVyQ2FjaGVUb1VzZSA9IGFkYXB0ZXJDYWNoZVxuICAgICAgaWYgKCFhZGFwdGVyUmVxdWVzdD8uZGVidWc/LmNhY2hlS2V5KSB0aHJvdyBuZXcgRXJyb3IoJ0NhY2hlIGtleSBub3QgZm91bmQnKVxuICAgICAgY29uc3Qga2V5ID0gYWRhcHRlckNhY2hlVG9Vc2UuZ2V0S2V5KGFkYXB0ZXJSZXF1ZXN0LmRlYnVnLmNhY2hlS2V5KVxuICAgICAgY29uc3QgY29hbGVzY2luZ0tleSA9IGFkYXB0ZXJDYWNoZVRvVXNlLmdldENvYWxlc2NpbmdLZXkoa2V5KVxuICAgICAgY29uc3Qgb2JzZXJ2ZSA9IG1ldHJpY3MuYmVnaW5PYnNlcnZlQ2FjaGVNZXRyaWNzKHtcbiAgICAgICAgaXNGcm9tV3M6ICEhYWRhcHRlclJlcXVlc3QuZGVidWc/LndzLFxuICAgICAgICBwYXJ0aWNpcGFudElkOiBrZXksXG4gICAgICAgIGZlZWRJZDogYWRhcHRlclJlcXVlc3QubWV0cmljc01ldGE/LmZlZWRJZCB8fCAnTi9BJyxcbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IHRyeURvRGlzdHJpYnV0ZWRDYWNoZUFjdGlvbiA9IGFzeW5jIChcbiAgICAgICAgZm46ICgpID0+IFByb21pc2U8QWRhcHRlclJlc3BvbnNlIHwgdm9pZCB8IHVuZGVmaW5lZD4sXG4gICAgICApOiBQcm9taXNlPEFkYXB0ZXJSZXNwb25zZSB8IHZvaWQgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZm4oKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlRmFpbGVkQ2FjaGVSZWFkKFxuICAgICAgICAgICAgYWRhcHRlclJlcXVlc3QsXG4gICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICBleGVjdXRlLFxuICAgICAgICAgICAgbG9jYWxBZGFwdGVyQ2FjaGUsXG4gICAgICAgICAgKVxuICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhY2hlVG9Vc2UgPSBsb2NhbEFkYXB0ZXJDYWNoZS5pbnN0YW5jZVxuICAgICAgICAgIGFkYXB0ZXJDYWNoZVRvVXNlID0gbG9jYWxBZGFwdGVyQ2FjaGVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBhZGFwdGVyUmVzcG9uc2UgPSBhd2FpdCB0cnlEb0Rpc3RyaWJ1dGVkQ2FjaGVBY3Rpb24oXG4gICAgICAgIGFzeW5jICgpID0+IGF3YWl0IGFkYXB0ZXJDYWNoZVRvVXNlLmdldFJlc3VsdEZvclJlcXVlc3QoYWRhcHRlclJlcXVlc3QpLFxuICAgICAgKVxuICAgICAgaWYgKGFkYXB0ZXJSZXNwb25zZSkgcmV0dXJuIGFkYXB0ZXJSZXNwb25zZVxuXG4gICAgICBjb25zdCBtYXhBZ2UgPSBnZXRUVEwoYWRhcHRlclJlcXVlc3QsIG9wdGlvbnMpXG5cbiAgICAgIGNvbnN0IGluRmxpZ2h0TWFya2VyUmVzcG9uc2UgPSBhd2FpdCB0cnlEb0Rpc3RyaWJ1dGVkQ2FjaGVBY3Rpb24oXG4gICAgICAgIGFzeW5jICgpID0+IGF3YWl0IGFkYXB0ZXJDYWNoZVRvVXNlLnNldEluRmxpZ2h0TWFya2VyKGNvYWxlc2NpbmdLZXksIG1heEFnZSksXG4gICAgICApXG4gICAgICBpZiAoaW5GbGlnaHRNYXJrZXJSZXNwb25zZSkgcmV0dXJuIGluRmxpZ2h0TWFya2VyUmVzcG9uc2VcblxuICAgICAgY29uc3QgYnVyc3RSYXRlTGltaXQgPSB3aXRoQnVyc3RMaW1pdChyYXRlTGltaXQpXG4gICAgICBjb25zdCBleGVjdXRlV2l0aEJhY2tvZmYgPSBhd2FpdCBidXJzdFJhdGVMaW1pdChleGVjdXRlLCBjb250ZXh0KVxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZVdpdGhCYWNrb2ZmKGFkYXB0ZXJSZXF1ZXN0LCBjb250ZXh0KVxuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBBZGQgc3VjY2Vzc2Z1bCByZXN1bHQgdG8gY2FjaGVcbiAgICAgICAgY29uc3QgX2NhY2hlT25TdWNjZXNzID0gYXN5bmMgKHtcbiAgICAgICAgICBzdGF0dXNDb2RlLFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgIGRlYnVnLFxuICAgICAgICB9OiBQaWNrPEFkYXB0ZXJSZXNwb25zZSwgJ3N0YXR1c0NvZGUnIHwgJ2RhdGEnIHwgJ3Jlc3VsdCcgfCAnZGVidWcnPikgPT4ge1xuICAgICAgICAgIGlmIChzdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRlYnVnQmF0Y2hhYmxlUHJvcGVydHlQYXRoID0gZGVidWdcbiAgICAgICAgICAgICAgPyB7IGJhdGNoYWJsZVByb3BlcnR5UGF0aDogZGVidWcuYmF0Y2hhYmxlUHJvcGVydHlQYXRoIH1cbiAgICAgICAgICAgICAgOiB7fVxuICAgICAgICAgICAgY29uc3QgZW50cnk6IENhY2hlRW50cnkgPSB7XG4gICAgICAgICAgICAgIHN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgbWF4QWdlLFxuICAgICAgICAgICAgICBkZWJ1ZzogZGVidWdCYXRjaGFibGVQcm9wZXJ0eVBhdGgsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgb2JzZXJ2ZSBub24tMjAwIGVudHJpZXMgdG9vXG4gICAgICAgICAgICBhd2FpdCBjYWNoZVRvVXNlLnNldFJlc3BvbnNlKGtleSwgZW50cnksIG1heEFnZSlcbiAgICAgICAgICAgIG9ic2VydmUuY2FjaGVTZXQoeyBzdGF0dXNDb2RlLCBtYXhBZ2UgfSlcbiAgICAgICAgICAgIGxvZ2dlci50cmFjZShgQ2FjaGU6IFNFVCAke2tleX1gLCBlbnRyeSlcblxuICAgICAgICAgICAgLy8gSW5kaXZpZHVhbGx5IGNhY2hlIGJhdGNoIHJlcXVlc3RzXG4gICAgICAgICAgICBpZiAoZGF0YT8ucmVzdWx0cykge1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGJhdGNoUGFydGljaXBhbnQgb2YgT2JqZWN0LnZhbHVlczxbc3RyaW5nLCBBZGFwdGVyUmVxdWVzdCwgbnVtYmVyXT4oXG4gICAgICAgICAgICAgICAgZGF0YS5yZXN1bHRzLFxuICAgICAgICAgICAgICApKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgW2tleSwgLCByZXN1bHRdID0gYmF0Y2hQYXJ0aWNpcGFudFxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkS2V5ID0gYWRhcHRlckNhY2hlVG9Vc2UuZ2V0S2V5KGtleSlcbiAgICAgICAgICAgICAgICBjb25zdCBkZWJ1Z0JhdGNoYWJsZVByb3BlcnR5UGF0aCA9IGRlYnVnXG4gICAgICAgICAgICAgICAgICA/IHsgYmF0Y2hhYmxlUHJvcGVydHlQYXRoOiBkZWJ1Zy5iYXRjaGFibGVQcm9wZXJ0eVBhdGggfVxuICAgICAgICAgICAgICAgICAgOiB7fVxuICAgICAgICAgICAgICAgIGNvbnN0IGVudHJ5QmF0Y2hQYXJ0aWNpcGFudCA9IHtcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgICAgICBkYXRhOiB7IHJlc3VsdCB9LFxuICAgICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgbWF4QWdlLFxuICAgICAgICAgICAgICAgICAgZGVidWc6IGRlYnVnQmF0Y2hhYmxlUHJvcGVydHlQYXRoLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCBjYWNoZVRvVXNlLnNldFJlc3BvbnNlKGNoaWxkS2V5LCBlbnRyeUJhdGNoUGFydGljaXBhbnQsIG1heEFnZSlcbiAgICAgICAgICAgICAgICBsb2dnZXIudHJhY2UoYENhY2hlIFNwbGl0IEJhdGNoOiBTRVQgJHtjaGlsZEtleX1gLCBlbnRyeUJhdGNoUGFydGljaXBhbnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTm90aWZ5IHBlbmRpbmcgcmVxdWVzdHMgYnkgcmVtb3ZpbmcgdGhlIGluLWZsaWdodCBtYXJrXG4gICAgICAgICAgYXdhaXQgYWRhcHRlckNhY2hlVG9Vc2UuZGVsSW5GbGlnaHRNYXJrZXIoY29hbGVzY2luZ0tleSlcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBfY2FjaGVPblN1Y2Nlc3MocmVzdWx0KVxuXG4gICAgICAgIGNvbnN0IGRlYnVnID0ge1xuICAgICAgICAgIHN0YWxlbmVzczogMCxcbiAgICAgICAgICBwZXJmb3JtYW5jZTogb2JzZXJ2ZS5zdGFsZW5lc3NBbmRFeGVjdXRpb25UaW1lKGZhbHNlLCAwKSxcbiAgICAgICAgICBwcm92aWRlckNvc3Q6IHJlc3VsdC5kYXRhLmNvc3QgfHwgMSxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyAuLi5yZXN1bHQsIGRlYnVnOiB7IC4uLmRlYnVnLCAuLi5yZXN1bHQuZGVidWcgfSB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=