import { AdapterRequest, AdapterResponse } from '@chainlink/types';
import { ActionBase } from '../../store';
export interface SuccessfulRequestObservedPayload extends ActionBase {
    input: AdapterRequest;
    response: AdapterResponse;
}
export declare const successfulResponseObserved: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[input: AdapterRequest, response: AdapterResponse], SuccessfulRequestObservedPayload, "RL/SUCCESSFUL_RESPONSE_OBSERVED", never, never>;
//# sourceMappingURL=actions.d.ts.map