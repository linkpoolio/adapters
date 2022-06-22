import { AdapterContext, AdapterRequest, AdapterResponse, Middleware } from '@chainlink/types';
import { Store } from 'redux';
import { reducer } from '../burst-limit';
import * as local from './local';
import { LocalOptions } from './local';
import * as redis from './redis';
import { CacheEntry } from './types';
export declare type Cache = redis.RedisCache | local.LocalLRUCache;
export interface CacheOptions {
    instance?: Cache;
    enabled: boolean;
    cacheImplOptions: local.LocalOptions | redis.RedisOptions;
    cacheBuilder: (options: CacheImplOptions) => Promise<redis.RedisCache | local.LocalLRUCache>;
    key: {
        group: string;
    };
    requestCoalescing: {
        enabled: boolean;
        interval: number;
        intervalMax: number;
        intervalCoefficient: number;
        entropyMax: number;
        maxRetries: number;
    };
    minimumAge: number;
}
export declare const defaultOptions: (shouldUseLocal?: boolean | undefined, adapterContext?: AdapterContext | undefined) => CacheOptions;
export declare type CacheImplOptions = LocalOptions | redis.RedisOptions;
export declare const redactOptions: (options: CacheOptions) => CacheOptions;
export declare class AdapterCache {
    private readonly options;
    private cache;
    constructor(context: AdapterContext);
    getKey(key: string): string;
    get instance(): Cache;
    getCoalescingKey(key: string): string;
    setInFlightMarker(key: string, maxAge: number): Promise<void>;
    delInFlightMarker(key: string): Promise<void>;
    getWithCoalescing(key: string): Promise<undefined | CacheEntry>;
    getResultForRequest(adapterRequest: AdapterRequest): Promise<AdapterResponse | undefined>;
}
export declare const buildDefaultLocalAdapterCache: (context: AdapterContext) => Promise<AdapterCache>;
export declare const withCache: (rateLimit?: Store<import("redux").CombinedState<{
    requests: reducer.RequestsState;
}>, import("redux").AnyAction> | undefined) => Middleware;
//# sourceMappingURL=index.d.ts.map