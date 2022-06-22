import type { Middleware, AdapterRequest, Config, APIEndpoint } from '@chainlink/types';
import { Validator } from '../../modules';
import { BatchableProperty } from '../cache-warmer/reducer';
export declare const withCacheKey: <C extends Config>(endpointSelector?: (request: AdapterRequest) => APIEndpoint<C>) => Middleware;
export declare function getCacheKey(validatedData: Validator['validated'], inputParameterKeys: string[], batchablePropertyPath?: BatchableProperty[]): string;
export declare function getBatchChildKeys<C extends Config>(input: AdapterRequest, endpoint: APIEndpoint<C>): [string, AdapterRequest][];
//# sourceMappingURL=index.d.ts.map