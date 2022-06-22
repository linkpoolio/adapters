import type { Middleware, AdapterRequest, Config, APIEndpoint } from '@chainlink/types';
export declare const withNormalizedInput: <C extends Config>(endpointSelector?: (request: AdapterRequest) => APIEndpoint<C>) => Middleware;
export declare function normalizeInput<C extends Config>(request: AdapterRequest, apiEndpoint: APIEndpoint<C>): AdapterRequest;
//# sourceMappingURL=index.d.ts.map