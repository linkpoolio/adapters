import { AdapterRequest } from '@chainlink/types';
/**
 * Separates a batched request into indivdual requests and calls a callback function with the individual request passed in
 * @param input The original batched request
 * @param dataFields The input request data object's fields
 * @param callback Callback function that is called after batching is complete
 */
export declare const separateBatches: (input: AdapterRequest, callback: (singleInput: AdapterRequest) => Promise<void>) => Promise<void>;
//# sourceMappingURL=utils.d.ts.map