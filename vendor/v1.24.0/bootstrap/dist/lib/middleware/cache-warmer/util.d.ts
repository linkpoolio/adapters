import { WarmupExecutePayload, WarmupSubscribedPayload } from './actions';
import { SubscriptionData } from './reducer';
import { AdapterResponse } from '@chainlink/types';
/**
 * Returns hash of the input request payload excluding some volatile paths
 *
 * @param request payload
 */
export declare function getSubscriptionKey(request: WarmupSubscribedPayload | WarmupExecutePayload): string;
declare type BatchPath = string[];
interface BatchRequestChunk {
    [path: string]: BatchPath;
}
export declare function splitIntoBatches(requestData: SubscriptionData): BatchRequestChunk[];
export declare function concatenateBatchResults(result: AdapterResponse | null, latestResult: AdapterResponse): AdapterResponse;
export {};
//# sourceMappingURL=util.d.ts.map