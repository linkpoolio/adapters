import LRU from 'lru-cache';
import { CacheEntry } from './types';
export interface LocalOptions {
    type: 'local';
    max: number;
    maxAge: number;
    updateAgeOnGet: boolean;
}
export declare const defaultOptions: () => LocalOptions;
export declare const redactOptions: (opts: any) => any;
declare type CacheOptions = Omit<LRU.Options<string, CacheEntry | boolean>, 'max' | 'maxAge' | 'updateAgeOnGet'> & ReturnType<typeof defaultOptions>;
export declare class LocalLRUCache {
    options: CacheOptions;
    client: LRU<string, CacheEntry | boolean>;
    static cacheInstance: LocalLRUCache;
    static getInstance(options: CacheOptions): LocalLRUCache;
    constructor(options: CacheOptions);
    setResponse(key: string, value: any, maxAge: number): boolean;
    setFlightMarker(key: string, maxAge: number): boolean;
    getResponse(key: string): Promise<CacheEntry | undefined>;
    getFlightMarker(key: string): Promise<boolean>;
    del(key: string): void;
    ttl(key: string): number;
    close(): void;
}
export {};
//# sourceMappingURL=local.d.ts.map