"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = exports.httpRequestsDataProviderHits = exports.httpRequestsCacheHits = exports.cacheWarmerRequests = exports.httpRequestDurationSeconds = exports.httpRequestsTotal = exports.HttpRequestType = exports.withMetrics = exports.METRICS_ENABLED = exports.setupMetrics = void 0;
const tslib_1 = require("tslib");
const client = tslib_1.__importStar(require("prom-client"));
const util_1 = require("../util");
const config_1 = require("../middleware/cache-warmer/config");
const util = tslib_1.__importStar(require("./util"));
const setupMetrics = (name) => {
    client.collectDefaultMetrics();
    client.register.setDefaultLabels({
        app_name: util_1.getEnv('METRICS_NAME') || name || 'N/A',
        app_version: util_1.getEnv('npm_package_version'),
    });
};
exports.setupMetrics = setupMetrics;
exports.METRICS_ENABLED = util_1.parseBool(util_1.getEnv('EXPERIMENTAL_METRICS_ENABLED'));
const withMetrics = async (execute, context) => async (input) => {
    const feedId = util.getFeedId(input);
    const metricsMeta = {
        feedId,
    };
    const recordMetrics = () => {
        const labels = {
            is_cache_warming: String(input.id === config_1.WARMUP_REQUEST_ID),
            method: 'POST',
            feed_id: feedId,
        };
        const end = exports.httpRequestDurationSeconds.startTimer();
        return (props) => {
            labels.type = props.type;
            labels.status_code = props.statusCode;
            labels.provider_status_code = props.providerStatusCode;
            end();
            exports.httpRequestsTotal.labels(labels).inc();
        };
    };
    const record = recordMetrics();
    try {
        const result = await execute({ ...input, metricsMeta }, context);
        record({
            statusCode: result.statusCode,
            type: result.data.maxAge || result.maxAge
                ? HttpRequestType.CACHE_HIT
                : HttpRequestType.DATA_PROVIDER_HIT,
        });
        return { ...result, metricsMeta: { ...result.metricsMeta, ...metricsMeta } };
    }
    catch (error) {
        const providerStatusCode = error.cause?.response?.status;
        record({
            statusCode: providerStatusCode ? 200 : 500,
            providerStatusCode,
            type: providerStatusCode
                ? HttpRequestType.DATA_PROVIDER_HIT
                : HttpRequestType.ADAPTER_ERROR,
        });
        throw error;
    }
};
exports.withMetrics = withMetrics;
var HttpRequestType;
(function (HttpRequestType) {
    HttpRequestType["CACHE_HIT"] = "cacheHit";
    HttpRequestType["DATA_PROVIDER_HIT"] = "dataProviderHit";
    HttpRequestType["ADAPTER_ERROR"] = "adapterError";
})(HttpRequestType = exports.HttpRequestType || (exports.HttpRequestType = {}));
exports.httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'The number of http requests this external adapter has serviced for its entire uptime',
    labelNames: [
        'method',
        'status_code',
        'retry',
        'type',
        'is_cache_warming',
        'feed_id',
        'provider_status_code',
    ],
});
exports.httpRequestDurationSeconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'A histogram bucket of the distribution of http request durations',
    // we should tune these as we collect data, this is the default
    // bucket distribution that prom comes with
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});
exports.cacheWarmerRequests = new client.Counter({
    name: 'cache_warmer_requests',
    help: 'The number of requests caused by the warmer',
    labelNames: ['method', 'statusCode', 'apiKey', 'retry'],
});
exports.httpRequestsCacheHits = new client.Counter({
    name: 'http_requests_cache_hits',
    help: 'The number of http requests that hit the cache',
    labelNames: ['method', 'statusCode', 'apiKey', 'retry'],
});
exports.httpRequestsDataProviderHits = new client.Counter({
    name: 'http_requests_data_provider_hits',
    help: 'The number of http requests that hit the provider',
    labelNames: ['method', 'statusCode', 'apiKey', 'retry'],
});
exports.util = tslib_1.__importStar(require("./util"));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL21ldHJpY3MvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDREQUFxQztBQUNyQyxrQ0FBMkM7QUFDM0MsOERBQXFFO0FBQ3JFLHFEQUE4QjtBQUd2QixNQUFNLFlBQVksR0FBRyxDQUFDLElBQVksRUFBUSxFQUFFO0lBQ2pELE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO0lBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFDL0IsUUFBUSxFQUFFLGFBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSztRQUNqRCxXQUFXLEVBQUUsYUFBTSxDQUFDLHFCQUFxQixDQUFDO0tBQzNDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQU5ZLFFBQUEsWUFBWSxnQkFNeEI7QUFFWSxRQUFBLGVBQWUsR0FBRyxnQkFBUyxDQUFDLGFBQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUE7QUFFekUsTUFBTSxXQUFXLEdBQ3RCLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBcUIsRUFBRSxFQUFFO0lBQzFELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDcEMsTUFBTSxXQUFXLEdBQXVCO1FBQ3RDLE1BQU07S0FDUCxDQUFBO0lBRUQsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO1FBQ3pCLE1BQU0sTUFBTSxHQUFtRDtZQUM3RCxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSywwQkFBaUIsQ0FBQztZQUN4RCxNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRSxNQUFNO1NBQ2hCLENBQUE7UUFDRCxNQUFNLEdBQUcsR0FBRyxrQ0FBMEIsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUVuRCxP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Q0FBQyxDQUFBO0FBRVcsUUFBQSxxQkFBcUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDdEQsSUFBSSxFQUFFLDBCQUEwQjtJQUNoQyxJQUFJLEVBQUUsZ0RBQWdEO0lBQ3RELFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBVTtDQUNqRSxDQUFDLENBQUE7QUFFVyxRQUFBLDRCQUE0QixHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM3RCxJQUFJLEVBQUUsa0NBQWtDO0lBQ3hDLElBQUksRUFBRSxtREFBbUQ7SUFDekQsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFVO0NBQ2pFLENBQUMsQ0FBQTtBQUVGLHVEQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNsaWVudCBmcm9tICdwcm9tLWNsaWVudCdcbmltcG9ydCB7IGdldEVudiwgcGFyc2VCb29sIH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCB7IFdBUk1VUF9SRVFVRVNUX0lEIH0gZnJvbSAnLi4vbWlkZGxld2FyZS9jYWNoZS13YXJtZXIvY29uZmlnJ1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyBNaWRkbGV3YXJlLCBBZGFwdGVyUmVxdWVzdCwgQWRhcHRlck1ldHJpY3NNZXRhIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IHNldHVwTWV0cmljcyA9IChuYW1lOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY2xpZW50LmNvbGxlY3REZWZhdWx0TWV0cmljcygpXG4gIGNsaWVudC5yZWdpc3Rlci5zZXREZWZhdWx0TGFiZWxzKHtcbiAgICBhcHBfbmFtZTogZ2V0RW52KCdNRVRSSUNTX05BTUUnKSB8fCBuYW1lIHx8ICdOL0EnLFxuICAgIGFwcF92ZXJzaW9uOiBnZXRFbnYoJ25wbV9wYWNrYWdlX3ZlcnNpb24nKSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IE1FVFJJQ1NfRU5BQkxFRCA9IHBhcnNlQm9vbChnZXRFbnYoJ0VYUEVSSU1FTlRBTF9NRVRSSUNTX0VOQUJMRUQnKSlcblxuZXhwb3J0IGNvbnN0IHdpdGhNZXRyaWNzOiBNaWRkbGV3YXJlID1cbiAgYXN5bmMgKGV4ZWN1dGUsIGNvbnRleHQpID0+IGFzeW5jIChpbnB1dDogQWRhcHRlclJlcXVlc3QpID0+IHtcbiAgICBjb25zdCBmZWVkSWQgPSB1dGlsLmdldEZlZWRJZChpbnB1dClcbiAgICBjb25zdCBtZXRyaWNzTWV0YTogQWRhcHRlck1ldHJpY3NNZXRhID0ge1xuICAgICAgZmVlZElkLFxuICAgIH1cblxuICAgIGNvbnN0IHJlY29yZE1ldHJpY3MgPSAoKSA9PiB7XG4gICAgICBjb25zdCBsYWJlbHM6IFBhcmFtZXRlcnM8dHlwZW9mIGh0dHBSZXF1ZXN0c1RvdGFsLmxhYmVscz5bMF0gPSB7XG4gICAgICAgIGlzX2NhY2hlX3dhcm1pbmc6IFN0cmluZyhpbnB1dC5pZCA9PT0gV0FSTVVQX1JFUVVFU1RfSUQpLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZmVlZF9pZDogZmVlZElkLFxuICAgICAgfVxuICAgICAgY29uc3QgZW5kID0gaHR0cFJlcXVlc3REdXJhdGlvblNlY29uZHMuc3RhcnRUaW1lcigpXG5cbiAgICAgIHJldHVybiAocHJvcHM6IHtcbiAgICAgICAgcHJvdmlkZXJTdGF0dXNDb2RlPzogbnVtYmVyXG4gICAgICAgIHN0YXR1c0NvZGU/OiBudW1iZXJcbiAgICAgICAgdHlwZT86IEh0dHBSZXF1ZXN0VHlwZVxuICAgICAgfSkgPT4ge1xuICAgICAgICBsYWJlbHMudHlwZSA9IHByb3BzLnR5cGVcbiAgICAgICAgbGFiZWxzLnN0YXR1c19jb2RlID0gcHJvcHMuc3RhdHVzQ29kZVxuICAgICAgICBsYWJlbHMucHJvdmlkZXJfc3RhdHVzX2NvZGUgPSBwcm9wcy5wcm92aWRlclN0YXR1c0NvZGVcbiAgICAgICAgZW5kKClcbiAgICAgICAgaHR0cFJlcXVlc3RzVG90YWwubGFiZWxzKGxhYmVscykuaW5jKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZWNvcmQgPSByZWNvcmRNZXRyaWNzKClcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZSh7IC4uLmlucHV0LCBtZXRyaWNzTWV0YSB9LCBjb250ZXh0KVxuICAgICAgcmVjb3JkKHtcbiAgICAgICAgc3RhdHVzQ29kZTogcmVzdWx0LnN0YXR1c0NvZGUsXG4gICAgICAgIHR5cGU6XG4gICAgICAgICAgcmVzdWx0LmRhdGEubWF4QWdlIHx8IChyZXN1bHQgYXMgYW55KS5tYXhBZ2VcbiAgICAgICAgICAgID8gSHR0cFJlcXVlc3RUeXBlLkNBQ0hFX0hJVFxuICAgICAgICAgICAgOiBIdHRwUmVxdWVzdFR5cGUuREFUQV9QUk9WSURFUl9ISVQsXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBtZXRyaWNzTWV0YTogeyAuLi5yZXN1bHQubWV0cmljc01ldGEsIC4uLm1ldHJpY3NNZXRhIH0gfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBwcm92aWRlclN0YXR1c0NvZGU6IG51bWJlciB8IHVuZGVmaW5lZCA9IGVycm9yLmNhdXNlPy5yZXNwb25zZT8uc3RhdHVzXG4gICAgICByZWNvcmQoe1xuICAgICAgICBzdGF0dXNDb2RlOiBwcm92aWRlclN0YXR1c0NvZGUgPyAyMDAgOiA1MDAsXG4gICAgICAgIHByb3ZpZGVyU3RhdHVzQ29kZSxcbiAgICAgICAgdHlwZTogcHJvdmlkZXJTdGF0dXNDb2RlXG4gICAgICAgICAgPyBIdHRwUmVxdWVzdFR5cGUuREFUQV9QUk9WSURFUl9ISVRcbiAgICAgICAgICA6IEh0dHBSZXF1ZXN0VHlwZS5BREFQVEVSX0VSUk9SLFxuICAgICAgfSlcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9XG5cbmV4cG9ydCBlbnVtIEh0dHBSZXF1ZXN0VHlwZSB7XG4gIENBQ0hFX0hJVCA9ICdjYWNoZUhpdCcsXG4gIERBVEFfUFJPVklERVJfSElUID0gJ2RhdGFQcm92aWRlckhpdCcsXG4gIEFEQVBURVJfRVJST1IgPSAnYWRhcHRlckVycm9yJyxcbn1cblxuZXhwb3J0IGNvbnN0IGh0dHBSZXF1ZXN0c1RvdGFsID0gbmV3IGNsaWVudC5Db3VudGVyKHtcbiAgbmFtZTogJ2h0dHBfcmVxdWVzdHNfdG90YWwnLFxuICBoZWxwOiAnVGhlIG51bWJlciBvZiBodHRwIHJlcXVlc3RzIHRoaXMgZXh0ZXJuYWwgYWRhcHRlciBoYXMgc2VydmljZWQgZm9yIGl0cyBlbnRpcmUgdXB0aW1lJyxcbiAgbGFiZWxOYW1lczogW1xuICAgICdtZXRob2QnLFxuICAgICdzdGF0dXNfY29kZScsXG4gICAgJ3JldHJ5JyxcbiAgICAndHlwZScsXG4gICAgJ2lzX2NhY2hlX3dhcm1pbmcnLFxuICAgICdmZWVkX2lkJyxcbiAgICAncHJvdmlkZXJfc3RhdHVzX2NvZGUnLFxuICBdIGFzIGNvbnN0LFxufSlcblxuZXhwb3J0IGNvbnN0IGh0dHBSZXF1ZXN0RHVyYXRpb25TZWNvbmRzID0gbmV3IGNsaWVudC5IaXN0b2dyYW0oe1xuICBuYW1lOiAnaHR0cF9yZXF1ZXN0X2R1cmF0aW9uX3NlY29uZHMnLFxuICBoZWxwOiAnQSBoaXN0b2dyYW0gYnVja2V0IG9mIHRoZSBkaXN0cmlidXRpb24gb2YgaHR0cCByZXF1ZXN0IGR1cmF0aW9ucycsXG4gIC8vIHdlIHNob3VsZCB0dW5lIHRoZXNlIGFzIHdlIGNvbGxlY3QgZGF0YSwgdGhpcyBpcyB0aGUgZGVmYXVsdFxuICAvLyBidWNrZXQgZGlzdHJpYnV0aW9uIHRoYXQgcHJvbSBjb21lcyB3aXRoXG4gIGJ1Y2tldHM6IFswLjAwNSwgMC4wMSwgMC4wMjUsIDAuMDUsIDAuMSwgMC4yNSwgMC41LCAxLCAyLjUsIDUsIDEwXSxcbn0pXG5cbmV4cG9ydCBjb25zdCBjYWNoZVdhcm1lclJlcXVlc3RzID0gbmV3IGNsaWVudC5Db3VudGVyKHtcbiAgbmFtZTogJ2NhY2hlX3dhcm1lcl9yZXF1ZXN0cycsXG4gIGhlbHA6ICdUaGUgbnVtYmVyIG9mIHJlcXVlc3RzIGNhdXNlZCBieSB0aGUgd2FybWVyJyxcbiAgbGFiZWxOYW1lczogWydtZXRob2QnLCAnc3RhdHVzQ29kZScsICdhcGlLZXknLCAncmV0cnknXSBhcyBjb25zdCxcbn0pXG5cbmV4cG9ydCBjb25zdCBodHRwUmVxdWVzdHNDYWNoZUhpdHMgPSBuZXcgY2xpZW50LkNvdW50ZXIoe1xuICBuYW1lOiAnaHR0cF9yZXF1ZXN0c19jYWNoZV9oaXRzJyxcbiAgaGVscDogJ1RoZSBudW1iZXIgb2YgaHR0cCByZXF1ZXN0cyB0aGF0IGhpdCB0aGUgY2FjaGUnLFxuICBsYWJlbE5hbWVzOiBbJ21ldGhvZCcsICdzdGF0dXNDb2RlJywgJ2FwaUtleScsICdyZXRyeSddIGFzIGNvbnN0LFxufSlcblxuZXhwb3J0IGNvbnN0IGh0dHBSZXF1ZXN0c0RhdGFQcm92aWRlckhpdHMgPSBuZXcgY2xpZW50LkNvdW50ZXIoe1xuICBuYW1lOiAnaHR0cF9yZXF1ZXN0c19kYXRhX3Byb3ZpZGVyX2hpdHMnLFxuICBoZWxwOiAnVGhlIG51bWJlciBvZiBodHRwIHJlcXVlc3RzIHRoYXQgaGl0IHRoZSBwcm92aWRlcicsXG4gIGxhYmVsTmFtZXM6IFsnbWV0aG9kJywgJ3N0YXR1c0NvZGUnLCAnYXBpS2V5JywgJ3JldHJ5J10gYXMgY29uc3QsXG59KVxuXG5leHBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbCdcbiJdfQ==