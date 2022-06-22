"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootReducer = exports.selectParticiantsHeartbeatsFor = exports.selectTotalNumberOfHeartbeatsFor = exports.Intervals = exports.IntervalNames = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const _1 = require(".");
const util_1 = require("../../util");
const config_1 = require("../cache-warmer/config");
const actions_1 = require("./actions");
var IntervalNames;
(function (IntervalNames) {
    IntervalNames["MINUTE"] = "MINUTE";
    IntervalNames["HOUR"] = "HOUR";
})(IntervalNames = exports.IntervalNames || (exports.IntervalNames = {}));
exports.Intervals = {
    [IntervalNames.MINUTE]: 60 * 1000,
    [IntervalNames.HOUR]: 60 * 60 * 1000,
};
const initialHeartbeatsState = {
    total: {},
    participants: {},
};
const DEFAULT_COST = 1;
const heartbeatReducer = toolkit_1.createReducer(initialHeartbeatsState, (builder) => {
    builder.addCase(actions_1.successfulResponseObserved, (state, action) => {
        const heartbeat = {
            id: action.payload.input?.debug?.cacheKey ?? _1.makeId(action.payload.input),
            c: action.payload.response.data.cost || DEFAULT_COST,
            t: Date.parse(action.payload.createdAt),
            h: !!action.payload.response.maxAge,
        };
        const { id } = heartbeat;
        // Init if first time seeing this id
        if (!state.participants[id]) {
            state.participants[id] = {
                HOUR: [],
            };
        }
        const storedIntervals = [IntervalNames.HOUR];
        for (const intervalName of storedIntervals) {
            const prevLength = state.participants[id][intervalName].length;
            /**
             * We skip adding warmup requests to state since
             * we dont use them anyway, but we still want to
             * re-compute throughtput on every incoming request
             */
            const isWarmupRequest = action.payload.input.id === config_1.WARMUP_REQUEST_ID;
            if (!isWarmupRequest) {
                state.participants[id][intervalName] = state.participants[id][intervalName].concat([
                    heartbeat,
                ]);
            }
            // remove all heartbeats that are older than the current interval
            const window = heartbeat.t - exports.Intervals[intervalName];
            const isInWindow = (h) => h.t >= window;
            state.participants[id][intervalName] = util_1.sortedFilter(state.participants[id][intervalName], isInWindow);
            const newLength = state.participants[id][intervalName].length;
            /**
             * We update our total observed heartbeats by the diff of this participants heartbeats length.
             * Ex. Let us have 5 observed heartbeats within the current hour interval across all
             * participants, then state.total[intervalName] = 5.
             * Let us have 3 observed heartbeats in the current participant, where 2 have just become stale,
             * since they are over an hour old.
             *
             * Then we have the following:
             * state.total[intervalName] = state.total[intervalName] + (newLength - prevLength)
             * state.total[HOUR] = state.total[HOUR] + (newLength - prevLength)
             * state.total[HOUR] = 5 + (1 - 3)
             * state.total[HOUR] = 5 + -2
             * state.total[HOUR] = 3
             */
            state.total[intervalName] = (state.total[intervalName] ?? 0) + (newLength - prevLength);
        }
        return state;
    });
});
function selectTotalNumberOfHeartbeatsFor(state, interval) {
    return (state.total[interval] ?? 0) + 1;
}
exports.selectTotalNumberOfHeartbeatsFor = selectTotalNumberOfHeartbeatsFor;
function selectParticiantsHeartbeatsFor(state, interval, id) {
    return state.participants[id]?.[interval] ?? [];
}
exports.selectParticiantsHeartbeatsFor = selectParticiantsHeartbeatsFor;
exports.rootReducer = toolkit_1.combineReducers({
    heartbeats: heartbeatReducer,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWlkZGxld2FyZS9yYXRlLWxpbWl0L3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOENBQWlFO0FBQ2pFLHdCQUEwQjtBQUMxQixxQ0FBeUM7QUFDekMsbURBQTBEO0FBQzFELHVDQUFzRDtBQUV0RCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDdkIsa0NBQWlCLENBQUE7SUFDakIsOEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUd4QjtBQUVZLFFBQUEsU0FBUyxHQUE4QjtJQUNsRCxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUNqQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7Q0FDckMsQ0FBQTtBQThCRCxNQUFNLHNCQUFzQixHQUFlO0lBQ3pDLEtBQUssRUFBRSxFQUFFO0lBQ1QsWUFBWSxFQUFFLEVBQUU7Q0FDakIsQ0FBQTtBQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQTtBQUV0QixNQUFNLGdCQUFnQixHQUFHLHVCQUFhLENBQWEsc0JBQXNCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUNyRixPQUFPLENBQUMsT0FBTyxDQUFDLG9DQUEwQixFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzVELE1BQU0sU0FBUyxHQUFjO1lBQzNCLEVBQUUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxJQUFJLFNBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN6RSxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxZQUFZO1lBQ3BELENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTTtTQUNwQyxDQUFBO1FBQ0QsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLFNBQVMsQ0FBQTtRQUN4QixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDM0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRztnQkFDdkIsSUFBSSxFQUFFLEVBQUU7YUFDVCxDQUFBO1NBQ0Y7UUFDRCxNQUFNLGVBQWUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUU1QyxLQUFLLE1BQU0sWUFBWSxJQUFJLGVBQWUsRUFBRTtZQUMxQyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQTtZQUM5RDs7OztlQUlHO1lBQ0gsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLDBCQUFpQixDQUFBO1lBQ3JFLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3BCLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQ2pGLFNBQVM7aUJBQ1YsQ0FBQyxDQUFBO2FBQ0g7WUFFRCxpRUFBaUU7WUFDakUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsR0FBRyxpQkFBUyxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ3BELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQTtZQUNsRCxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLG1CQUFZLENBQ2pELEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQ3BDLFVBQVUsQ0FDWCxDQUFBO1lBQ0QsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUE7WUFDN0Q7Ozs7Ozs7Ozs7Ozs7ZUFhRztZQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFBO1NBQ3hGO1FBRUQsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBZ0IsZ0NBQWdDLENBQzlDLEtBQWlCLEVBQ2pCLFFBQXVCO0lBRXZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN6QyxDQUFDO0FBTEQsNEVBS0M7QUFDRCxTQUFnQiw4QkFBOEIsQ0FDNUMsS0FBaUIsRUFDakIsUUFBdUIsRUFDdkIsRUFBVTtJQUVWLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUNqRCxDQUFDO0FBTkQsd0VBTUM7QUFFWSxRQUFBLFdBQVcsR0FBRyx5QkFBZSxDQUFDO0lBQ3pDLFVBQVUsRUFBRSxnQkFBZ0I7Q0FDN0IsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzLCBjcmVhdGVSZWR1Y2VyIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCdcbmltcG9ydCB7IG1ha2VJZCB9IGZyb20gJy4nXG5pbXBvcnQgeyBzb3J0ZWRGaWx0ZXIgfSBmcm9tICcuLi8uLi91dGlsJ1xuaW1wb3J0IHsgV0FSTVVQX1JFUVVFU1RfSUQgfSBmcm9tICcuLi9jYWNoZS13YXJtZXIvY29uZmlnJ1xuaW1wb3J0IHsgc3VjY2Vzc2Z1bFJlc3BvbnNlT2JzZXJ2ZWQgfSBmcm9tICcuL2FjdGlvbnMnXG5cbmV4cG9ydCBlbnVtIEludGVydmFsTmFtZXMge1xuICBNSU5VVEUgPSAnTUlOVVRFJyxcbiAgSE9VUiA9ICdIT1VSJyxcbn1cblxuZXhwb3J0IGNvbnN0IEludGVydmFsczogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHtcbiAgW0ludGVydmFsTmFtZXMuTUlOVVRFXTogNjAgKiAxMDAwLFxuICBbSW50ZXJ2YWxOYW1lcy5IT1VSXTogNjAgKiA2MCAqIDEwMDAsXG59XG5cbi8vIFNob3J0ZW5lZCBuYW1lcyB0byByZWR1Y2UgbWVtb3J5IHVzYWdlXG5leHBvcnQgaW50ZXJmYWNlIEhlYXJ0YmVhdCB7XG4gIGlkOiBzdHJpbmdcbiAgLyoqXG4gICAqIENvc3RcbiAgICovXG4gIGM6IG51bWJlclxuICAvKipcbiAgICogVGltZXN0YW1wXG4gICAqL1xuICB0OiBudW1iZXJcbiAgLyoqXG4gICAqIGlzQ2FjaGVIaXRcbiAgICovXG4gIGg6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBIZWFydGJlYXRzIHtcbiAgdG90YWw6IHtcbiAgICBbaW50ZXJ2YWw6IHN0cmluZ106IG51bWJlclxuICB9XG4gIHBhcnRpY2lwYW50czoge1xuICAgIFtwYXJ0aWNpcGFudElkOiBzdHJpbmddOiB7XG4gICAgICBbaW50ZXJ2YWw6IHN0cmluZ106IEhlYXJ0YmVhdFtdXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGluaXRpYWxIZWFydGJlYXRzU3RhdGU6IEhlYXJ0YmVhdHMgPSB7XG4gIHRvdGFsOiB7fSxcbiAgcGFydGljaXBhbnRzOiB7fSxcbn1cblxuY29uc3QgREVGQVVMVF9DT1NUID0gMVxuXG5jb25zdCBoZWFydGJlYXRSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcjxIZWFydGJlYXRzPihpbml0aWFsSGVhcnRiZWF0c1N0YXRlLCAoYnVpbGRlcikgPT4ge1xuICBidWlsZGVyLmFkZENhc2Uoc3VjY2Vzc2Z1bFJlc3BvbnNlT2JzZXJ2ZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgY29uc3QgaGVhcnRiZWF0OiBIZWFydGJlYXQgPSB7XG4gICAgICBpZDogYWN0aW9uLnBheWxvYWQuaW5wdXQ/LmRlYnVnPy5jYWNoZUtleSA/PyBtYWtlSWQoYWN0aW9uLnBheWxvYWQuaW5wdXQpLFxuICAgICAgYzogYWN0aW9uLnBheWxvYWQucmVzcG9uc2UuZGF0YS5jb3N0IHx8IERFRkFVTFRfQ09TVCxcbiAgICAgIHQ6IERhdGUucGFyc2UoYWN0aW9uLnBheWxvYWQuY3JlYXRlZEF0KSxcbiAgICAgIGg6ICEhYWN0aW9uLnBheWxvYWQucmVzcG9uc2UubWF4QWdlLFxuICAgIH1cbiAgICBjb25zdCB7IGlkIH0gPSBoZWFydGJlYXRcbiAgICAvLyBJbml0IGlmIGZpcnN0IHRpbWUgc2VlaW5nIHRoaXMgaWRcbiAgICBpZiAoIXN0YXRlLnBhcnRpY2lwYW50c1tpZF0pIHtcbiAgICAgIHN0YXRlLnBhcnRpY2lwYW50c1tpZF0gPSB7XG4gICAgICAgIEhPVVI6IFtdLFxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdG9yZWRJbnRlcnZhbHMgPSBbSW50ZXJ2YWxOYW1lcy5IT1VSXVxuXG4gICAgZm9yIChjb25zdCBpbnRlcnZhbE5hbWUgb2Ygc3RvcmVkSW50ZXJ2YWxzKSB7XG4gICAgICBjb25zdCBwcmV2TGVuZ3RoID0gc3RhdGUucGFydGljaXBhbnRzW2lkXVtpbnRlcnZhbE5hbWVdLmxlbmd0aFxuICAgICAgLyoqXG4gICAgICAgKiBXZSBza2lwIGFkZGluZyB3YXJtdXAgcmVxdWVzdHMgdG8gc3RhdGUgc2luY2VcbiAgICAgICAqIHdlIGRvbnQgdXNlIHRoZW0gYW55d2F5LCBidXQgd2Ugc3RpbGwgd2FudCB0b1xuICAgICAgICogcmUtY29tcHV0ZSB0aHJvdWdodHB1dCBvbiBldmVyeSBpbmNvbWluZyByZXF1ZXN0XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGlzV2FybXVwUmVxdWVzdCA9IGFjdGlvbi5wYXlsb2FkLmlucHV0LmlkID09PSBXQVJNVVBfUkVRVUVTVF9JRFxuICAgICAgaWYgKCFpc1dhcm11cFJlcXVlc3QpIHtcbiAgICAgICAgc3RhdGUucGFydGljaXBhbnRzW2lkXVtpbnRlcnZhbE5hbWVdID0gc3RhdGUucGFydGljaXBhbnRzW2lkXVtpbnRlcnZhbE5hbWVdLmNvbmNhdChbXG4gICAgICAgICAgaGVhcnRiZWF0LFxuICAgICAgICBdKVxuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgYWxsIGhlYXJ0YmVhdHMgdGhhdCBhcmUgb2xkZXIgdGhhbiB0aGUgY3VycmVudCBpbnRlcnZhbFxuICAgICAgY29uc3Qgd2luZG93ID0gaGVhcnRiZWF0LnQgLSBJbnRlcnZhbHNbaW50ZXJ2YWxOYW1lXVxuICAgICAgY29uc3QgaXNJbldpbmRvdyA9IChoOiBIZWFydGJlYXQpID0+IGgudCA+PSB3aW5kb3dcbiAgICAgIHN0YXRlLnBhcnRpY2lwYW50c1tpZF1baW50ZXJ2YWxOYW1lXSA9IHNvcnRlZEZpbHRlcjxIZWFydGJlYXQ+KFxuICAgICAgICBzdGF0ZS5wYXJ0aWNpcGFudHNbaWRdW2ludGVydmFsTmFtZV0sXG4gICAgICAgIGlzSW5XaW5kb3csXG4gICAgICApXG4gICAgICBjb25zdCBuZXdMZW5ndGggPSBzdGF0ZS5wYXJ0aWNpcGFudHNbaWRdW2ludGVydmFsTmFtZV0ubGVuZ3RoXG4gICAgICAvKipcbiAgICAgICAqIFdlIHVwZGF0ZSBvdXIgdG90YWwgb2JzZXJ2ZWQgaGVhcnRiZWF0cyBieSB0aGUgZGlmZiBvZiB0aGlzIHBhcnRpY2lwYW50cyBoZWFydGJlYXRzIGxlbmd0aC5cbiAgICAgICAqIEV4LiBMZXQgdXMgaGF2ZSA1IG9ic2VydmVkIGhlYXJ0YmVhdHMgd2l0aGluIHRoZSBjdXJyZW50IGhvdXIgaW50ZXJ2YWwgYWNyb3NzIGFsbFxuICAgICAgICogcGFydGljaXBhbnRzLCB0aGVuIHN0YXRlLnRvdGFsW2ludGVydmFsTmFtZV0gPSA1LlxuICAgICAgICogTGV0IHVzIGhhdmUgMyBvYnNlcnZlZCBoZWFydGJlYXRzIGluIHRoZSBjdXJyZW50IHBhcnRpY2lwYW50LCB3aGVyZSAyIGhhdmUganVzdCBiZWNvbWUgc3RhbGUsXG4gICAgICAgKiBzaW5jZSB0aGV5IGFyZSBvdmVyIGFuIGhvdXIgb2xkLlxuICAgICAgICpcbiAgICAgICAqIFRoZW4gd2UgaGF2ZSB0aGUgZm9sbG93aW5nOlxuICAgICAgICogc3RhdGUudG90YWxbaW50ZXJ2YWxOYW1lXSA9IHN0YXRlLnRvdGFsW2ludGVydmFsTmFtZV0gKyAobmV3TGVuZ3RoIC0gcHJldkxlbmd0aClcbiAgICAgICAqIHN0YXRlLnRvdGFsW0hPVVJdID0gc3RhdGUudG90YWxbSE9VUl0gKyAobmV3TGVuZ3RoIC0gcHJldkxlbmd0aClcbiAgICAgICAqIHN0YXRlLnRvdGFsW0hPVVJdID0gNSArICgxIC0gMylcbiAgICAgICAqIHN0YXRlLnRvdGFsW0hPVVJdID0gNSArIC0yXG4gICAgICAgKiBzdGF0ZS50b3RhbFtIT1VSXSA9IDNcbiAgICAgICAqL1xuICAgICAgc3RhdGUudG90YWxbaW50ZXJ2YWxOYW1lXSA9IChzdGF0ZS50b3RhbFtpbnRlcnZhbE5hbWVdID8/IDApICsgKG5ld0xlbmd0aCAtIHByZXZMZW5ndGgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlXG4gIH0pXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0VG90YWxOdW1iZXJPZkhlYXJ0YmVhdHNGb3IoXG4gIHN0YXRlOiBIZWFydGJlYXRzLFxuICBpbnRlcnZhbDogSW50ZXJ2YWxOYW1lcyxcbik6IG51bWJlciB7XG4gIHJldHVybiAoc3RhdGUudG90YWxbaW50ZXJ2YWxdID8/IDApICsgMVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdFBhcnRpY2lhbnRzSGVhcnRiZWF0c0ZvcihcbiAgc3RhdGU6IEhlYXJ0YmVhdHMsXG4gIGludGVydmFsOiBJbnRlcnZhbE5hbWVzLFxuICBpZDogc3RyaW5nLFxuKTogSGVhcnRiZWF0W10ge1xuICByZXR1cm4gc3RhdGUucGFydGljaXBhbnRzW2lkXT8uW2ludGVydmFsXSA/PyBbXVxufVxuXG5leHBvcnQgY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuICBoZWFydGJlYXRzOiBoZWFydGJlYXRSZWR1Y2VyLFxufSlcbmV4cG9ydCB0eXBlIFJvb3RTdGF0ZSA9IFJldHVyblR5cGU8dHlwZW9mIHJvb3RSZWR1Y2VyPlxuIl19