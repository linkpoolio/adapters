import { AdapterRequest } from '@chainlink/types';
import { CacheOptions } from '.';
export declare const WARNING_MAX_AGE: number;
export declare const getRateLimitMaxAge: (adapterRequest: AdapterRequest, options?: CacheOptions) => number | undefined;
export declare const getMaxAgeOverride: (adapterRequest: AdapterRequest) => number | undefined;
export declare const getTTL: (adapterRequest: AdapterRequest, options?: CacheOptions) => number;
//# sourceMappingURL=ttl.d.ts.map