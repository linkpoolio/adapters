import { RedisClientOptions } from '@node-redis/client/dist/lib/client';
import { RedisModules, RedisScripts } from '@node-redis/client/dist/lib/commands';
import { CacheEntry } from '../types';
export declare type RedisOptions = RedisClientOptions<RedisModules, RedisScripts> & {
    maxAge: number;
    timeout: number;
    type: 'redis';
};
export declare const defaultOptions: () => RedisOptions;
export declare const redactOptions: (opts: RedisOptions) => RedisOptions;
export declare class RedisCache {
    options: RedisOptions;
    client: any;
    constructor(options: RedisOptions);
    static build(options: RedisOptions): Promise<RedisCache>;
    setResponse(key: string, value: CacheEntry, maxAge: number): Promise<any>;
    setFlightMarker(key: string, maxAge: number): Promise<any>;
    getResponse(key: string): Promise<CacheEntry | undefined>;
    getFlightMarker(key: string): Promise<boolean>;
    del(key: string): Promise<any>;
    ttl(key: string): Promise<number>;
    /**
     * Forcibly close the connection to the Redis server.
     *
     * AWS Lambda will timeout if the connection is not closed, because the connection
     * keeps the event loop busy.
     *
     * The alternative is to use: `context.callbackWaitsForEmtpyEventLoop = false`
     */
    close(): Promise<void>;
    contextualTimeout(promise: Promise<any>, fnName: string, context: Record<string, any>): Promise<any>;
}
//# sourceMappingURL=redis.d.ts.map