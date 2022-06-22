"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withBurstLimit = exports.MINUTE_LIMIT_WARMER_BUFFER = exports.SECOND_LIMIT_RETRIES = exports.reducer = exports.actions = void 0;
const tslib_1 = require("tslib");
const reducer_1 = require("./reducer");
const actions = tslib_1.__importStar(require("./actions"));
const config_1 = require("../cache-warmer/config");
const modules_1 = require("../../modules");
const util_1 = require("../../util");
exports.actions = tslib_1.__importStar(require("./actions"));
exports.reducer = tslib_1.__importStar(require("./reducer"));
exports.SECOND_LIMIT_RETRIES = 10;
exports.MINUTE_LIMIT_WARMER_BUFFER = 0.9;
const availableSecondLimitCapacity = async (store, burstCapacity1s) => {
    for (let retry = exports.SECOND_LIMIT_RETRIES; retry > 0; retry--) {
        store.dispatch(actions.updateIntervals());
        const state = store.getState();
        const { requests } = state;
        const observedRequestsInSecond = reducer_1.selectTotalNumberOfRequestsFor(requests, reducer_1.IntervalNames.SECOND);
        if (observedRequestsInSecond > burstCapacity1s) {
            modules_1.logger.debug(`Per Second Burst rate limit cap of ${burstCapacity1s} reached. ${observedRequestsInSecond} requests sent in the last minute. Waiting 1 second. Retry number: ${retry}`);
            await util_1.sleep(1000);
        }
        else
            return true;
    }
    return false;
};
const withBurstLimit = (store) => async (execute, context) => async (input) => {
    const config = context.rateLimit ?? {};
    if (!store || !config.enabled || (!config.burstCapacity1m && !config.burstCapacity1s))
        return await execute(input, context);
    const state = store.getState();
    const { requests } = state;
    // Limit by Minute
    if (config.burstCapacity1m) {
        const observedRequestsInMinute = reducer_1.selectTotalNumberOfRequestsFor(requests, reducer_1.IntervalNames.MINUTE);
        if (input.id !== config_1.WARMUP_BATCH_REQUEST_ID && // Always allow Batch Warmer requests through
            observedRequestsInMinute > config.burstCapacity1m * exports.MINUTE_LIMIT_WARMER_BUFFER
        // TODO: determine BATCH_REQUEST_BUFFER dynamically based on (number of batch warmers * 3)
        ) {
            modules_1.logger.warn(`External Adapter backing off. Provider's limit of ${config.burstCapacity1m * exports.MINUTE_LIMIT_WARMER_BUFFER} requests per minute reached. ${observedRequestsInMinute} requests sent in the last minute.`);
            throw new modules_1.AdapterError({
                jobRunID: input.id,
                message: 'New request backoff: Minute Burst rate limit cap reached.',
                statusCode: 429,
            });
        }
    }
    // Limit by Second
    if (config.burstCapacity1s) {
        const availableCapacity = await availableSecondLimitCapacity(store, config.burstCapacity1s);
        if (!availableCapacity) {
            modules_1.logger.warn(`External Adapter backing off. Provider's burst limit of ${config.burstCapacity1s} requests per second reached.`);
            throw new modules_1.AdapterError({
                jobRunID: input.id,
                message: 'New request backoff: Second Burst rate limit cap reached.',
                statusCode: 429,
            });
        }
    }
    const requestObservedPayload = {
        input,
    };
    store.dispatch(actions.requestObserved(requestObservedPayload));
    return await execute(input, context);
};
exports.withBurstLimit = withBurstLimit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21pZGRsZXdhcmUvYnVyc3QtbGltaXQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLHVDQUtrQjtBQUNsQiwyREFBb0M7QUFDcEMsbURBQWdFO0FBQ2hFLDJDQUFvRDtBQUNwRCxxQ0FBa0M7QUFFbEMsNkRBQW9DO0FBQ3BDLDZEQUFvQztBQUV2QixRQUFBLG9CQUFvQixHQUFHLEVBQUUsQ0FBQTtBQUN6QixRQUFBLDBCQUEwQixHQUFHLEdBQUcsQ0FBQTtBQUU3QyxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDeEMsS0FBNkIsRUFDN0IsZUFBdUIsRUFDdkIsRUFBRTtJQUNGLEtBQUssSUFBSSxLQUFLLEdBQUcsNEJBQW9CLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN6RCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFBO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUM5QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQWdDLEtBQUssQ0FBQTtRQUV2RCxNQUFNLHdCQUF3QixHQUFHLHdDQUE4QixDQUFDLFFBQVEsRUFBRSx1QkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRS9GLElBQUksd0JBQXdCLEdBQUcsZUFBZSxFQUFFO1lBQzlDLGdCQUFNLENBQUMsS0FBSyxDQUNWLHNDQUFzQyxlQUFlLGFBQWEsd0JBQXdCLHNFQUFzRSxLQUFLLEVBQUUsQ0FDeEssQ0FBQTtZQUNELE1BQU0sWUFBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ2xCOztZQUFNLE9BQU8sSUFBSSxDQUFBO0tBQ25CO0lBQ0QsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUE7QUFFTSxNQUFNLGNBQWMsR0FDekIsQ0FBQyxLQUE4QixFQUFjLEVBQUUsQ0FDL0MsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUMzQixLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDZCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQTtJQUN0QyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDbkYsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFdEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQzlCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBZ0MsS0FBSyxDQUFBO0lBRXZELGtCQUFrQjtJQUNsQixJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7UUFDMUIsTUFBTSx3QkFBd0IsR0FBRyx3Q0FBOEIsQ0FDN0QsUUFBUSxFQUNSLHVCQUFhLENBQUMsTUFBTSxDQUNyQixDQUFBO1FBRUQsSUFDRSxLQUFLLENBQUMsRUFBRSxLQUFLLGdDQUF1QixJQUFJLDZDQUE2QztZQUNyRix3QkFBd0IsR0FBRyxNQUFNLENBQUMsZUFBZSxHQUFHLGtDQUEwQjtRQUM5RSwwRkFBMEY7VUFDMUY7WUFDQSxnQkFBTSxDQUFDLElBQUksQ0FDVCxxREFDRSxNQUFNLENBQUMsZUFBZSxHQUFHLGtDQUMzQixpQ0FBaUMsd0JBQXdCLG9DQUFvQyxDQUM5RixDQUFBO1lBQ0QsTUFBTSxJQUFJLHNCQUFZLENBQUM7Z0JBQ3JCLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxFQUFFLDJEQUEyRDtnQkFDcEUsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFBO1NBQ0g7S0FDRjtJQUVELGtCQUFrQjtJQUNsQixJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7UUFDMUIsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLDRCQUE0QixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDM0YsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3RCLGdCQUFNLENBQUMsSUFBSSxDQUNULDJEQUEyRCxNQUFNLENBQUMsZUFBZSwrQkFBK0IsQ0FDakgsQ0FBQTtZQUNELE1BQU0sSUFBSSxzQkFBWSxDQUFDO2dCQUNyQixRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xCLE9BQU8sRUFBRSwyREFBMkQ7Z0JBQ3BFLFVBQVUsRUFBRSxHQUFHO2FBQ2hCLENBQUMsQ0FBQTtTQUNIO0tBQ0Y7SUFFRCxNQUFNLHNCQUFzQixHQUFtQztRQUM3RCxLQUFLO0tBQ04sQ0FBQTtJQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUE7SUFFL0QsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFBO0FBekRVLFFBQUEsY0FBYyxrQkF5RHhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWlkZGxld2FyZSB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHtcbiAgQnVyc3RMaW1pdFN0YXRlLFxuICBJbnRlcnZhbE5hbWVzLFxuICBSZXF1ZXN0c1N0YXRlLFxuICBzZWxlY3RUb3RhbE51bWJlck9mUmVxdWVzdHNGb3IsXG59IGZyb20gJy4vcmVkdWNlcidcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuaW1wb3J0IHsgV0FSTVVQX0JBVENIX1JFUVVFU1RfSUQgfSBmcm9tICcuLi9jYWNoZS13YXJtZXIvY29uZmlnJ1xuaW1wb3J0IHsgQWRhcHRlckVycm9yLCBsb2dnZXIgfSBmcm9tICcuLi8uLi9tb2R1bGVzJ1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi8uLi91dGlsJ1xuXG5leHBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucydcbmV4cG9ydCAqIGFzIHJlZHVjZXIgZnJvbSAnLi9yZWR1Y2VyJ1xuXG5leHBvcnQgY29uc3QgU0VDT05EX0xJTUlUX1JFVFJJRVMgPSAxMFxuZXhwb3J0IGNvbnN0IE1JTlVURV9MSU1JVF9XQVJNRVJfQlVGRkVSID0gMC45XG5cbmNvbnN0IGF2YWlsYWJsZVNlY29uZExpbWl0Q2FwYWNpdHkgPSBhc3luYyAoXG4gIHN0b3JlOiBTdG9yZTxCdXJzdExpbWl0U3RhdGU+LFxuICBidXJzdENhcGFjaXR5MXM6IG51bWJlcixcbikgPT4ge1xuICBmb3IgKGxldCByZXRyeSA9IFNFQ09ORF9MSU1JVF9SRVRSSUVTOyByZXRyeSA+IDA7IHJldHJ5LS0pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnVwZGF0ZUludGVydmFscygpKVxuICAgIGNvbnN0IHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKVxuICAgIGNvbnN0IHsgcmVxdWVzdHMgfTogeyByZXF1ZXN0czogUmVxdWVzdHNTdGF0ZSB9ID0gc3RhdGVcblxuICAgIGNvbnN0IG9ic2VydmVkUmVxdWVzdHNJblNlY29uZCA9IHNlbGVjdFRvdGFsTnVtYmVyT2ZSZXF1ZXN0c0ZvcihyZXF1ZXN0cywgSW50ZXJ2YWxOYW1lcy5TRUNPTkQpXG5cbiAgICBpZiAob2JzZXJ2ZWRSZXF1ZXN0c0luU2Vjb25kID4gYnVyc3RDYXBhY2l0eTFzKSB7XG4gICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgIGBQZXIgU2Vjb25kIEJ1cnN0IHJhdGUgbGltaXQgY2FwIG9mICR7YnVyc3RDYXBhY2l0eTFzfSByZWFjaGVkLiAke29ic2VydmVkUmVxdWVzdHNJblNlY29uZH0gcmVxdWVzdHMgc2VudCBpbiB0aGUgbGFzdCBtaW51dGUuIFdhaXRpbmcgMSBzZWNvbmQuIFJldHJ5IG51bWJlcjogJHtyZXRyeX1gLFxuICAgICAgKVxuICAgICAgYXdhaXQgc2xlZXAoMTAwMClcbiAgICB9IGVsc2UgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGNvbnN0IHdpdGhCdXJzdExpbWl0ID1cbiAgKHN0b3JlPzogU3RvcmU8QnVyc3RMaW1pdFN0YXRlPik6IE1pZGRsZXdhcmUgPT5cbiAgYXN5bmMgKGV4ZWN1dGUsIGNvbnRleHQpID0+XG4gIGFzeW5jIChpbnB1dCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IGNvbnRleHQucmF0ZUxpbWl0ID8/IHt9XG4gICAgaWYgKCFzdG9yZSB8fCAhY29uZmlnLmVuYWJsZWQgfHwgKCFjb25maWcuYnVyc3RDYXBhY2l0eTFtICYmICFjb25maWcuYnVyc3RDYXBhY2l0eTFzKSlcbiAgICAgIHJldHVybiBhd2FpdCBleGVjdXRlKGlucHV0LCBjb250ZXh0KVxuXG4gICAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpXG4gICAgY29uc3QgeyByZXF1ZXN0cyB9OiB7IHJlcXVlc3RzOiBSZXF1ZXN0c1N0YXRlIH0gPSBzdGF0ZVxuXG4gICAgLy8gTGltaXQgYnkgTWludXRlXG4gICAgaWYgKGNvbmZpZy5idXJzdENhcGFjaXR5MW0pIHtcbiAgICAgIGNvbnN0IG9ic2VydmVkUmVxdWVzdHNJbk1pbnV0ZSA9IHNlbGVjdFRvdGFsTnVtYmVyT2ZSZXF1ZXN0c0ZvcihcbiAgICAgICAgcmVxdWVzdHMsXG4gICAgICAgIEludGVydmFsTmFtZXMuTUlOVVRFLFxuICAgICAgKVxuXG4gICAgICBpZiAoXG4gICAgICAgIGlucHV0LmlkICE9PSBXQVJNVVBfQkFUQ0hfUkVRVUVTVF9JRCAmJiAvLyBBbHdheXMgYWxsb3cgQmF0Y2ggV2FybWVyIHJlcXVlc3RzIHRocm91Z2hcbiAgICAgICAgb2JzZXJ2ZWRSZXF1ZXN0c0luTWludXRlID4gY29uZmlnLmJ1cnN0Q2FwYWNpdHkxbSAqIE1JTlVURV9MSU1JVF9XQVJNRVJfQlVGRkVSXG4gICAgICAgIC8vIFRPRE86IGRldGVybWluZSBCQVRDSF9SRVFVRVNUX0JVRkZFUiBkeW5hbWljYWxseSBiYXNlZCBvbiAobnVtYmVyIG9mIGJhdGNoIHdhcm1lcnMgKiAzKVxuICAgICAgKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgIGBFeHRlcm5hbCBBZGFwdGVyIGJhY2tpbmcgb2ZmLiBQcm92aWRlcidzIGxpbWl0IG9mICR7XG4gICAgICAgICAgICBjb25maWcuYnVyc3RDYXBhY2l0eTFtICogTUlOVVRFX0xJTUlUX1dBUk1FUl9CVUZGRVJcbiAgICAgICAgICB9IHJlcXVlc3RzIHBlciBtaW51dGUgcmVhY2hlZC4gJHtvYnNlcnZlZFJlcXVlc3RzSW5NaW51dGV9IHJlcXVlc3RzIHNlbnQgaW4gdGhlIGxhc3QgbWludXRlLmAsXG4gICAgICAgIClcbiAgICAgICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICAgICAgam9iUnVuSUQ6IGlucHV0LmlkLFxuICAgICAgICAgIG1lc3NhZ2U6ICdOZXcgcmVxdWVzdCBiYWNrb2ZmOiBNaW51dGUgQnVyc3QgcmF0ZSBsaW1pdCBjYXAgcmVhY2hlZC4nLFxuICAgICAgICAgIHN0YXR1c0NvZGU6IDQyOSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBMaW1pdCBieSBTZWNvbmRcbiAgICBpZiAoY29uZmlnLmJ1cnN0Q2FwYWNpdHkxcykge1xuICAgICAgY29uc3QgYXZhaWxhYmxlQ2FwYWNpdHkgPSBhd2FpdCBhdmFpbGFibGVTZWNvbmRMaW1pdENhcGFjaXR5KHN0b3JlLCBjb25maWcuYnVyc3RDYXBhY2l0eTFzKVxuICAgICAgaWYgKCFhdmFpbGFibGVDYXBhY2l0eSkge1xuICAgICAgICBsb2dnZXIud2FybihcbiAgICAgICAgICBgRXh0ZXJuYWwgQWRhcHRlciBiYWNraW5nIG9mZi4gUHJvdmlkZXIncyBidXJzdCBsaW1pdCBvZiAke2NvbmZpZy5idXJzdENhcGFjaXR5MXN9IHJlcXVlc3RzIHBlciBzZWNvbmQgcmVhY2hlZC5gLFxuICAgICAgICApXG4gICAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgICAgICAgIGpvYlJ1bklEOiBpbnB1dC5pZCxcbiAgICAgICAgICBtZXNzYWdlOiAnTmV3IHJlcXVlc3QgYmFja29mZjogU2Vjb25kIEJ1cnN0IHJhdGUgbGltaXQgY2FwIHJlYWNoZWQuJyxcbiAgICAgICAgICBzdGF0dXNDb2RlOiA0MjksXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdE9ic2VydmVkUGF5bG9hZDogYWN0aW9ucy5SZXF1ZXN0T2JzZXJ2ZWRQYXlsb2FkID0ge1xuICAgICAgaW5wdXQsXG4gICAgfVxuICAgIHN0b3JlLmRpc3BhdGNoKGFjdGlvbnMucmVxdWVzdE9ic2VydmVkKHJlcXVlc3RPYnNlcnZlZFBheWxvYWQpKVxuXG4gICAgcmV0dXJuIGF3YWl0IGV4ZWN1dGUoaW5wdXQsIGNvbnRleHQpXG4gIH1cbiJdfQ==