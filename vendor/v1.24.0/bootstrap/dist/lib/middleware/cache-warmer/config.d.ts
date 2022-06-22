import objectHash from 'object-hash';
export declare const WARMUP_REQUEST_ID = "9001";
export declare const WARMUP_BATCH_REQUEST_ID = "9002";
export declare const MINIMUM_WARMUP_INTERVAL = 500;
export declare const WARMUP_POLL_OFFSET = 1000;
export interface Config {
    /**
     * The interval in milliseconds which the warm-up engine will execute
     * the underlying external adapter to update its cache. If left empty
     * should calculate the interval based on the TTL of each request.
     */
    warmupInterval?: number;
    /**
     * The number of errors that can consecutively occur
     * before a warmup subscription for a particular request
     * is cancelled
     */
    unhealthyThreshold: number;
    /**
     * The time to live on a subscription, if no new requests come in that do not
     * originate from the warm up engine itself
     */
    subscriptionTTL: number;
    /**
     * Hashing options for differentiating requests
     */
    hashOpts: Required<Parameters<typeof objectHash>>['1'];
}
export declare function get(): Config;
//# sourceMappingURL=config.d.ts.map