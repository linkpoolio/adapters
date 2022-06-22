"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCacheWarmer = exports.reducer = exports.epics = exports.actions = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
const modules_1 = require("../../modules");
const util = tslib_1.__importStar(require("../../util"));
const config_1 = require("../ws/config");
const reducer_1 = require("../ws/reducer");
const actions = tslib_1.__importStar(require("./actions"));
exports.actions = tslib_1.__importStar(require("./actions"));
exports.epics = tslib_1.__importStar(require("./epics"));
exports.reducer = tslib_1.__importStar(require("./reducer"));
const withCacheWarmer = (warmerStore, middleware, ws) => (rawExecute) => async (execute, context) => async (input) => {
    const isWarmerActive = util.parseBool(util.getEnv('CACHE_ENABLED', undefined, context)) &&
        util.parseBool(util.getEnv('WARMUP_ENABLED', undefined, context));
    if (!isWarmerActive)
        return await execute(input, context);
    const wsConfig = config_1.getWSConfig(input.data.endpoint, context);
    if (wsConfig.enabled && ws.makeWSHandler) {
        // If WS is available, and there is an active subscription, warmer should not be active
        let batchMemberHasActiveWSSubscription = false;
        const keysToCheck = input.debug?.batchChildrenCacheKeys || [];
        for (const [key, childRequest] of keysToCheck) {
            // Could happen that a subscription is still loading. If that's the case, warmer will open a subscription. If the WS becomes active, on next requests warmer will be unsubscribed'      const wsHandler = await ws.makeWSHandler()
            const wsHandler = await ws.makeWSHandler();
            const wsKey = reducer_1.getSubsId(wsHandler.subscribe(childRequest));
            const isActiveWSSubscription = ws.store.getState().subscriptions.all[wsKey]?.active;
            // If there is a WS subscription active, warmup subscription (if exists) should be removed, and not play for the moment
            const isActiveCWSubsciption = warmerStore.getState().subscriptions[key];
            if (isActiveWSSubscription) {
                if (isActiveCWSubsciption) {
                    modules_1.logger.info(`Active WS feed detected: disabling cache warmer for ${key}`);
                    // If there is a Batch WS subscription active, warmup subscription should be removed
                    if (isActiveCWSubsciption.parent && isActiveCWSubsciption.batchablePropertyPath)
                        warmerStore.dispatch(actions.warmupLeaveGroup({
                            parent: isActiveCWSubsciption.parent,
                            childLastSeenById: { [key]: Date.now() },
                            batchablePropertyPath: isActiveCWSubsciption.batchablePropertyPath,
                        }));
                    const isBatched = !!warmerStore.getState().subscriptions[key]?.childLastSeenById;
                    warmerStore.dispatch(actions.warmupUnsubscribed({
                        key,
                        isBatched,
                        reason: 'Turning off Cache Warmer to use WS.',
                    }));
                }
                batchMemberHasActiveWSSubscription = true;
            }
        }
        if (batchMemberHasActiveWSSubscription) {
            return await execute(input, context);
        }
    }
    // In case WS is not available, or WS has no active subscription, warmer should be active
    // Dispatch subscription only if execute was succesful
    const result = await execute(input, context);
    const warmupExecutePayload = {
        ...input,
        executeFn: async (input) => await (await index_1.withMiddleware(rawExecute, context, middleware))(input, context),
        result,
    };
    warmerStore.dispatch(actions.warmupExecute(warmupExecutePayload));
    return result;
};
exports.withCacheWarmer = withCacheWarmer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21pZGRsZXdhcmUvY2FjaGUtd2FybWVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSwwQ0FBK0M7QUFDL0MsMkNBQXNDO0FBQ3RDLHlEQUFrQztBQUNsQyx5Q0FBMEM7QUFDMUMsMkNBQStEO0FBQy9ELDJEQUFvQztBQUdwQyw2REFBb0M7QUFDcEMseURBQWdDO0FBQ2hDLDZEQUFvQztBQU83QixNQUFNLGVBQWUsR0FDMUIsQ0FBQyxXQUFvQyxFQUFFLFVBQXdCLEVBQUUsRUFBVyxFQUFFLEVBQUUsQ0FDaEYsQ0FBQyxVQUFtQixFQUFjLEVBQUUsQ0FDcEMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUMzQixLQUFLLEVBQUUsS0FBcUIsRUFBRSxFQUFFO0lBQzlCLE1BQU0sY0FBYyxHQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDbkUsSUFBSSxDQUFDLGNBQWM7UUFBRSxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUV6RCxNQUFNLFFBQVEsR0FBRyxvQkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRTFELElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFO1FBQ3hDLHVGQUF1RjtRQUN2RixJQUFJLGtDQUFrQyxHQUFHLEtBQUssQ0FBQTtRQUU5QyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLHNCQUFzQixJQUFJLEVBQUUsQ0FBQTtRQUU3RCxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLElBQUksV0FBVyxFQUFFO1lBQzdDLGtPQUFrTztZQUNsTyxNQUFNLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtZQUMxQyxNQUFNLEtBQUssR0FBRyxtQkFBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUMxRCxNQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUE7WUFDbkYsdUhBQXVIO1lBQ3ZILE1BQU0scUJBQXFCLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN2RSxJQUFJLHNCQUFzQixFQUFFO2dCQUMxQixJQUFJLHFCQUFxQixFQUFFO29CQUN6QixnQkFBTSxDQUFDLElBQUksQ0FBQyx1REFBdUQsR0FBRyxFQUFFLENBQUMsQ0FBQTtvQkFDekUsb0ZBQW9GO29CQUNwRixJQUFJLHFCQUFxQixDQUFDLE1BQU0sSUFBSSxxQkFBcUIsQ0FBQyxxQkFBcUI7d0JBQzdFLFdBQVcsQ0FBQyxRQUFRLENBQ2xCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQzs0QkFDdkIsTUFBTSxFQUFFLHFCQUFxQixDQUFDLE1BQU07NEJBQ3BDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQ3hDLHFCQUFxQixFQUFFLHFCQUFxQixDQUFDLHFCQUFxQjt5QkFDbkUsQ0FBQyxDQUNILENBQUE7b0JBQ0gsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsaUJBQWlCLENBQUE7b0JBQ2hGLFdBQVcsQ0FBQyxRQUFRLENBQ2xCLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQzt3QkFDekIsR0FBRzt3QkFDSCxTQUFTO3dCQUNULE1BQU0sRUFBRSxxQ0FBcUM7cUJBQzlDLENBQUMsQ0FDSCxDQUFBO2lCQUNGO2dCQUNELGtDQUFrQyxHQUFHLElBQUksQ0FBQTthQUMxQztTQUNGO1FBRUQsSUFBSSxrQ0FBa0MsRUFBRTtZQUN0QyxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNyQztLQUNGO0lBRUQseUZBQXlGO0lBQ3pGLHNEQUFzRDtJQUN0RCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFNUMsTUFBTSxvQkFBb0IsR0FBaUM7UUFDekQsR0FBRyxLQUFLO1FBQ1IsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFxQixFQUFFLEVBQUUsQ0FDekMsTUFBTSxDQUNKLE1BQU0sc0JBQWMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUN0RCxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7UUFDbkIsTUFBTTtLQUNQLENBQUE7SUFDRCxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFBO0lBRWpFLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBdEVVLFFBQUEsZUFBZSxtQkFzRXpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRhcHRlclJlcXVlc3QsIEV4ZWN1dGUsIE1ha2VXU0hhbmRsZXIsIE1pZGRsZXdhcmUgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IHdpdGhNaWRkbGV3YXJlIH0gZnJvbSAnLi4vLi4vLi4vaW5kZXgnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9tb2R1bGVzJ1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuLi8uLi91dGlsJ1xuaW1wb3J0IHsgZ2V0V1NDb25maWcgfSBmcm9tICcuLi93cy9jb25maWcnXG5pbXBvcnQgeyBnZXRTdWJzSWQsIFJvb3RTdGF0ZSBhcyBXU1N0YXRlIH0gZnJvbSAnLi4vd3MvcmVkdWNlcidcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuaW1wb3J0IHsgQ2FjaGVXYXJtZXJTdGF0ZSB9IGZyb20gJy4vcmVkdWNlcidcblxuZXhwb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnXG5leHBvcnQgKiBhcyBlcGljcyBmcm9tICcuL2VwaWNzJ1xuZXhwb3J0ICogYXMgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInXG5cbmludGVyZmFjZSBXU0lucHV0IHtcbiAgc3RvcmU6IFN0b3JlPFdTU3RhdGU+XG4gIG1ha2VXU0hhbmRsZXI/OiBNYWtlV1NIYW5kbGVyXG59XG5cbmV4cG9ydCBjb25zdCB3aXRoQ2FjaGVXYXJtZXIgPVxuICAod2FybWVyU3RvcmU6IFN0b3JlPENhY2hlV2FybWVyU3RhdGU+LCBtaWRkbGV3YXJlOiBNaWRkbGV3YXJlW10sIHdzOiBXU0lucHV0KSA9PlxuICAocmF3RXhlY3V0ZTogRXhlY3V0ZSk6IE1pZGRsZXdhcmUgPT5cbiAgYXN5bmMgKGV4ZWN1dGUsIGNvbnRleHQpID0+XG4gIGFzeW5jIChpbnB1dDogQWRhcHRlclJlcXVlc3QpID0+IHtcbiAgICBjb25zdCBpc1dhcm1lckFjdGl2ZSA9XG4gICAgICB1dGlsLnBhcnNlQm9vbCh1dGlsLmdldEVudignQ0FDSEVfRU5BQkxFRCcsIHVuZGVmaW5lZCwgY29udGV4dCkpICYmXG4gICAgICB1dGlsLnBhcnNlQm9vbCh1dGlsLmdldEVudignV0FSTVVQX0VOQUJMRUQnLCB1bmRlZmluZWQsIGNvbnRleHQpKVxuICAgIGlmICghaXNXYXJtZXJBY3RpdmUpIHJldHVybiBhd2FpdCBleGVjdXRlKGlucHV0LCBjb250ZXh0KVxuXG4gICAgY29uc3Qgd3NDb25maWcgPSBnZXRXU0NvbmZpZyhpbnB1dC5kYXRhLmVuZHBvaW50LCBjb250ZXh0KVxuXG4gICAgaWYgKHdzQ29uZmlnLmVuYWJsZWQgJiYgd3MubWFrZVdTSGFuZGxlcikge1xuICAgICAgLy8gSWYgV1MgaXMgYXZhaWxhYmxlLCBhbmQgdGhlcmUgaXMgYW4gYWN0aXZlIHN1YnNjcmlwdGlvbiwgd2FybWVyIHNob3VsZCBub3QgYmUgYWN0aXZlXG4gICAgICBsZXQgYmF0Y2hNZW1iZXJIYXNBY3RpdmVXU1N1YnNjcmlwdGlvbiA9IGZhbHNlXG5cbiAgICAgIGNvbnN0IGtleXNUb0NoZWNrID0gaW5wdXQuZGVidWc/LmJhdGNoQ2hpbGRyZW5DYWNoZUtleXMgfHwgW11cblxuICAgICAgZm9yIChjb25zdCBba2V5LCBjaGlsZFJlcXVlc3RdIG9mIGtleXNUb0NoZWNrKSB7XG4gICAgICAgIC8vIENvdWxkIGhhcHBlbiB0aGF0IGEgc3Vic2NyaXB0aW9uIGlzIHN0aWxsIGxvYWRpbmcuIElmIHRoYXQncyB0aGUgY2FzZSwgd2FybWVyIHdpbGwgb3BlbiBhIHN1YnNjcmlwdGlvbi4gSWYgdGhlIFdTIGJlY29tZXMgYWN0aXZlLCBvbiBuZXh0IHJlcXVlc3RzIHdhcm1lciB3aWxsIGJlIHVuc3Vic2NyaWJlZCcgICAgICBjb25zdCB3c0hhbmRsZXIgPSBhd2FpdCB3cy5tYWtlV1NIYW5kbGVyKClcbiAgICAgICAgY29uc3Qgd3NIYW5kbGVyID0gYXdhaXQgd3MubWFrZVdTSGFuZGxlcigpXG4gICAgICAgIGNvbnN0IHdzS2V5ID0gZ2V0U3Vic0lkKHdzSGFuZGxlci5zdWJzY3JpYmUoY2hpbGRSZXF1ZXN0KSlcbiAgICAgICAgY29uc3QgaXNBY3RpdmVXU1N1YnNjcmlwdGlvbiA9IHdzLnN0b3JlLmdldFN0YXRlKCkuc3Vic2NyaXB0aW9ucy5hbGxbd3NLZXldPy5hY3RpdmVcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBXUyBzdWJzY3JpcHRpb24gYWN0aXZlLCB3YXJtdXAgc3Vic2NyaXB0aW9uIChpZiBleGlzdHMpIHNob3VsZCBiZSByZW1vdmVkLCBhbmQgbm90IHBsYXkgZm9yIHRoZSBtb21lbnRcbiAgICAgICAgY29uc3QgaXNBY3RpdmVDV1N1YnNjaXB0aW9uID0gd2FybWVyU3RvcmUuZ2V0U3RhdGUoKS5zdWJzY3JpcHRpb25zW2tleV1cbiAgICAgICAgaWYgKGlzQWN0aXZlV1NTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICBpZiAoaXNBY3RpdmVDV1N1YnNjaXB0aW9uKSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhgQWN0aXZlIFdTIGZlZWQgZGV0ZWN0ZWQ6IGRpc2FibGluZyBjYWNoZSB3YXJtZXIgZm9yICR7a2V5fWApXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIEJhdGNoIFdTIHN1YnNjcmlwdGlvbiBhY3RpdmUsIHdhcm11cCBzdWJzY3JpcHRpb24gc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZUNXU3Vic2NpcHRpb24ucGFyZW50ICYmIGlzQWN0aXZlQ1dTdWJzY2lwdGlvbi5iYXRjaGFibGVQcm9wZXJ0eVBhdGgpXG4gICAgICAgICAgICAgIHdhcm1lclN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIGFjdGlvbnMud2FybXVwTGVhdmVHcm91cCh7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQ6IGlzQWN0aXZlQ1dTdWJzY2lwdGlvbi5wYXJlbnQsXG4gICAgICAgICAgICAgICAgICBjaGlsZExhc3RTZWVuQnlJZDogeyBba2V5XTogRGF0ZS5ub3coKSB9LFxuICAgICAgICAgICAgICAgICAgYmF0Y2hhYmxlUHJvcGVydHlQYXRoOiBpc0FjdGl2ZUNXU3Vic2NpcHRpb24uYmF0Y2hhYmxlUHJvcGVydHlQYXRoLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBjb25zdCBpc0JhdGNoZWQgPSAhIXdhcm1lclN0b3JlLmdldFN0YXRlKCkuc3Vic2NyaXB0aW9uc1trZXldPy5jaGlsZExhc3RTZWVuQnlJZFxuICAgICAgICAgICAgd2FybWVyU3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgIGFjdGlvbnMud2FybXVwVW5zdWJzY3JpYmVkKHtcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgaXNCYXRjaGVkLFxuICAgICAgICAgICAgICAgIHJlYXNvbjogJ1R1cm5pbmcgb2ZmIENhY2hlIFdhcm1lciB0byB1c2UgV1MuJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIGJhdGNoTWVtYmVySGFzQWN0aXZlV1NTdWJzY3JpcHRpb24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGJhdGNoTWVtYmVySGFzQWN0aXZlV1NTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGV4ZWN1dGUoaW5wdXQsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW4gY2FzZSBXUyBpcyBub3QgYXZhaWxhYmxlLCBvciBXUyBoYXMgbm8gYWN0aXZlIHN1YnNjcmlwdGlvbiwgd2FybWVyIHNob3VsZCBiZSBhY3RpdmVcbiAgICAvLyBEaXNwYXRjaCBzdWJzY3JpcHRpb24gb25seSBpZiBleGVjdXRlIHdhcyBzdWNjZXNmdWxcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGlucHV0LCBjb250ZXh0KVxuXG4gICAgY29uc3Qgd2FybXVwRXhlY3V0ZVBheWxvYWQ6IGFjdGlvbnMuV2FybXVwRXhlY3V0ZVBheWxvYWQgPSB7XG4gICAgICAuLi5pbnB1dCxcbiAgICAgIGV4ZWN1dGVGbjogYXN5bmMgKGlucHV0OiBBZGFwdGVyUmVxdWVzdCkgPT5cbiAgICAgICAgYXdhaXQgKFxuICAgICAgICAgIGF3YWl0IHdpdGhNaWRkbGV3YXJlKHJhd0V4ZWN1dGUsIGNvbnRleHQsIG1pZGRsZXdhcmUpXG4gICAgICAgICkoaW5wdXQsIGNvbnRleHQpLFxuICAgICAgcmVzdWx0LFxuICAgIH1cbiAgICB3YXJtZXJTdG9yZS5kaXNwYXRjaChhY3Rpb25zLndhcm11cEV4ZWN1dGUod2FybXVwRXhlY3V0ZVBheWxvYWQpKVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG4iXX0=