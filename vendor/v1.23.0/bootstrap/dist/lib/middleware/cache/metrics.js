"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beginObserveCacheMetrics = void 0;
const tslib_1 = require("tslib");
const client = tslib_1.__importStar(require("prom-client"));
const util_1 = require("../../util");
const beginObserveCacheMetrics = ({ participantId, feedId, isFromWs, }) => {
    const cacheType = util_1.getEnv('CACHE_TYPE') === 'redis' ? CacheTypes.Redis : CacheTypes.Local;
    const base = {
        feed_id: feedId,
        participant_id: participantId,
        experimental: 'true',
        cache_type: cacheType,
        is_from_ws: String(isFromWs),
    };
    const recordCacheExecutionDuration = cache_execution_duration_seconds.startTimer();
    return {
        stalenessAndExecutionTime(cacheHit, staleness = 0) {
            cache_data_staleness_seconds.labels(base).set(staleness);
            return recordCacheExecutionDuration({ ...base, cache_hit: String(cacheHit) });
        },
        cacheGet({ value }) {
            if (typeof value === 'number' || typeof value === 'string') {
                const parsedValue = Number(value);
                if (!Number.isNaN(parsedValue) && Number.isFinite(parsedValue)) {
                    cache_data_get_values.labels(base).set(parsedValue);
                }
            }
            cache_data_get_count.labels(base).inc();
        },
        cacheSet({ statusCode, maxAge }) {
            cache_data_set_count.labels({ ...base, status_code: statusCode }).inc();
            cache_data_max_age.labels(base).set(maxAge);
        },
    };
};
exports.beginObserveCacheMetrics = beginObserveCacheMetrics;
var CacheTypes;
(function (CacheTypes) {
    CacheTypes["Redis"] = "redis";
    CacheTypes["Local"] = "local";
})(CacheTypes || (CacheTypes = {}));
const baseLabels = [
    'feed_id',
    'participant_id',
    'cache_type',
    'is_from_ws',
    'experimental',
];
const cache_execution_duration_seconds = new client.Histogram({
    name: 'cache_execution_duration_seconds',
    help: 'A histogram bucket of the distribution of cache execution durations',
    labelNames: [...baseLabels, 'cache_hit'],
    buckets: [0.01, 0.1, 1, 10],
});
const cache_data_get_count = new client.Counter({
    name: 'cache_data_get_count',
    help: 'A counter that increments every time a value is fetched from the cache',
    labelNames: baseLabels,
});
const cache_data_get_values = new client.Gauge({
    name: 'cache_data_get_values',
    help: 'A gauge keeping track of values being fetched from cache',
    labelNames: baseLabels,
});
const cache_data_max_age = new client.Gauge({
    name: 'cache_data_max_age',
    help: 'A gauge tracking the max age of stored values in the cache',
    labelNames: baseLabels,
});
const cache_data_set_count = new client.Counter({
    name: 'cache_data_set_count',
    help: 'A counter that increments every time a value is set to the cache',
    labelNames: [...baseLabels, 'status_code'],
});
const cache_data_staleness_seconds = new client.Gauge({
    name: 'cache_data_staleness_seconds',
    help: 'Observes the staleness of the data returned',
    labelNames: baseLabels,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWlkZGxld2FyZS9jYWNoZS9tZXRyaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0REFBcUM7QUFDckMscUNBQW1DO0FBTzVCLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxFQUN2QyxhQUFhLEVBQ2IsTUFBTSxFQUNOLFFBQVEsR0FDcUIsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sU0FBUyxHQUFHLGFBQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUE7SUFDeEYsTUFBTSxJQUFJLEdBQUc7UUFDWCxPQUFPLEVBQUUsTUFBTTtRQUNmLGNBQWMsRUFBRSxhQUFhO1FBQzdCLFlBQVksRUFBRSxNQUFNO1FBQ3BCLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO0tBQzdCLENBQUE7SUFFRCxNQUFNLDRCQUE0QixHQUFHLGdDQUFnQyxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2xGLE9BQU87UUFDTCx5QkFBeUIsQ0FBQyxRQUFpQixFQUFFLFNBQVMsR0FBRyxDQUFDO1lBQ3hELDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDeEQsT0FBTyw0QkFBNEIsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQy9FLENBQUM7UUFFRCxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQXNCO1lBQ3BDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDMUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUM5RCxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2lCQUNwRDthQUNGO1lBQ0Qsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ3pDLENBQUM7UUFFRCxRQUFRLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUEwQztZQUNyRSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUN2RSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdDLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBcENZLFFBQUEsd0JBQXdCLDRCQW9DcEM7QUFFRCxJQUFLLFVBR0o7QUFIRCxXQUFLLFVBQVU7SUFDYiw2QkFBZSxDQUFBO0lBQ2YsNkJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSEksVUFBVSxLQUFWLFVBQVUsUUFHZDtBQUVELE1BQU0sVUFBVSxHQUFHO0lBQ2pCLFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFlBQVk7SUFDWixjQUFjO0NBQ04sQ0FBQTtBQUVWLE1BQU0sZ0NBQWdDLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQzVELElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsSUFBSSxFQUFFLHFFQUFxRTtJQUMzRSxVQUFVLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxXQUFXLENBQVU7SUFDakQsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0NBQzVCLENBQUMsQ0FBQTtBQUVGLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzlDLElBQUksRUFBRSxzQkFBc0I7SUFDNUIsSUFBSSxFQUFFLHdFQUF3RTtJQUM5RSxVQUFVLEVBQUUsVUFBVTtDQUN2QixDQUFDLENBQUE7QUFFRixNQUFNLHFCQUFxQixHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztJQUM3QyxJQUFJLEVBQUUsdUJBQXVCO0lBQzdCLElBQUksRUFBRSwwREFBMEQ7SUFDaEUsVUFBVSxFQUFFLFVBQVU7Q0FDdkIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDMUMsSUFBSSxFQUFFLG9CQUFvQjtJQUMxQixJQUFJLEVBQUUsNERBQTREO0lBQ2xFLFVBQVUsRUFBRSxVQUFVO0NBQ3ZCLENBQUMsQ0FBQTtBQUVGLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzlDLElBQUksRUFBRSxzQkFBc0I7SUFDNUIsSUFBSSxFQUFFLGtFQUFrRTtJQUN4RSxVQUFVLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxhQUFhLENBQUM7Q0FDM0MsQ0FBQyxDQUFBO0FBRUYsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDcEQsSUFBSSxFQUFFLDhCQUE4QjtJQUNwQyxJQUFJLEVBQUUsNkNBQTZDO0lBQ25ELFVBQVUsRUFBRSxVQUFVO0NBQ3ZCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNsaWVudCBmcm9tICdwcm9tLWNsaWVudCdcbmltcG9ydCB7IGdldEVudiB9IGZyb20gJy4uLy4uL3V0aWwnXG5cbmludGVyZmFjZSBDYWNoZUV4ZWN1dGlvbkR1cmF0aW9uUGFyYW1zIHtcbiAgcGFydGljaXBhbnRJZDogc3RyaW5nXG4gIGZlZWRJZD86IHN0cmluZ1xuICBpc0Zyb21XczogYm9vbGVhblxufVxuZXhwb3J0IGNvbnN0IGJlZ2luT2JzZXJ2ZUNhY2hlTWV0cmljcyA9ICh7XG4gIHBhcnRpY2lwYW50SWQsXG4gIGZlZWRJZCxcbiAgaXNGcm9tV3MsXG59OiBDYWNoZUV4ZWN1dGlvbkR1cmF0aW9uUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNhY2hlVHlwZSA9IGdldEVudignQ0FDSEVfVFlQRScpID09PSAncmVkaXMnID8gQ2FjaGVUeXBlcy5SZWRpcyA6IENhY2hlVHlwZXMuTG9jYWxcbiAgY29uc3QgYmFzZSA9IHtcbiAgICBmZWVkX2lkOiBmZWVkSWQsXG4gICAgcGFydGljaXBhbnRfaWQ6IHBhcnRpY2lwYW50SWQsXG4gICAgZXhwZXJpbWVudGFsOiAndHJ1ZScsXG4gICAgY2FjaGVfdHlwZTogY2FjaGVUeXBlLFxuICAgIGlzX2Zyb21fd3M6IFN0cmluZyhpc0Zyb21XcyksXG4gIH1cblxuICBjb25zdCByZWNvcmRDYWNoZUV4ZWN1dGlvbkR1cmF0aW9uID0gY2FjaGVfZXhlY3V0aW9uX2R1cmF0aW9uX3NlY29uZHMuc3RhcnRUaW1lcigpXG4gIHJldHVybiB7XG4gICAgc3RhbGVuZXNzQW5kRXhlY3V0aW9uVGltZShjYWNoZUhpdDogYm9vbGVhbiwgc3RhbGVuZXNzID0gMCkge1xuICAgICAgY2FjaGVfZGF0YV9zdGFsZW5lc3Nfc2Vjb25kcy5sYWJlbHMoYmFzZSkuc2V0KHN0YWxlbmVzcylcbiAgICAgIHJldHVybiByZWNvcmRDYWNoZUV4ZWN1dGlvbkR1cmF0aW9uKHsgLi4uYmFzZSwgY2FjaGVfaGl0OiBTdHJpbmcoY2FjaGVIaXQpIH0pXG4gICAgfSxcblxuICAgIGNhY2hlR2V0KHsgdmFsdWUgfTogeyB2YWx1ZTogdW5rbm93biB9KSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gTnVtYmVyKHZhbHVlKVxuICAgICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWRWYWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHBhcnNlZFZhbHVlKSkge1xuICAgICAgICAgIGNhY2hlX2RhdGFfZ2V0X3ZhbHVlcy5sYWJlbHMoYmFzZSkuc2V0KHBhcnNlZFZhbHVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWNoZV9kYXRhX2dldF9jb3VudC5sYWJlbHMoYmFzZSkuaW5jKClcbiAgICB9LFxuXG4gICAgY2FjaGVTZXQoeyBzdGF0dXNDb2RlLCBtYXhBZ2UgfTogeyBzdGF0dXNDb2RlOiBudW1iZXI7IG1heEFnZTogbnVtYmVyIH0pIHtcbiAgICAgIGNhY2hlX2RhdGFfc2V0X2NvdW50LmxhYmVscyh7IC4uLmJhc2UsIHN0YXR1c19jb2RlOiBzdGF0dXNDb2RlIH0pLmluYygpXG4gICAgICBjYWNoZV9kYXRhX21heF9hZ2UubGFiZWxzKGJhc2UpLnNldChtYXhBZ2UpXG4gICAgfSxcbiAgfVxufVxuXG5lbnVtIENhY2hlVHlwZXMge1xuICBSZWRpcyA9ICdyZWRpcycsXG4gIExvY2FsID0gJ2xvY2FsJyxcbn1cblxuY29uc3QgYmFzZUxhYmVscyA9IFtcbiAgJ2ZlZWRfaWQnLFxuICAncGFydGljaXBhbnRfaWQnLFxuICAnY2FjaGVfdHlwZScsXG4gICdpc19mcm9tX3dzJyxcbiAgJ2V4cGVyaW1lbnRhbCcsXG5dIGFzIGNvbnN0XG5cbmNvbnN0IGNhY2hlX2V4ZWN1dGlvbl9kdXJhdGlvbl9zZWNvbmRzID0gbmV3IGNsaWVudC5IaXN0b2dyYW0oe1xuICBuYW1lOiAnY2FjaGVfZXhlY3V0aW9uX2R1cmF0aW9uX3NlY29uZHMnLFxuICBoZWxwOiAnQSBoaXN0b2dyYW0gYnVja2V0IG9mIHRoZSBkaXN0cmlidXRpb24gb2YgY2FjaGUgZXhlY3V0aW9uIGR1cmF0aW9ucycsXG4gIGxhYmVsTmFtZXM6IFsuLi5iYXNlTGFiZWxzLCAnY2FjaGVfaGl0J10gYXMgY29uc3QsXG4gIGJ1Y2tldHM6IFswLjAxLCAwLjEsIDEsIDEwXSxcbn0pXG5cbmNvbnN0IGNhY2hlX2RhdGFfZ2V0X2NvdW50ID0gbmV3IGNsaWVudC5Db3VudGVyKHtcbiAgbmFtZTogJ2NhY2hlX2RhdGFfZ2V0X2NvdW50JyxcbiAgaGVscDogJ0EgY291bnRlciB0aGF0IGluY3JlbWVudHMgZXZlcnkgdGltZSBhIHZhbHVlIGlzIGZldGNoZWQgZnJvbSB0aGUgY2FjaGUnLFxuICBsYWJlbE5hbWVzOiBiYXNlTGFiZWxzLFxufSlcblxuY29uc3QgY2FjaGVfZGF0YV9nZXRfdmFsdWVzID0gbmV3IGNsaWVudC5HYXVnZSh7XG4gIG5hbWU6ICdjYWNoZV9kYXRhX2dldF92YWx1ZXMnLFxuICBoZWxwOiAnQSBnYXVnZSBrZWVwaW5nIHRyYWNrIG9mIHZhbHVlcyBiZWluZyBmZXRjaGVkIGZyb20gY2FjaGUnLFxuICBsYWJlbE5hbWVzOiBiYXNlTGFiZWxzLFxufSlcblxuY29uc3QgY2FjaGVfZGF0YV9tYXhfYWdlID0gbmV3IGNsaWVudC5HYXVnZSh7XG4gIG5hbWU6ICdjYWNoZV9kYXRhX21heF9hZ2UnLFxuICBoZWxwOiAnQSBnYXVnZSB0cmFja2luZyB0aGUgbWF4IGFnZSBvZiBzdG9yZWQgdmFsdWVzIGluIHRoZSBjYWNoZScsXG4gIGxhYmVsTmFtZXM6IGJhc2VMYWJlbHMsXG59KVxuXG5jb25zdCBjYWNoZV9kYXRhX3NldF9jb3VudCA9IG5ldyBjbGllbnQuQ291bnRlcih7XG4gIG5hbWU6ICdjYWNoZV9kYXRhX3NldF9jb3VudCcsXG4gIGhlbHA6ICdBIGNvdW50ZXIgdGhhdCBpbmNyZW1lbnRzIGV2ZXJ5IHRpbWUgYSB2YWx1ZSBpcyBzZXQgdG8gdGhlIGNhY2hlJyxcbiAgbGFiZWxOYW1lczogWy4uLmJhc2VMYWJlbHMsICdzdGF0dXNfY29kZSddLFxufSlcblxuY29uc3QgY2FjaGVfZGF0YV9zdGFsZW5lc3Nfc2Vjb25kcyA9IG5ldyBjbGllbnQuR2F1Z2Uoe1xuICBuYW1lOiAnY2FjaGVfZGF0YV9zdGFsZW5lc3Nfc2Vjb25kcycsXG4gIGhlbHA6ICdPYnNlcnZlcyB0aGUgc3RhbGVuZXNzIG9mIHRoZSBkYXRhIHJldHVybmVkJyxcbiAgbGFiZWxOYW1lczogYmFzZUxhYmVscyxcbn0pXG4iXX0=