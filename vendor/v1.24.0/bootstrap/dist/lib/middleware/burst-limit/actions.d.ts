import { AdapterRequest } from '@chainlink/types';
export interface RequestObservedPayload {
    input: AdapterRequest;
}
export declare const requestObserved: import("@reduxjs/toolkit").ActionCreatorWithPayload<RequestObservedPayload, string>;
export declare const updateIntervals: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"BL/UPDATE_INTERVALS">;
//# sourceMappingURL=actions.d.ts.map