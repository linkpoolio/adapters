"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorBackoff = exports.reducer = exports.actions = void 0;
const tslib_1 = require("tslib");
const reducer_1 = require("./reducer");
const actions = tslib_1.__importStar(require("./actions"));
const config_1 = require("../cache-warmer/config");
const modules_1 = require("../../modules");
const rate_limit_1 = require("../rate-limit");
const util_1 = require("../../util");
exports.actions = tslib_1.__importStar(require("./actions"));
exports.reducer = tslib_1.__importStar(require("./reducer"));
const withErrorBackoff = (store) => async (execute, context) => async (input) => {
    if (!store)
        return await execute(input, context);
    // Update time window
    store.dispatch(actions.requestObserved());
    const state = store.getState();
    const { requests } = state;
    // Limit errors by id to back off from repeated errors
    if (input.id !== config_1.WARMUP_BATCH_REQUEST_ID // Always allow Batch Warmer requests through
    ) {
        const errorCapacity = parseInt(util_1.getEnv('ERROR_CAPACITY') || '2');
        const observedIdRequestsInMinute = reducer_1.selectParticiantsRequestsById(requests, reducer_1.IntervalNames.MINUTE, rate_limit_1.makeId(input));
        if (observedIdRequestsInMinute.length === errorCapacity) {
            modules_1.logger.warn(`External Adapter backing off errored request. ${errorCapacity} requests have returned errors in the last minute.`);
            throw new modules_1.AdapterError({
                jobRunID: input.id,
                message: 'Errored request backoff: This request has returned too many errors in the past minute.',
                statusCode: 429,
            });
        }
    }
    try {
        return await execute(input, context);
    }
    catch (error) {
        // Record error
        const requestObservedPayload = {
            input,
        };
        store.dispatch(actions.requestFailedObserved(requestObservedPayload));
        // Continue throwing
        throw error;
    }
};
exports.withErrorBackoff = withErrorBackoff;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21pZGRsZXdhcmUvZXJyb3ItYmFja29mZi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsdUNBS2tCO0FBQ2xCLDJEQUFvQztBQUNwQyxtREFBZ0U7QUFDaEUsMkNBQW9EO0FBQ3BELDhDQUFzQztBQUN0QyxxQ0FBbUM7QUFFbkMsNkRBQW9DO0FBQ3BDLDZEQUFvQztBQUU3QixNQUFNLGdCQUFnQixHQUMzQixDQUFDLEtBQWdDLEVBQWMsRUFBRSxDQUNqRCxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQzNCLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNkLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFaEQscUJBQXFCO0lBQ3JCLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7SUFFekMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQzlCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBZ0MsS0FBSyxDQUFBO0lBRXZELHNEQUFzRDtJQUN0RCxJQUNFLEtBQUssQ0FBQyxFQUFFLEtBQUssZ0NBQXVCLENBQUMsNkNBQTZDO01BQ2xGO1FBQ0EsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQy9ELE1BQU0sMEJBQTBCLEdBQUcsdUNBQTZCLENBQzlELFFBQVEsRUFDUix1QkFBYSxDQUFDLE1BQU0sRUFDcEIsbUJBQU0sQ0FBQyxLQUFLLENBQUMsQ0FDZCxDQUFBO1FBQ0QsSUFBSSwwQkFBMEIsQ0FBQyxNQUFNLEtBQUssYUFBYSxFQUFFO1lBQ3ZELGdCQUFNLENBQUMsSUFBSSxDQUNULGlEQUFpRCxhQUFhLG9EQUFvRCxDQUNuSCxDQUFBO1lBQ0QsTUFBTSxJQUFJLHNCQUFZLENBQUM7Z0JBQ3JCLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxFQUNMLHdGQUF3RjtnQkFDMUYsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFBO1NBQ0g7S0FDRjtJQUVELElBQUk7UUFDRixPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUNyQztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsZUFBZTtRQUNmLE1BQU0sc0JBQXNCLEdBQW1DO1lBQzdELEtBQUs7U0FDTixDQUFBO1FBQ0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFBO1FBQ3JFLG9CQUFvQjtRQUNwQixNQUFNLEtBQUssQ0FBQTtLQUNaO0FBQ0gsQ0FBQyxDQUFBO0FBOUNVLFFBQUEsZ0JBQWdCLG9CQThDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNaWRkbGV3YXJlIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQge1xuICBFcnJvckJhY2tvZmZTdGF0ZSxcbiAgSW50ZXJ2YWxOYW1lcyxcbiAgUmVxdWVzdHNTdGF0ZSxcbiAgc2VsZWN0UGFydGljaWFudHNSZXF1ZXN0c0J5SWQsXG59IGZyb20gJy4vcmVkdWNlcidcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuaW1wb3J0IHsgV0FSTVVQX0JBVENIX1JFUVVFU1RfSUQgfSBmcm9tICcuLi9jYWNoZS13YXJtZXIvY29uZmlnJ1xuaW1wb3J0IHsgQWRhcHRlckVycm9yLCBsb2dnZXIgfSBmcm9tICcuLi8uLi9tb2R1bGVzJ1xuaW1wb3J0IHsgbWFrZUlkIH0gZnJvbSAnLi4vcmF0ZS1saW1pdCdcbmltcG9ydCB7IGdldEVudiB9IGZyb20gJy4uLy4uL3V0aWwnXG5cbmV4cG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuZXhwb3J0ICogYXMgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInXG5cbmV4cG9ydCBjb25zdCB3aXRoRXJyb3JCYWNrb2ZmID1cbiAgKHN0b3JlPzogU3RvcmU8RXJyb3JCYWNrb2ZmU3RhdGU+KTogTWlkZGxld2FyZSA9PlxuICBhc3luYyAoZXhlY3V0ZSwgY29udGV4dCkgPT5cbiAgYXN5bmMgKGlucHV0KSA9PiB7XG4gICAgaWYgKCFzdG9yZSkgcmV0dXJuIGF3YWl0IGV4ZWN1dGUoaW5wdXQsIGNvbnRleHQpXG5cbiAgICAvLyBVcGRhdGUgdGltZSB3aW5kb3dcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnJlcXVlc3RPYnNlcnZlZCgpKVxuXG4gICAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpXG4gICAgY29uc3QgeyByZXF1ZXN0cyB9OiB7IHJlcXVlc3RzOiBSZXF1ZXN0c1N0YXRlIH0gPSBzdGF0ZVxuXG4gICAgLy8gTGltaXQgZXJyb3JzIGJ5IGlkIHRvIGJhY2sgb2ZmIGZyb20gcmVwZWF0ZWQgZXJyb3JzXG4gICAgaWYgKFxuICAgICAgaW5wdXQuaWQgIT09IFdBUk1VUF9CQVRDSF9SRVFVRVNUX0lEIC8vIEFsd2F5cyBhbGxvdyBCYXRjaCBXYXJtZXIgcmVxdWVzdHMgdGhyb3VnaFxuICAgICkge1xuICAgICAgY29uc3QgZXJyb3JDYXBhY2l0eSA9IHBhcnNlSW50KGdldEVudignRVJST1JfQ0FQQUNJVFknKSB8fCAnMicpXG4gICAgICBjb25zdCBvYnNlcnZlZElkUmVxdWVzdHNJbk1pbnV0ZSA9IHNlbGVjdFBhcnRpY2lhbnRzUmVxdWVzdHNCeUlkKFxuICAgICAgICByZXF1ZXN0cyxcbiAgICAgICAgSW50ZXJ2YWxOYW1lcy5NSU5VVEUsXG4gICAgICAgIG1ha2VJZChpbnB1dCksXG4gICAgICApXG4gICAgICBpZiAob2JzZXJ2ZWRJZFJlcXVlc3RzSW5NaW51dGUubGVuZ3RoID09PSBlcnJvckNhcGFjaXR5KSB7XG4gICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgIGBFeHRlcm5hbCBBZGFwdGVyIGJhY2tpbmcgb2ZmIGVycm9yZWQgcmVxdWVzdC4gJHtlcnJvckNhcGFjaXR5fSByZXF1ZXN0cyBoYXZlIHJldHVybmVkIGVycm9ycyBpbiB0aGUgbGFzdCBtaW51dGUuYCxcbiAgICAgICAgKVxuICAgICAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgICAgICBqb2JSdW5JRDogaW5wdXQuaWQsXG4gICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICdFcnJvcmVkIHJlcXVlc3QgYmFja29mZjogVGhpcyByZXF1ZXN0IGhhcyByZXR1cm5lZCB0b28gbWFueSBlcnJvcnMgaW4gdGhlIHBhc3QgbWludXRlLicsXG4gICAgICAgICAgc3RhdHVzQ29kZTogNDI5LFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgZXhlY3V0ZShpbnB1dCwgY29udGV4dClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gUmVjb3JkIGVycm9yXG4gICAgICBjb25zdCByZXF1ZXN0T2JzZXJ2ZWRQYXlsb2FkOiBhY3Rpb25zLlJlcXVlc3RPYnNlcnZlZFBheWxvYWQgPSB7XG4gICAgICAgIGlucHV0LFxuICAgICAgfVxuICAgICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5yZXF1ZXN0RmFpbGVkT2JzZXJ2ZWQocmVxdWVzdE9ic2VydmVkUGF5bG9hZCkpXG4gICAgICAvLyBDb250aW51ZSB0aHJvd2luZ1xuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH1cbiJdfQ==