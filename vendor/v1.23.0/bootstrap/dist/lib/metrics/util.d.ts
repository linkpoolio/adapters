import { AdapterRequest } from '@chainlink/types';
/**
 * Maxiumum number of characters that a feedId can contain.
 */
export declare const MAX_FEED_ID_LENGTH = 300;
/**
 * Fixed label value for cache warmer feed_id
 */
export declare const WARMER_FEED_ID = "CACHE_WARMER";
/**
 * Get feed id name based on input params
 * @param input The adapter input request
 * @returns {string}
 */
export declare const getFeedId: (input: AdapterRequest) => string;
//# sourceMappingURL=util.d.ts.map