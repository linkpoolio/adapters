"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCache = exports.redactOptions = exports.defaultOptions = void 0;
const tslib_1 = require("tslib");
const promise_timeout_1 = require("promise-timeout");
const redis_1 = require("redis");
const modules_1 = require("../../../modules");
const metrics = tslib_1.__importStar(require("./metrics"));
const util_1 = require("../../../util");
const defaultOptions = () => {
    const options = {
        type: 'redis',
        socket: {
            host: util_1.getEnv('CACHE_REDIS_HOST'),
            port: Number(util_1.getEnv('CACHE_REDIS_PORT')),
            path: util_1.getEnv('CACHE_REDIS_PATH'),
            reconnectStrategy: (retries) => {
                metrics.redis_retries_count.inc();
                modules_1.logger.warn(`Redis reconnect attempt #${retries}`);
                return Math.min(retries * 100, Number(util_1.getEnv('CACHE_REDIS_MAX_RECONNECT_COOLDOWN'))); // Next reconnect attempt time
            },
            connectTimeout: Number(util_1.getEnv('CACHE_REDIS_CONNECTION_TIMEOUT')),
        },
        password: util_1.getEnv('CACHE_REDIS_PASSWORD'),
        commandsQueueMaxLength: Number(util_1.getEnv('CACHE_REDIS_MAX_QUEUED_ITEMS')),
        maxAge: Number(util_1.getEnv('CACHE_MAX_AGE')),
        timeout: Number(util_1.getEnv('CACHE_REDIS_TIMEOUT')),
    };
    const cacheRedisURL = util_1.getEnv('CACHE_REDIS_URL');
    if (cacheRedisURL)
        options.url = cacheRedisURL;
    return options;
};
exports.defaultOptions = defaultOptions;
// Options without sensitive data
const redactOptions = (opts) => {
    if (opts.password)
        opts.password = opts.password.replace(/.+/g, '*****');
    if (opts.url)
        opts.url = opts.url.replace(/:\/\/.+@/g, '://*****@');
    return opts;
};
exports.redactOptions = redactOptions;
class RedisCache {
    constructor(options) {
        modules_1.logger.info('Creating new redis client instance...');
        this.options = options;
        const client = redis_1.createClient(options);
        client.on('error', (err) => modules_1.logger.error(`[Redis client] Error connecting to Redis: ${err}`));
        client.on('end', () => modules_1.logger.error('[Redis client] Connection ended.'));
        client.on('connect', () => modules_1.logger.info('[Redis client] Initiating connection to Redis server.'));
        client.on('ready', () => modules_1.logger.info('[Redis client] Ready to serve requests, queued requests will be replayed'));
        client.on('reconnecting', () => modules_1.logger.info('[Redis client] Attempting to reconnect to Redis server.'));
        this.client = client;
    }
    static async build(options) {
        metrics.redis_connections_open.inc();
        const cache = new RedisCache(options);
        await cache.client.connect();
        return cache;
    }
    async setResponse(key, value, maxAge) {
        const entry = JSON.stringify(value);
        return await this.contextualTimeout(this.client.set(key, entry, { PX: maxAge }), 'setResponse', {
            key,
            value,
            maxAge,
        });
    }
    async setFlightMarker(key, maxAge) {
        return this.contextualTimeout(this.client.set(key, 'true', { PX: maxAge }), 'setFlightMarker', {
            key,
            maxAge,
        });
    }
    async getResponse(key) {
        const entry = await this.contextualTimeout(this.client.get(key), 'getResponse', { key });
        return JSON.parse(entry);
    }
    async getFlightMarker(key) {
        const entry = await this.contextualTimeout(this.client.get(key), 'getFlightMarker', {
            key,
        });
        return JSON.parse(entry);
    }
    async del(key) {
        return this.contextualTimeout(this.client.del(key), 'del', { key });
    }
    async ttl(key) {
        // TTL in ms
        return this.contextualTimeout(this.client.pTTL(key), 'ttl', { key });
    }
    /**
     * Forcibly close the connection to the Redis server.
     *
     * AWS Lambda will timeout if the connection is not closed, because the connection
     * keeps the event loop busy.
     *
     * The alternative is to use: `context.callbackWaitsForEmtpyEventLoop = false`
     */
    async close() {
        if (!this.client)
            return;
        try {
            // No further commands will be processed
            const res = await this.contextualTimeout(this.client.quit(), 'close', {
                clientExists: !!this.client,
            });
            modules_1.logger.debug(`Redis connection shutdown completed with: ${res}`);
        }
        finally {
            this.client.removeAllListeners();
        }
    }
    async contextualTimeout(promise, fnName, context) {
        try {
            const result = await promise_timeout_1.timeout(promise, this.options.timeout);
            metrics.redis_commands_sent_count
                .labels({ status: metrics.CMD_SENT_STATUS.SUCCESS, function_name: fnName })
                .inc();
            return result;
        }
        catch (e) {
            if (e instanceof promise_timeout_1.TimeoutError) {
                modules_1.logger.error(`[Redis] Method timed out, consider increasing CACHE_REDIS_TIMEOUT (from ${this.options.timeout} ms) or increasing your resource allocation`, { fnName, context });
                metrics.redis_commands_sent_count
                    .labels({
                    status: metrics.CMD_SENT_STATUS.TIMEOUT,
                    function_name: fnName,
                })
                    .inc();
                throw e;
            }
            modules_1.logger.error(`[Redis] Method ${fnName} errored: \n${JSON.stringify(context)}\n${e}`);
            metrics.redis_commands_sent_count
                .labels({
                status: metrics.CMD_SENT_STATUS.FAIL,
                function_name: fnName,
            })
                .inc();
            throw e;
        }
    }
}
exports.RedisCache = RedisCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL21pZGRsZXdhcmUvY2FjaGUvcmVkaXMvcmVkaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFEQUF1RDtBQUN2RCxpQ0FBb0M7QUFJcEMsOENBQXlDO0FBRXpDLDJEQUFvQztBQUNwQyx3Q0FBc0M7QUFRL0IsTUFBTSxjQUFjLEdBQUcsR0FBaUIsRUFBRTtJQUMvQyxNQUFNLE9BQU8sR0FBaUI7UUFDNUIsSUFBSSxFQUFFLE9BQU87UUFDYixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsYUFBTSxDQUFDLGtCQUFrQixDQUFDO1lBQ2hDLElBQUksRUFBRSxNQUFNLENBQUMsYUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDeEMsSUFBSSxFQUFFLGFBQU0sQ0FBQyxrQkFBa0IsQ0FBQztZQUNoQyxpQkFBaUIsRUFBRSxDQUFDLE9BQWUsRUFBVSxFQUFFO2dCQUM3QyxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLENBQUE7Z0JBQ2pDLGdCQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixPQUFPLEVBQUUsQ0FBQyxDQUFBO2dCQUNsRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsYUFBTSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsOEJBQThCO1lBQ3JILENBQUM7WUFDRCxjQUFjLEVBQUUsTUFBTSxDQUFDLGFBQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsUUFBUSxFQUFFLGFBQU0sQ0FBQyxzQkFBc0IsQ0FBQztRQUN4QyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsYUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDdEUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxhQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxhQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUMvQyxDQUFBO0lBQ0QsTUFBTSxhQUFhLEdBQUcsYUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDL0MsSUFBSSxhQUFhO1FBQUUsT0FBTyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUE7SUFDOUMsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBO0FBdEJZLFFBQUEsY0FBYyxrQkFzQjFCO0FBRUQsaUNBQWlDO0FBQzFCLE1BQU0sYUFBYSxHQUFHLENBQUMsSUFBa0IsRUFBZ0IsRUFBRTtJQUNoRSxJQUFJLElBQUksQ0FBQyxRQUFRO1FBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDeEUsSUFBSSxJQUFJLENBQUMsR0FBRztRQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ25FLE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBO0FBSlksUUFBQSxhQUFhLGlCQUl6QjtBQUVELE1BQWEsVUFBVTtJQUlyQixZQUFZLE9BQXFCO1FBQy9CLGdCQUFNLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUE7UUFFcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsTUFBTSxNQUFNLEdBQUcsb0JBQVksQ0FBQyxPQUE2QixDQUFDLENBQUE7UUFDMUQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLGdCQUFNLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDN0YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFBO1FBQ3hFLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLGdCQUFNLENBQUMsSUFBSSxDQUFDLHVEQUF1RCxDQUFDLENBQUMsQ0FBQTtRQUNoRyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FDdEIsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsMEVBQTBFLENBQUMsQ0FDeEYsQ0FBQTtRQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxDQUM3QixnQkFBTSxDQUFDLElBQUksQ0FBQyx5REFBeUQsQ0FBQyxDQUN2RSxDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQXFCO1FBQ3RDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNwQyxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNyQyxNQUFNLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDNUIsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFXLEVBQUUsS0FBaUIsRUFBRSxNQUFjO1FBQzlELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkMsT0FBTyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUMzQyxhQUFhLEVBQ2I7WUFDRSxHQUFHO1lBQ0gsS0FBSztZQUNMLE1BQU07U0FDUCxDQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUMvQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsaUJBQWlCLEVBQUU7WUFDN0YsR0FBRztZQUNILE1BQU07U0FDUCxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFXO1FBQzNCLE1BQU0sS0FBSyxHQUFXLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLGFBQWEsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDaEcsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQVc7UUFDL0IsTUFBTSxLQUFLLEdBQVcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsaUJBQWlCLEVBQUU7WUFDMUYsR0FBRztTQUNKLENBQUMsQ0FBQTtRQUVGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFXO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDckUsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVztRQUNuQixZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxLQUFLO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTTtRQUV4QixJQUFJO1lBQ0Ysd0NBQXdDO1lBQ3hDLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFO2dCQUNwRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNO2FBQzVCLENBQUMsQ0FBQTtZQUNGLGdCQUFNLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1NBQ2pFO2dCQUFTO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFxQixFQUFFLE1BQWMsRUFBRSxPQUE0QjtRQUN6RixJQUFJO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSx5QkFBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzNELE9BQU8sQ0FBQyx5QkFBeUI7aUJBQzlCLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQzFFLEdBQUcsRUFBRSxDQUFBO1lBQ1IsT0FBTyxNQUFNLENBQUE7U0FDZDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksOEJBQVksRUFBRTtnQkFDN0IsZ0JBQU0sQ0FBQyxLQUFLLENBQ1YsMkVBQTJFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyw2Q0FBNkMsRUFDNUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQ3BCLENBQUE7Z0JBQ0QsT0FBTyxDQUFDLHlCQUF5QjtxQkFDOUIsTUFBTSxDQUFDO29CQUNOLE1BQU0sRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU87b0JBQ3ZDLGFBQWEsRUFBRSxNQUFNO2lCQUN0QixDQUFDO3FCQUNELEdBQUcsRUFBRSxDQUFBO2dCQUNSLE1BQU0sQ0FBQyxDQUFBO2FBQ1I7WUFDRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsTUFBTSxlQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNwRixPQUFPLENBQUMseUJBQXlCO2lCQUM5QixNQUFNLENBQUM7Z0JBQ04sTUFBTSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSTtnQkFDcEMsYUFBYSxFQUFFLE1BQU07YUFDdEIsQ0FBQztpQkFDRCxHQUFHLEVBQUUsQ0FBQTtZQUNSLE1BQU0sQ0FBQyxDQUFBO1NBQ1I7SUFDSCxDQUFDO0NBQ0Y7QUEzSEQsZ0NBMkhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGltZW91dCwgVGltZW91dEVycm9yIH0gZnJvbSAncHJvbWlzZS10aW1lb3V0J1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAncmVkaXMnXG4vLyBUT0RPIGh0dHBzOi8vYXBwLnNob3J0Y3V0LmNvbS9jaGFpbmxpbmtsYWJzL3N0b3J5LzIzODExL3VwZGF0ZS1yZWRpcy1jbGllbnQtdHlwZXMtYW5kLWltcG9ydHNcbmltcG9ydCB7IFJlZGlzQ2xpZW50T3B0aW9ucyB9IGZyb20gJ0Bub2RlLXJlZGlzL2NsaWVudC9kaXN0L2xpYi9jbGllbnQnIC8vVE9ETyBhZGQgUmVkaXNDbGllbnRUeXBlIGhlcmVcbmltcG9ydCB7IFJlZGlzTW9kdWxlcywgUmVkaXNTY3JpcHRzIH0gZnJvbSAnQG5vZGUtcmVkaXMvY2xpZW50L2Rpc3QvbGliL2NvbW1hbmRzJ1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcydcbmltcG9ydCB7IENhY2hlRW50cnkgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCAqIGFzIG1ldHJpY3MgZnJvbSAnLi9tZXRyaWNzJ1xuaW1wb3J0IHsgZ2V0RW52IH0gZnJvbSAnLi4vLi4vLi4vdXRpbCdcblxuZXhwb3J0IHR5cGUgUmVkaXNPcHRpb25zID0gUmVkaXNDbGllbnRPcHRpb25zPFJlZGlzTW9kdWxlcywgUmVkaXNTY3JpcHRzPiAmIHtcbiAgbWF4QWdlOiBudW1iZXJcbiAgdGltZW91dDogbnVtYmVyXG4gIHR5cGU6ICdyZWRpcydcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zID0gKCk6IFJlZGlzT3B0aW9ucyA9PiB7XG4gIGNvbnN0IG9wdGlvbnM6IFJlZGlzT3B0aW9ucyA9IHtcbiAgICB0eXBlOiAncmVkaXMnLFxuICAgIHNvY2tldDoge1xuICAgICAgaG9zdDogZ2V0RW52KCdDQUNIRV9SRURJU19IT1NUJyksXG4gICAgICBwb3J0OiBOdW1iZXIoZ2V0RW52KCdDQUNIRV9SRURJU19QT1JUJykpLFxuICAgICAgcGF0aDogZ2V0RW52KCdDQUNIRV9SRURJU19QQVRIJyksXG4gICAgICByZWNvbm5lY3RTdHJhdGVneTogKHJldHJpZXM6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgICAgIG1ldHJpY3MucmVkaXNfcmV0cmllc19jb3VudC5pbmMoKVxuICAgICAgICBsb2dnZXIud2FybihgUmVkaXMgcmVjb25uZWN0IGF0dGVtcHQgIyR7cmV0cmllc31gKVxuICAgICAgICByZXR1cm4gTWF0aC5taW4ocmV0cmllcyAqIDEwMCwgTnVtYmVyKGdldEVudignQ0FDSEVfUkVESVNfTUFYX1JFQ09OTkVDVF9DT09MRE9XTicpKSkgLy8gTmV4dCByZWNvbm5lY3QgYXR0ZW1wdCB0aW1lXG4gICAgICB9LFxuICAgICAgY29ubmVjdFRpbWVvdXQ6IE51bWJlcihnZXRFbnYoJ0NBQ0hFX1JFRElTX0NPTk5FQ1RJT05fVElNRU9VVCcpKSxcbiAgICB9LFxuICAgIHBhc3N3b3JkOiBnZXRFbnYoJ0NBQ0hFX1JFRElTX1BBU1NXT1JEJyksXG4gICAgY29tbWFuZHNRdWV1ZU1heExlbmd0aDogTnVtYmVyKGdldEVudignQ0FDSEVfUkVESVNfTUFYX1FVRVVFRF9JVEVNUycpKSxcbiAgICBtYXhBZ2U6IE51bWJlcihnZXRFbnYoJ0NBQ0hFX01BWF9BR0UnKSksXG4gICAgdGltZW91dDogTnVtYmVyKGdldEVudignQ0FDSEVfUkVESVNfVElNRU9VVCcpKSxcbiAgfVxuICBjb25zdCBjYWNoZVJlZGlzVVJMID0gZ2V0RW52KCdDQUNIRV9SRURJU19VUkwnKVxuICBpZiAoY2FjaGVSZWRpc1VSTCkgb3B0aW9ucy51cmwgPSBjYWNoZVJlZGlzVVJMXG4gIHJldHVybiBvcHRpb25zXG59XG5cbi8vIE9wdGlvbnMgd2l0aG91dCBzZW5zaXRpdmUgZGF0YVxuZXhwb3J0IGNvbnN0IHJlZGFjdE9wdGlvbnMgPSAob3B0czogUmVkaXNPcHRpb25zKTogUmVkaXNPcHRpb25zID0+IHtcbiAgaWYgKG9wdHMucGFzc3dvcmQpIG9wdHMucGFzc3dvcmQgPSBvcHRzLnBhc3N3b3JkLnJlcGxhY2UoLy4rL2csICcqKioqKicpXG4gIGlmIChvcHRzLnVybCkgb3B0cy51cmwgPSBvcHRzLnVybC5yZXBsYWNlKC86XFwvXFwvLitAL2csICc6Ly8qKioqKkAnKVxuICByZXR1cm4gb3B0c1xufVxuXG5leHBvcnQgY2xhc3MgUmVkaXNDYWNoZSB7XG4gIG9wdGlvbnM6IFJlZGlzT3B0aW9uc1xuICBjbGllbnQ6IGFueSAvL1RPRE8gaHR0cHM6Ly9hcHAuc2hvcnRjdXQuY29tL2NoYWlubGlua2xhYnMvc3RvcnkvMjM4MTEvdXBkYXRlLXJlZGlzLWNsaWVudC10eXBlcy1hbmQtaW1wb3J0c1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlZGlzT3B0aW9ucykge1xuICAgIGxvZ2dlci5pbmZvKCdDcmVhdGluZyBuZXcgcmVkaXMgY2xpZW50IGluc3RhbmNlLi4uJylcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICBjb25zdCBjbGllbnQgPSBjcmVhdGVDbGllbnQob3B0aW9ucyBhcyBSZWRpc0NsaWVudE9wdGlvbnMpXG4gICAgY2xpZW50Lm9uKCdlcnJvcicsIChlcnIpID0+IGxvZ2dlci5lcnJvcihgW1JlZGlzIGNsaWVudF0gRXJyb3IgY29ubmVjdGluZyB0byBSZWRpczogJHtlcnJ9YCkpXG4gICAgY2xpZW50Lm9uKCdlbmQnLCAoKSA9PiBsb2dnZXIuZXJyb3IoJ1tSZWRpcyBjbGllbnRdIENvbm5lY3Rpb24gZW5kZWQuJykpXG4gICAgY2xpZW50Lm9uKCdjb25uZWN0JywgKCkgPT4gbG9nZ2VyLmluZm8oJ1tSZWRpcyBjbGllbnRdIEluaXRpYXRpbmcgY29ubmVjdGlvbiB0byBSZWRpcyBzZXJ2ZXIuJykpXG4gICAgY2xpZW50Lm9uKCdyZWFkeScsICgpID0+XG4gICAgICBsb2dnZXIuaW5mbygnW1JlZGlzIGNsaWVudF0gUmVhZHkgdG8gc2VydmUgcmVxdWVzdHMsIHF1ZXVlZCByZXF1ZXN0cyB3aWxsIGJlIHJlcGxheWVkJyksXG4gICAgKVxuICAgIGNsaWVudC5vbigncmVjb25uZWN0aW5nJywgKCkgPT5cbiAgICAgIGxvZ2dlci5pbmZvKCdbUmVkaXMgY2xpZW50XSBBdHRlbXB0aW5nIHRvIHJlY29ubmVjdCB0byBSZWRpcyBzZXJ2ZXIuJyksXG4gICAgKVxuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgYnVpbGQob3B0aW9uczogUmVkaXNPcHRpb25zKSB7XG4gICAgbWV0cmljcy5yZWRpc19jb25uZWN0aW9uc19vcGVuLmluYygpXG4gICAgY29uc3QgY2FjaGUgPSBuZXcgUmVkaXNDYWNoZShvcHRpb25zKVxuICAgIGF3YWl0IGNhY2hlLmNsaWVudC5jb25uZWN0KClcbiAgICByZXR1cm4gY2FjaGVcbiAgfVxuXG4gIGFzeW5jIHNldFJlc3BvbnNlKGtleTogc3RyaW5nLCB2YWx1ZTogQ2FjaGVFbnRyeSwgbWF4QWdlOiBudW1iZXIpIHtcbiAgICBjb25zdCBlbnRyeSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuICAgIHJldHVybiBhd2FpdCB0aGlzLmNvbnRleHR1YWxUaW1lb3V0KFxuICAgICAgdGhpcy5jbGllbnQuc2V0KGtleSwgZW50cnksIHsgUFg6IG1heEFnZSB9KSxcbiAgICAgICdzZXRSZXNwb25zZScsXG4gICAgICB7XG4gICAgICAgIGtleSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIG1heEFnZSxcbiAgICAgIH0sXG4gICAgKVxuICB9XG5cbiAgYXN5bmMgc2V0RmxpZ2h0TWFya2VyKGtleTogc3RyaW5nLCBtYXhBZ2U6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHR1YWxUaW1lb3V0KHRoaXMuY2xpZW50LnNldChrZXksICd0cnVlJywgeyBQWDogbWF4QWdlIH0pLCAnc2V0RmxpZ2h0TWFya2VyJywge1xuICAgICAga2V5LFxuICAgICAgbWF4QWdlLFxuICAgIH0pXG4gIH1cblxuICBhc3luYyBnZXRSZXNwb25zZShrZXk6IHN0cmluZyk6IFByb21pc2U8Q2FjaGVFbnRyeSB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGVudHJ5OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmNvbnRleHR1YWxUaW1lb3V0KHRoaXMuY2xpZW50LmdldChrZXkpLCAnZ2V0UmVzcG9uc2UnLCB7IGtleSB9KVxuICAgIHJldHVybiBKU09OLnBhcnNlKGVudHJ5KVxuICB9XG5cbiAgYXN5bmMgZ2V0RmxpZ2h0TWFya2VyKGtleTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgZW50cnk6IHN0cmluZyA9IGF3YWl0IHRoaXMuY29udGV4dHVhbFRpbWVvdXQodGhpcy5jbGllbnQuZ2V0KGtleSksICdnZXRGbGlnaHRNYXJrZXInLCB7XG4gICAgICBrZXksXG4gICAgfSlcblxuICAgIHJldHVybiBKU09OLnBhcnNlKGVudHJ5KVxuICB9XG5cbiAgYXN5bmMgZGVsKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dHVhbFRpbWVvdXQodGhpcy5jbGllbnQuZGVsKGtleSksICdkZWwnLCB7IGtleSB9KVxuICB9XG5cbiAgYXN5bmMgdHRsKGtleTogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAvLyBUVEwgaW4gbXNcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0dWFsVGltZW91dCh0aGlzLmNsaWVudC5wVFRMKGtleSksICd0dGwnLCB7IGtleSB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNpYmx5IGNsb3NlIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBSZWRpcyBzZXJ2ZXIuXG4gICAqXG4gICAqIEFXUyBMYW1iZGEgd2lsbCB0aW1lb3V0IGlmIHRoZSBjb25uZWN0aW9uIGlzIG5vdCBjbG9zZWQsIGJlY2F1c2UgdGhlIGNvbm5lY3Rpb25cbiAgICoga2VlcHMgdGhlIGV2ZW50IGxvb3AgYnVzeS5cbiAgICpcbiAgICogVGhlIGFsdGVybmF0aXZlIGlzIHRvIHVzZTogYGNvbnRleHQuY2FsbGJhY2tXYWl0c0ZvckVtdHB5RXZlbnRMb29wID0gZmFsc2VgXG4gICAqL1xuICBhc3luYyBjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuY2xpZW50KSByZXR1cm5cblxuICAgIHRyeSB7XG4gICAgICAvLyBObyBmdXJ0aGVyIGNvbW1hbmRzIHdpbGwgYmUgcHJvY2Vzc2VkXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmNvbnRleHR1YWxUaW1lb3V0KHRoaXMuY2xpZW50LnF1aXQoKSwgJ2Nsb3NlJywge1xuICAgICAgICBjbGllbnRFeGlzdHM6ICEhdGhpcy5jbGllbnQsXG4gICAgICB9KVxuICAgICAgbG9nZ2VyLmRlYnVnKGBSZWRpcyBjb25uZWN0aW9uIHNodXRkb3duIGNvbXBsZXRlZCB3aXRoOiAke3Jlc31gKVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmNsaWVudC5yZW1vdmVBbGxMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNvbnRleHR1YWxUaW1lb3V0KHByb21pc2U6IFByb21pc2U8YW55PiwgZm5OYW1lOiBzdHJpbmcsIGNvbnRleHQ6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGltZW91dChwcm9taXNlLCB0aGlzLm9wdGlvbnMudGltZW91dClcbiAgICAgIG1ldHJpY3MucmVkaXNfY29tbWFuZHNfc2VudF9jb3VudFxuICAgICAgICAubGFiZWxzKHsgc3RhdHVzOiBtZXRyaWNzLkNNRF9TRU5UX1NUQVRVUy5TVUNDRVNTLCBmdW5jdGlvbl9uYW1lOiBmbk5hbWUgfSlcbiAgICAgICAgLmluYygpXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBUaW1lb3V0RXJyb3IpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICAgIGBbUmVkaXNdIE1ldGhvZCB0aW1lZCBvdXQsIGNvbnNpZGVyIGluY3JlYXNpbmcgQ0FDSEVfUkVESVNfVElNRU9VVCAoZnJvbSAke3RoaXMub3B0aW9ucy50aW1lb3V0fSBtcykgb3IgaW5jcmVhc2luZyB5b3VyIHJlc291cmNlIGFsbG9jYXRpb25gLFxuICAgICAgICAgIHsgZm5OYW1lLCBjb250ZXh0IH0sXG4gICAgICAgIClcbiAgICAgICAgbWV0cmljcy5yZWRpc19jb21tYW5kc19zZW50X2NvdW50XG4gICAgICAgICAgLmxhYmVscyh7XG4gICAgICAgICAgICBzdGF0dXM6IG1ldHJpY3MuQ01EX1NFTlRfU1RBVFVTLlRJTUVPVVQsXG4gICAgICAgICAgICBmdW5jdGlvbl9uYW1lOiBmbk5hbWUsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuaW5jKClcbiAgICAgICAgdGhyb3cgZVxuICAgICAgfVxuICAgICAgbG9nZ2VyLmVycm9yKGBbUmVkaXNdIE1ldGhvZCAke2ZuTmFtZX0gZXJyb3JlZDogXFxuJHtKU09OLnN0cmluZ2lmeShjb250ZXh0KX1cXG4ke2V9YClcbiAgICAgIG1ldHJpY3MucmVkaXNfY29tbWFuZHNfc2VudF9jb3VudFxuICAgICAgICAubGFiZWxzKHtcbiAgICAgICAgICBzdGF0dXM6IG1ldHJpY3MuQ01EX1NFTlRfU1RBVFVTLkZBSUwsXG4gICAgICAgICAgZnVuY3Rpb25fbmFtZTogZm5OYW1lLFxuICAgICAgICB9KVxuICAgICAgICAuaW5jKClcbiAgICAgIHRocm93IGVcbiAgICB9XG4gIH1cbn1cbiJdfQ==