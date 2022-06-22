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
        util.parseBool(util.getEnv('WARMUP_ENABLED'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21pZGRsZXdhcmUvY2FjaGUtd2FybWVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSwwQ0FBK0M7QUFDL0MsMkNBQXNDO0FBQ3RDLHlEQUFrQztBQUNsQyx5Q0FBMEM7QUFDMUMsMkNBQStEO0FBQy9ELDJEQUFvQztBQUdwQyw2REFBb0M7QUFDcEMseURBQWdDO0FBQ2hDLDZEQUFvQztBQU83QixNQUFNLGVBQWUsR0FDMUIsQ0FBQyxXQUFvQyxFQUFFLFVBQXdCLEVBQUUsRUFBVyxFQUFFLEVBQUUsQ0FDaEYsQ0FBQyxVQUFtQixFQUFjLEVBQUUsQ0FDcEMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUMzQixLQUFLLEVBQUUsS0FBcUIsRUFBRSxFQUFFO0lBQzlCLE1BQU0sY0FBYyxHQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO0lBQy9DLElBQUksQ0FBQyxjQUFjO1FBQUUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFekQsTUFBTSxRQUFRLEdBQUcsb0JBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUUxRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRTtRQUN4Qyx1RkFBdUY7UUFDdkYsSUFBSSxrQ0FBa0MsR0FBRyxLQUFLLENBQUE7UUFFOUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxzQkFBc0IsSUFBSSxFQUFFLENBQUE7UUFFN0QsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxJQUFJLFdBQVcsRUFBRTtZQUM3QyxrT0FBa087WUFDbE8sTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUE7WUFDMUMsTUFBTSxLQUFLLEdBQUcsbUJBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7WUFDMUQsTUFBTSxzQkFBc0IsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFBO1lBQ25GLHVIQUF1SDtZQUN2SCxNQUFNLHFCQUFxQixHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdkUsSUFBSSxzQkFBc0IsRUFBRTtnQkFDMUIsSUFBSSxxQkFBcUIsRUFBRTtvQkFDekIsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsdURBQXVELEdBQUcsRUFBRSxDQUFDLENBQUE7b0JBQ3pFLG9GQUFvRjtvQkFDcEYsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLElBQUkscUJBQXFCLENBQUMscUJBQXFCO3dCQUM3RSxXQUFXLENBQUMsUUFBUSxDQUNsQixPQUFPLENBQUMsZ0JBQWdCLENBQUM7NEJBQ3ZCLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxNQUFNOzRCQUNwQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUN4QyxxQkFBcUIsRUFBRSxxQkFBcUIsQ0FBQyxxQkFBcUI7eUJBQ25FLENBQUMsQ0FDSCxDQUFBO29CQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixDQUFBO29CQUNoRixXQUFXLENBQUMsUUFBUSxDQUNsQixPQUFPLENBQUMsa0JBQWtCLENBQUM7d0JBQ3pCLEdBQUc7d0JBQ0gsU0FBUzt3QkFDVCxNQUFNLEVBQUUscUNBQXFDO3FCQUM5QyxDQUFDLENBQ0gsQ0FBQTtpQkFDRjtnQkFDRCxrQ0FBa0MsR0FBRyxJQUFJLENBQUE7YUFDMUM7U0FDRjtRQUVELElBQUksa0NBQWtDLEVBQUU7WUFDdEMsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7U0FDckM7S0FDRjtJQUVELHlGQUF5RjtJQUN6RixzREFBc0Q7SUFDdEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRTVDLE1BQU0sb0JBQW9CLEdBQWlDO1FBQ3pELEdBQUcsS0FBSztRQUNSLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBcUIsRUFBRSxFQUFFLENBQ3pDLE1BQU0sQ0FDSixNQUFNLHNCQUFjLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FDdEQsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDO1FBQ25CLE1BQU07S0FDUCxDQUFBO0lBQ0QsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtJQUVqRSxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQXRFVSxRQUFBLGVBQWUsbUJBc0V6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkYXB0ZXJSZXF1ZXN0LCBFeGVjdXRlLCBNYWtlV1NIYW5kbGVyLCBNaWRkbGV3YXJlIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyB3aXRoTWlkZGxld2FyZSB9IGZyb20gJy4uLy4uLy4uL2luZGV4J1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vbW9kdWxlcydcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi4vLi4vdXRpbCdcbmltcG9ydCB7IGdldFdTQ29uZmlnIH0gZnJvbSAnLi4vd3MvY29uZmlnJ1xuaW1wb3J0IHsgZ2V0U3Vic0lkLCBSb290U3RhdGUgYXMgV1NTdGF0ZSB9IGZyb20gJy4uL3dzL3JlZHVjZXInXG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucydcbmltcG9ydCB7IENhY2hlV2FybWVyU3RhdGUgfSBmcm9tICcuL3JlZHVjZXInXG5cbmV4cG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuZXhwb3J0ICogYXMgZXBpY3MgZnJvbSAnLi9lcGljcydcbmV4cG9ydCAqIGFzIHJlZHVjZXIgZnJvbSAnLi9yZWR1Y2VyJ1xuXG5pbnRlcmZhY2UgV1NJbnB1dCB7XG4gIHN0b3JlOiBTdG9yZTxXU1N0YXRlPlxuICBtYWtlV1NIYW5kbGVyPzogTWFrZVdTSGFuZGxlclxufVxuXG5leHBvcnQgY29uc3Qgd2l0aENhY2hlV2FybWVyID1cbiAgKHdhcm1lclN0b3JlOiBTdG9yZTxDYWNoZVdhcm1lclN0YXRlPiwgbWlkZGxld2FyZTogTWlkZGxld2FyZVtdLCB3czogV1NJbnB1dCkgPT5cbiAgKHJhd0V4ZWN1dGU6IEV4ZWN1dGUpOiBNaWRkbGV3YXJlID0+XG4gIGFzeW5jIChleGVjdXRlLCBjb250ZXh0KSA9PlxuICBhc3luYyAoaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0KSA9PiB7XG4gICAgY29uc3QgaXNXYXJtZXJBY3RpdmUgPVxuICAgICAgdXRpbC5wYXJzZUJvb2wodXRpbC5nZXRFbnYoJ0NBQ0hFX0VOQUJMRUQnLCB1bmRlZmluZWQsIGNvbnRleHQpKSAmJlxuICAgICAgdXRpbC5wYXJzZUJvb2wodXRpbC5nZXRFbnYoJ1dBUk1VUF9FTkFCTEVEJykpXG4gICAgaWYgKCFpc1dhcm1lckFjdGl2ZSkgcmV0dXJuIGF3YWl0IGV4ZWN1dGUoaW5wdXQsIGNvbnRleHQpXG5cbiAgICBjb25zdCB3c0NvbmZpZyA9IGdldFdTQ29uZmlnKGlucHV0LmRhdGEuZW5kcG9pbnQsIGNvbnRleHQpXG5cbiAgICBpZiAod3NDb25maWcuZW5hYmxlZCAmJiB3cy5tYWtlV1NIYW5kbGVyKSB7XG4gICAgICAvLyBJZiBXUyBpcyBhdmFpbGFibGUsIGFuZCB0aGVyZSBpcyBhbiBhY3RpdmUgc3Vic2NyaXB0aW9uLCB3YXJtZXIgc2hvdWxkIG5vdCBiZSBhY3RpdmVcbiAgICAgIGxldCBiYXRjaE1lbWJlckhhc0FjdGl2ZVdTU3Vic2NyaXB0aW9uID0gZmFsc2VcblxuICAgICAgY29uc3Qga2V5c1RvQ2hlY2sgPSBpbnB1dC5kZWJ1Zz8uYmF0Y2hDaGlsZHJlbkNhY2hlS2V5cyB8fCBbXVxuXG4gICAgICBmb3IgKGNvbnN0IFtrZXksIGNoaWxkUmVxdWVzdF0gb2Yga2V5c1RvQ2hlY2spIHtcbiAgICAgICAgLy8gQ291bGQgaGFwcGVuIHRoYXQgYSBzdWJzY3JpcHRpb24gaXMgc3RpbGwgbG9hZGluZy4gSWYgdGhhdCdzIHRoZSBjYXNlLCB3YXJtZXIgd2lsbCBvcGVuIGEgc3Vic2NyaXB0aW9uLiBJZiB0aGUgV1MgYmVjb21lcyBhY3RpdmUsIG9uIG5leHQgcmVxdWVzdHMgd2FybWVyIHdpbGwgYmUgdW5zdWJzY3JpYmVkJyAgICAgIGNvbnN0IHdzSGFuZGxlciA9IGF3YWl0IHdzLm1ha2VXU0hhbmRsZXIoKVxuICAgICAgICBjb25zdCB3c0hhbmRsZXIgPSBhd2FpdCB3cy5tYWtlV1NIYW5kbGVyKClcbiAgICAgICAgY29uc3Qgd3NLZXkgPSBnZXRTdWJzSWQod3NIYW5kbGVyLnN1YnNjcmliZShjaGlsZFJlcXVlc3QpKVxuICAgICAgICBjb25zdCBpc0FjdGl2ZVdTU3Vic2NyaXB0aW9uID0gd3Muc3RvcmUuZ2V0U3RhdGUoKS5zdWJzY3JpcHRpb25zLmFsbFt3c0tleV0/LmFjdGl2ZVxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIFdTIHN1YnNjcmlwdGlvbiBhY3RpdmUsIHdhcm11cCBzdWJzY3JpcHRpb24gKGlmIGV4aXN0cykgc2hvdWxkIGJlIHJlbW92ZWQsIGFuZCBub3QgcGxheSBmb3IgdGhlIG1vbWVudFxuICAgICAgICBjb25zdCBpc0FjdGl2ZUNXU3Vic2NpcHRpb24gPSB3YXJtZXJTdG9yZS5nZXRTdGF0ZSgpLnN1YnNjcmlwdGlvbnNba2V5XVxuICAgICAgICBpZiAoaXNBY3RpdmVXU1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgIGlmIChpc0FjdGl2ZUNXU3Vic2NpcHRpb24pIHtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKGBBY3RpdmUgV1MgZmVlZCBkZXRlY3RlZDogZGlzYWJsaW5nIGNhY2hlIHdhcm1lciBmb3IgJHtrZXl9YClcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgQmF0Y2ggV1Mgc3Vic2NyaXB0aW9uIGFjdGl2ZSwgd2FybXVwIHN1YnNjcmlwdGlvbiBzaG91bGQgYmUgcmVtb3ZlZFxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlQ1dTdWJzY2lwdGlvbi5wYXJlbnQgJiYgaXNBY3RpdmVDV1N1YnNjaXB0aW9uLmJhdGNoYWJsZVByb3BlcnR5UGF0aClcbiAgICAgICAgICAgICAgd2FybWVyU3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgYWN0aW9ucy53YXJtdXBMZWF2ZUdyb3VwKHtcbiAgICAgICAgICAgICAgICAgIHBhcmVudDogaXNBY3RpdmVDV1N1YnNjaXB0aW9uLnBhcmVudCxcbiAgICAgICAgICAgICAgICAgIGNoaWxkTGFzdFNlZW5CeUlkOiB7IFtrZXldOiBEYXRlLm5vdygpIH0sXG4gICAgICAgICAgICAgICAgICBiYXRjaGFibGVQcm9wZXJ0eVBhdGg6IGlzQWN0aXZlQ1dTdWJzY2lwdGlvbi5iYXRjaGFibGVQcm9wZXJ0eVBhdGgsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIGNvbnN0IGlzQmF0Y2hlZCA9ICEhd2FybWVyU3RvcmUuZ2V0U3RhdGUoKS5zdWJzY3JpcHRpb25zW2tleV0/LmNoaWxkTGFzdFNlZW5CeUlkXG4gICAgICAgICAgICB3YXJtZXJTdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgYWN0aW9ucy53YXJtdXBVbnN1YnNjcmliZWQoe1xuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBpc0JhdGNoZWQsXG4gICAgICAgICAgICAgICAgcmVhc29uOiAnVHVybmluZyBvZmYgQ2FjaGUgV2FybWVyIHRvIHVzZSBXUy4nLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgYmF0Y2hNZW1iZXJIYXNBY3RpdmVXU1N1YnNjcmlwdGlvbiA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYmF0Y2hNZW1iZXJIYXNBY3RpdmVXU1N1YnNjcmlwdGlvbikge1xuICAgICAgICByZXR1cm4gYXdhaXQgZXhlY3V0ZShpbnB1dCwgY29udGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbiBjYXNlIFdTIGlzIG5vdCBhdmFpbGFibGUsIG9yIFdTIGhhcyBubyBhY3RpdmUgc3Vic2NyaXB0aW9uLCB3YXJtZXIgc2hvdWxkIGJlIGFjdGl2ZVxuICAgIC8vIERpc3BhdGNoIHN1YnNjcmlwdGlvbiBvbmx5IGlmIGV4ZWN1dGUgd2FzIHN1Y2Nlc2Z1bFxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGUoaW5wdXQsIGNvbnRleHQpXG5cbiAgICBjb25zdCB3YXJtdXBFeGVjdXRlUGF5bG9hZDogYWN0aW9ucy5XYXJtdXBFeGVjdXRlUGF5bG9hZCA9IHtcbiAgICAgIC4uLmlucHV0LFxuICAgICAgZXhlY3V0ZUZuOiBhc3luYyAoaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0KSA9PlxuICAgICAgICBhd2FpdCAoXG4gICAgICAgICAgYXdhaXQgd2l0aE1pZGRsZXdhcmUocmF3RXhlY3V0ZSwgY29udGV4dCwgbWlkZGxld2FyZSlcbiAgICAgICAgKShpbnB1dCwgY29udGV4dCksXG4gICAgICByZXN1bHQsXG4gICAgfVxuICAgIHdhcm1lclN0b3JlLmRpc3BhdGNoKGFjdGlvbnMud2FybXVwRXhlY3V0ZSh3YXJtdXBFeGVjdXRlUGF5bG9hZCkpXG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbiJdfQ==