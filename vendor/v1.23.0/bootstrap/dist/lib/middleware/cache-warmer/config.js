"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.WARMUP_POLL_OFFSET = exports.MINIMUM_WARMUP_INTERVAL = exports.WARMUP_BATCH_REQUEST_ID = exports.WARMUP_REQUEST_ID = void 0;
const util_1 = require("../../middleware/cache-key/util");
const util_2 = require("../../util");
const modules_1 = require("../../modules");
exports.WARMUP_REQUEST_ID = '9001';
exports.WARMUP_BATCH_REQUEST_ID = '9002';
exports.MINIMUM_WARMUP_INTERVAL = 500;
exports.WARMUP_POLL_OFFSET = 1000;
function get() {
    const warmupInterval = Number(util_2.getEnv('WARMUP_INTERVAL'));
    if (warmupInterval < exports.MINIMUM_WARMUP_INTERVAL) {
        modules_1.logger.warn(`Warmup Interval configured at ${warmupInterval}ms. Using minimum allowed time of ${exports.MINIMUM_WARMUP_INTERVAL}ms`);
    }
    return {
        hashOpts: util_1.getHashOpts(),
        unhealthyThreshold: Number(util_2.getEnv('WARMUP_UNHEALTHY_THRESHOLD')),
        warmupInterval: Number(util_2.getEnv('WARMUP_INTERVAL')),
        subscriptionTTL: Number(util_2.getEnv('WARMUP_SUBSCRIPTION_TTL')),
    };
}
exports.get = get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9taWRkbGV3YXJlL2NhY2hlLXdhcm1lci9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMERBQTZEO0FBQzdELHFDQUFtQztBQUNuQywyQ0FBc0M7QUFFekIsUUFBQSxpQkFBaUIsR0FBRyxNQUFNLENBQUE7QUFDMUIsUUFBQSx1QkFBdUIsR0FBRyxNQUFNLENBQUE7QUFDaEMsUUFBQSx1QkFBdUIsR0FBRyxHQUFHLENBQUE7QUFDN0IsUUFBQSxrQkFBa0IsR0FBRyxJQUFJLENBQUE7QUE2QnRDLFNBQWdCLEdBQUc7SUFDakIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLGFBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7SUFDeEQsSUFBSSxjQUFjLEdBQUcsK0JBQXVCLEVBQUU7UUFDNUMsZ0JBQU0sQ0FBQyxJQUFJLENBQ1QsaUNBQWlDLGNBQWMscUNBQXFDLCtCQUF1QixJQUFJLENBQ2hILENBQUE7S0FDRjtJQUVELE9BQU87UUFDTCxRQUFRLEVBQUUsa0JBQVcsRUFBRTtRQUN2QixrQkFBa0IsRUFBRSxNQUFNLENBQUMsYUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDaEUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxhQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqRCxlQUFlLEVBQUUsTUFBTSxDQUFDLGFBQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0tBQzNELENBQUE7QUFDSCxDQUFDO0FBZEQsa0JBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JqZWN0SGFzaCBmcm9tICdvYmplY3QtaGFzaCdcbmltcG9ydCB7IGdldEhhc2hPcHRzIH0gZnJvbSAnLi4vLi4vbWlkZGxld2FyZS9jYWNoZS1rZXkvdXRpbCdcbmltcG9ydCB7IGdldEVudiB9IGZyb20gJy4uLy4uL3V0aWwnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9tb2R1bGVzJ1xuXG5leHBvcnQgY29uc3QgV0FSTVVQX1JFUVVFU1RfSUQgPSAnOTAwMSdcbmV4cG9ydCBjb25zdCBXQVJNVVBfQkFUQ0hfUkVRVUVTVF9JRCA9ICc5MDAyJ1xuZXhwb3J0IGNvbnN0IE1JTklNVU1fV0FSTVVQX0lOVEVSVkFMID0gNTAwXG5leHBvcnQgY29uc3QgV0FSTVVQX1BPTExfT0ZGU0VUID0gMTAwMFxuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzIHdoaWNoIHRoZSB3YXJtLXVwIGVuZ2luZSB3aWxsIGV4ZWN1dGVcbiAgICogdGhlIHVuZGVybHlpbmcgZXh0ZXJuYWwgYWRhcHRlciB0byB1cGRhdGUgaXRzIGNhY2hlLiBJZiBsZWZ0IGVtcHR5XG4gICAqIHNob3VsZCBjYWxjdWxhdGUgdGhlIGludGVydmFsIGJhc2VkIG9uIHRoZSBUVEwgb2YgZWFjaCByZXF1ZXN0LlxuICAgKi9cbiAgd2FybXVwSW50ZXJ2YWw/OiBudW1iZXJcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBlcnJvcnMgdGhhdCBjYW4gY29uc2VjdXRpdmVseSBvY2N1clxuICAgKiBiZWZvcmUgYSB3YXJtdXAgc3Vic2NyaXB0aW9uIGZvciBhIHBhcnRpY3VsYXIgcmVxdWVzdFxuICAgKiBpcyBjYW5jZWxsZWRcbiAgICovXG4gIHVuaGVhbHRoeVRocmVzaG9sZDogbnVtYmVyXG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lIHRvIGxpdmUgb24gYSBzdWJzY3JpcHRpb24sIGlmIG5vIG5ldyByZXF1ZXN0cyBjb21lIGluIHRoYXQgZG8gbm90XG4gICAqIG9yaWdpbmF0ZSBmcm9tIHRoZSB3YXJtIHVwIGVuZ2luZSBpdHNlbGZcbiAgICovXG4gIHN1YnNjcmlwdGlvblRUTDogbnVtYmVyXG5cbiAgLyoqXG4gICAqIEhhc2hpbmcgb3B0aW9ucyBmb3IgZGlmZmVyZW50aWF0aW5nIHJlcXVlc3RzXG4gICAqL1xuICBoYXNoT3B0czogUmVxdWlyZWQ8UGFyYW1ldGVyczx0eXBlb2Ygb2JqZWN0SGFzaD4+WycxJ11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldCgpOiBDb25maWcge1xuICBjb25zdCB3YXJtdXBJbnRlcnZhbCA9IE51bWJlcihnZXRFbnYoJ1dBUk1VUF9JTlRFUlZBTCcpKVxuICBpZiAod2FybXVwSW50ZXJ2YWwgPCBNSU5JTVVNX1dBUk1VUF9JTlRFUlZBTCkge1xuICAgIGxvZ2dlci53YXJuKFxuICAgICAgYFdhcm11cCBJbnRlcnZhbCBjb25maWd1cmVkIGF0ICR7d2FybXVwSW50ZXJ2YWx9bXMuIFVzaW5nIG1pbmltdW0gYWxsb3dlZCB0aW1lIG9mICR7TUlOSU1VTV9XQVJNVVBfSU5URVJWQUx9bXNgLFxuICAgIClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGFzaE9wdHM6IGdldEhhc2hPcHRzKCksXG4gICAgdW5oZWFsdGh5VGhyZXNob2xkOiBOdW1iZXIoZ2V0RW52KCdXQVJNVVBfVU5IRUFMVEhZX1RIUkVTSE9MRCcpKSxcbiAgICB3YXJtdXBJbnRlcnZhbDogTnVtYmVyKGdldEVudignV0FSTVVQX0lOVEVSVkFMJykpLFxuICAgIHN1YnNjcmlwdGlvblRUTDogTnVtYmVyKGdldEVudignV0FSTVVQX1NVQlNDUklQVElPTl9UVEwnKSksXG4gIH1cbn1cbiJdfQ==