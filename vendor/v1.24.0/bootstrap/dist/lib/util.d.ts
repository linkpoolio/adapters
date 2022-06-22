import { AdapterContext, AdapterImplementation, EnvDefaults } from '@chainlink/types';
import { Decimal } from 'decimal.js';
import { CacheEntry } from './middleware/cache/types';
/**
 * Used in the `getEnv` util function as a backup when an env var
 * is `empty` or `undefined`, and no `envDefaultOverride` is given.
 */
export declare const baseEnvDefaults: EnvDefaults;
export declare const isObject: (o: unknown) => boolean;
export declare const isArray: (o: unknown) => boolean;
export declare const parseBool: (value: any) => boolean;
export declare const toObjectWithNumbers: (obj: any) => {
    [k: string]: any;
};
export declare const getRandomEnv: (name: string, delimiter?: string, prefix?: string) => string | undefined;
export declare const getRandomRequiredEnv: (name: string, delimiter?: string, prefix?: string) => string | undefined;
export declare const uuid: () => string;
/**
 * Return a value used for exponential backoff in milliseconds.
 * @example
 * exponentialBackOffMs(1,100,1000,2) === 100
 * exponentialBackOffMs(2,100,1000,2) === 200
 * exponentialBackOffMs(3,100,1000,2) === 400
 *
 * @param retryCount The amount of retries that have passed
 * @param interval The interval in ms
 * @param max The maximum back-off in ms
 * @param coefficient The base multiplier
 */
export declare const exponentialBackOffMs: (retryCount?: number, interval?: number, max?: number, coefficient?: number) => number;
export declare const getWithCoalescing: ({ get, isInFlight, retries, interval, }: {
    get: (retryCount: number) => Promise<CacheEntry | undefined>;
    isInFlight: (retryCount: number) => Promise<boolean>;
    retries: number;
    interval: (retryCount: number) => number;
}) => Promise<CacheEntry | undefined>;
/**
 * Get the env var with the given `name`. If the variable is
 * not present in `process.env`, it will default to the adapter's
 * `envDefaultOverrides` if adapter's `context` is present, then
 * `baseEnvDefaults`. In order for `envDefaultOverrides` to override the
 * base default, the adapter's `context` must be passed into `getEnv`
 * everywhere that the variable is fetched. See `WS_ENABLED` as an example.
 * @param name Env var to fetch
 * @param prefix Prefix for env var (useful when working with composites)
 * @param context Adapter context to pull `envDefaultOverrides` from
 * @returns the env var string if found, else undefined
 */
export declare const getEnv: (name: string, prefix?: string, context?: AdapterContext | undefined) => string | undefined;
export declare class RequiredEnvError extends Error {
    constructor(name: string);
}
/**
 * Get variable from environments
 * @param name The name of environment variable
 * @param prefix A string to add before the environment variable name
 * @throws {RequiredEnvError} Will throw an error if environment variable is not defined.
 * @returns {string}
 */
export declare const getRequiredEnv: (name: string, prefix?: string) => string;
export declare const formatArray: (input: string | string[]) => string[];
/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
export declare function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>>;
/**
 * Predicate used to find adapter by name
 *
 * @param name string adapter name
 */
export declare const byName: (name?: string | undefined) => (a: AdapterImplementation) => boolean;
/**
 * Covert number to max number of decimals, trim trailing zeros
 *
 * @param num number to convert to fixed max number of decimals
 * @param decimals max number of decimals
 */
export declare const toFixedMax: (num: number | string | Decimal, decimals: number) => string;
export declare const isDebug: () => boolean;
export declare const isDebugLogLevel: () => boolean;
/**
 * @description
 * Builds a permutation set from a list of options
 *
 * @param options The options to create a permutation from
 * @param delimiter (Optional) Joins the permutation results to a string
 *
 * @returns Array of permutations
 */
export declare const permutator: (options: string[], delimiter?: string | undefined) => string[] | string[][];
/**
 * @description
 * Check existing (non-undefined) value for its type.
 *
 * @url
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#real-world_usage
 *
 * @param value The value to type check
 * @param fullClass (Optional) Whether to use polyfill for checking null
 *
 * @returns String describing type of obj
 */
export declare function deepType(value: unknown, fullClass?: boolean): string;
export declare const LEGACY_ENV_ADAPTER_URL = "DATA_PROVIDER_URL";
export declare const ENV_ADAPTER_URL = "ADAPTER_URL";
export declare const getURL: (prefix: string, required?: boolean) => string | undefined;
export declare const getRequiredURL: (prefix: string) => string;
/**
 * Get variable from environment then check for a fallback if it is not set then throw if neither are set
 * @param primary The name of environment variable to look for first
 * @param prefix A string to add before the environment variable name
 * @param fallbacks The subsequent names of environment variables to look for if the primary is not found
 * @throws {RequiredEnvError} Will throw an error if environment variable is not defined.
 * @returns {string}
 */
export declare const getRequiredEnvWithFallback: (primary: string, fallbacks: string[], prefix?: string) => string;
/**
 * Build a URL path using the given pathTemplate and params. If a param is found in pathTemplate, it will be inserted there; otherwise, it will be ignored.
 * eg.) pathTemplate = "/from/:from/to/:to" and params = { from: "ETH", to: "BTC", note: "hello" } will become "/from/ETH/to/BTC"
 * @param pathTemplate The path template for the URL path. Each param to include in the path should have a prefix of ':'.
 * @param params The object containing keys & values to be added to the URL path.
 * @param whitelist The list of characters to whitelist for the URL path (if a param contains one of your whitelisted characters, it will not be encoded).
 * @returns {string}
 */
export declare const buildUrlPath: (pathTemplate?: string, params?: {}, whitelist?: string) => string;
/**
 * Build a full URL using the given baseUrl, pathTemplate and params. Uses buildUrlPath to add path & params.
 * @param baseUrl The base URL to add the pathTemplate & params to.
 * @param pathTemplate The path template for the URL path. Leave empty if only searchParams are required.
 * @param params The object containing keys & values to be added to the URL path.
 * @param whitelist The list of characters to whitelist for the URL path.
 * @returns {string}
 */
export declare const buildUrl: (baseUrl: string, pathTemplate?: string, params?: {}, whitelist?: string) => string;
/**
 * Adapters use to run with Node 14, which by default didn't crash when a rejected promised bubbled up to the top.
 * This function registers a global handler to catch those rejections and just log them to console.
 */
export declare const registerUnhandledRejectionHandler: () => void;
/**
 * Sleeps for the provided number of milliseconds
 * @param ms The number of milliseconds to sleep for
 * @returns a Promise that resolves once the specified time passes
 */
export declare const sleep: (ms: number) => Promise<void>;
/**
 * Remove stale request entries from an array.
 * This function assumes that the array is sorted by timestamp,
 * where the oldest entry lives in the 0th index, and the newest entry
 * lives in the arr.length-1th index
 * @param items The items to filter
 * @param filter The windowing function to apply
 */
export declare function sortedFilter<T>(items: T[], windowingFunction: (item: T) => boolean): T[];
//# sourceMappingURL=util.d.ts.map