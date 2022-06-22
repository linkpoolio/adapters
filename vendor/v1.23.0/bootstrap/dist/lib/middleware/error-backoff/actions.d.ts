import { AdapterRequest } from '@chainlink/types';
export interface RequestObservedPayload {
    input: AdapterRequest;
}
export declare const requestFailedObserved: import("@reduxjs/toolkit").ActionCreatorWithPayload<RequestObservedPayload, string>;
export declare const requestObserved: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"EB/REQUEST_OBSERVED">;
export declare const shutdown: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"EB/SHUTDOWN">;
//# sourceMappingURL=actions.d.ts.map