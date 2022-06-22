"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortedFilter = exports.sleep = exports.registerUnhandledRejectionHandler = exports.buildUrl = exports.buildUrlPath = exports.getRequiredEnvWithFallback = exports.getRequiredURL = exports.getURL = exports.ENV_ADAPTER_URL = exports.LEGACY_ENV_ADAPTER_URL = exports.deepType = exports.permutator = exports.isDebugLogLevel = exports.isDebug = exports.toFixedMax = exports.byName = exports.groupBy = exports.formatArray = exports.getRequiredEnv = exports.RequiredEnvError = exports.getEnv = exports.getWithCoalescing = exports.exponentialBackOffMs = exports.uuid = exports.getRandomRequiredEnv = exports.getRandomEnv = exports.toObjectWithNumbers = exports.parseBool = exports.isArray = exports.isObject = exports.baseEnvDefaults = void 0;
const decimal_js_1 = require("decimal.js");
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
const modules_1 = require("./modules");
/**
 * Used in the `getEnv` util function as a backup when an env var
 * is `empty` or `undefined`, and no `envDefaultOverride` is given.
 */
exports.baseEnvDefaults = {
    BASE_URL: '/',
    EA_PORT: '8080',
    EA_HOST: '::',
    METRICS_PORT: '9080',
    RETRY: '1',
    API_TIMEOUT: '30000',
    CACHE_ENABLED: 'true',
    CACHE_TYPE: 'local',
    CACHE_MAX_AGE: '90000',
    CACHE_MIN_AGE: '30000',
    CACHE_MAX_ITEMS: '1000',
    CACHE_UPDATE_AGE_ON_GET: 'false',
    CACHE_REDIS_CONNECTION_TIMEOUT: '15000',
    CACHE_REDIS_HOST: '127.0.0.1',
    CACHE_REDIS_MAX_QUEUED_ITEMS: '500',
    CACHE_REDIS_MAX_RECONNECT_COOLDOWN: '3000',
    CACHE_REDIS_PORT: '6379',
    CACHE_REDIS_TIMEOUT: '500',
    RATE_LIMIT_ENABLED: 'true',
    WARMUP_ENABLED: 'true',
    WARMUP_UNHEALTHY_THRESHOLD: '3',
    WARMUP_SUBSCRIPTION_TTL: '3600000',
    REQUEST_COALESCING_INTERVAL: '100',
    REQUEST_COALESCING_INTERVAL_MAX: '1000',
    REQUEST_COALESCING_INTERVAL_COEFFICIENT: '2',
    REQUEST_COALESCING_ENTROPY_MAX: '0',
    REQUEST_COALESCING_MAX_RETRIES: '5',
    WS_ENABLED: 'false',
    WS_CONNECTION_KEY: '1',
    WS_CONNECTION_LIMIT: '1',
    WS_CONNECTION_TTL: '70000',
    WS_CONNECTION_RETRY_LIMIT: '3',
    WS_CONNECTION_RETRY_DELAY: '1000',
    WS_SUBSCRIPTION_LIMIT: '10',
    WS_SUBSCRIPTION_TTL: '120000',
    WS_SUBSCRIPTION_UNRESPONSIVE_TTL: '120000',
    DEFAULT_WS_HEARTBEAT_INTERVAL: '30000',
};
const isObject = (o) => o !== null && typeof o === 'object' && Array.isArray(o) === false;
exports.isObject = isObject;
const isArray = (o) => o !== null && typeof o === 'object' && Array.isArray(o);
exports.isArray = isArray;
const parseBool = (value) => {
    if (!value)
        return false;
    const _val = value.toString().toLowerCase();
    return (_val === 'true' || _val === 'false') && _val === 'true';
};
exports.parseBool = parseBool;
// convert string values into Numbers where possible (for incoming query strings)
const toObjectWithNumbers = (obj) => {
    const toNumber = (v) => (isNaN(v) ? v : Number(v));
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, toNumber(v)]));
};
exports.toObjectWithNumbers = toObjectWithNumbers;
// pick a random string from env var after splitting with the delimiter ("a&b&c" "&" -> choice(["a","b","c"]))
const getRandomEnv = (name, delimiter = ',', prefix = '') => {
    const val = exports.getEnv(name, prefix);
    if (!val)
        return val;
    const items = val.split(delimiter);
    return items[Math.floor(Math.random() * items.length)];
};
exports.getRandomEnv = getRandomEnv;
// pick a random string from env var after splitting with the delimiter ("a&b&c" "&" -> choice(["a","b","c"]))
const getRandomRequiredEnv = (name, delimiter = ',', prefix = '') => {
    const val = exports.getRequiredEnv(name, prefix);
    const items = val.split(delimiter);
    return items[Math.floor(Math.random() * items.length)];
};
exports.getRandomRequiredEnv = getRandomRequiredEnv;
// We generate an UUID per instance
const uuid = () => {
    if (!process.env.UUID)
        process.env.UUID = uuid_1.v4();
    return process.env.UUID;
};
exports.uuid = uuid;
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
const exponentialBackOffMs = (retryCount = 1, interval = 100, max = 1000, coefficient = 2) => Math.min(max, interval * coefficient ** (retryCount - 1));
exports.exponentialBackOffMs = exponentialBackOffMs;
const getWithCoalescing = async ({ get, isInFlight, retries = 5, interval = () => 100, }) => {
    const _self = async (_retries) => {
        if (_retries === 0)
            return;
        const retryCount = retries - _retries + 1;
        const entry = await get(retryCount);
        if (entry)
            return entry;
        const inFlight = await isInFlight(retryCount);
        if (!inFlight)
            return;
        await exports.sleep(interval(retryCount));
        return await _self(_retries - 1);
    };
    return await _self(retries);
};
exports.getWithCoalescing = getWithCoalescing;
const getEnvName = (name, prefix = '') => {
    const envName = prefix ? `${prefix}_${name}` : name;
    if (!isEnvNameValid(envName))
        throw Error(`Invalid environment var name: ${envName}. Only '/^[_a-z0-9]+$/i' is supported.`);
    return envName;
};
// Only case-insensitive alphanumeric and underscore (_) are allowed for env vars
const isEnvNameValid = (name) => /^[_a-z0-9]+$/i.test(name);
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
const getEnv = (name, prefix = '', context) => {
    let envVar = process.env[getEnvName(name, prefix)];
    if (!envVar || envVar === '') {
        //@ts-expect-error EnvDefaultOverrides only allows specific string keys, but optional chaining
        // protects against cases where 'name' is not in EnvDefaultOverrides
        envVar = context?.envDefaultOverrides?.[name] ?? exports.baseEnvDefaults[name];
    }
    if (envVar === '')
        envVar = undefined;
    return envVar;
};
exports.getEnv = getEnv;
// Custom error for required env variable.
class RequiredEnvError extends Error {
    constructor(name) {
        super(`Please set the required env ${name}.`);
        this.name = RequiredEnvError.name;
    }
}
exports.RequiredEnvError = RequiredEnvError;
/**
 * Get variable from environments
 * @param name The name of environment variable
 * @param prefix A string to add before the environment variable name
 * @throws {RequiredEnvError} Will throw an error if environment variable is not defined.
 * @returns {string}
 */
const getRequiredEnv = (name, prefix = '') => {
    const val = exports.getEnv(name, prefix);
    if (!val)
        throw new RequiredEnvError(getEnvName(name, prefix));
    return val;
};
exports.getRequiredEnv = getRequiredEnv;
// format input as an array regardless of if it is a string or an array already
const formatArray = (input) => typeof input === 'string' ? [input] : input;
exports.formatArray = formatArray;
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
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        }
        else {
            collection.push(item);
        }
    });
    return map;
}
exports.groupBy = groupBy;
/**
 * Predicate used to find adapter by name
 *
 * @param name string adapter name
 */
const byName = (name) => (a) => a.NAME.toUpperCase() === name?.toUpperCase();
exports.byName = byName;
/**
 * Covert number to max number of decimals, trim trailing zeros
 *
 * @param num number to convert to fixed max number of decimals
 * @param decimals max number of decimals
 */
const toFixedMax = (num, decimals) => new decimal_js_1.Decimal(num)
    .toFixed(decimals)
    // remove trailing zeros
    .replace(/(\.\d*?[1-9])0+$/g, '$1')
    // remove decimal part if all zeros (or only decimal point)
    .replace(/\.0*$/g, '');
exports.toFixedMax = toFixedMax;
// Helper to identify if debug mode is running
const isDebug = () => {
    return exports.parseBool(exports.getEnv('DEBUG')) || exports.getEnv('NODE_ENV') === 'development';
};
exports.isDebug = isDebug;
// Helper to identify if debug log level is set
const isDebugLogLevel = () => {
    return exports.getEnv('LOG_LEVEL') === 'debug';
};
exports.isDebugLogLevel = isDebugLogLevel;
/**
 * @description Calculates all possible permutations without repetition of a certain size.
 *
 * @param collection A collection of distinct values to calculate the permutations from.
 * @param n The number of values to combine.
 *
 * @returns Array of permutations
 */
const permutations = (collection, n) => {
    const array = lodash_1.values(collection);
    if (array.length < n)
        return [];
    const recur = (array, n) => {
        if (--n < 0)
            return [[]];
        const permutations = [];
        array.forEach((value, index, array) => {
            array = array.slice();
            array.splice(index, 1);
            recur(array, n).forEach((permutation) => {
                permutation.unshift(value);
                permutations.push(permutation);
            });
        });
        return permutations;
    };
    return recur(array, n);
};
/**
 * @description
 * Builds a permutation set from a list of options
 *
 * @param options The options to create a permutation from
 * @param delimiter (Optional) Joins the permutation results to a string
 *
 * @returns Array of permutations
 */
const permutator = (options, delimiter) => {
    const output = lodash_1.flatMap(options, (_, i, a) => permutations(a, i + 1));
    const join = (combos) => combos.map((p) => p.join(delimiter));
    return typeof delimiter === 'string' ? join(output) : output;
};
exports.permutator = permutator;
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
function deepType(value, fullClass) {
    // get toPrototypeString() of obj (handles all types)
    // Early JS environments return '[object Object]' for null, so it's best to directly check for it.
    if (fullClass) {
        return value === null ? '[object Null]' : Object.prototype.toString.call(value);
    }
    if (value == null) {
        return (value + '').toLowerCase();
    } // implicit toString() conversion
    const deepType = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    if (deepType === 'generatorfunction') {
        return 'function';
    }
    // Prevent overspecificity (for example, [object HTMLDivElement], etc).
    // Account for functionish Regexp (Android <=2.3), functionish <object> element (Chrome <=57, Firefox <=52), etc.
    // String.prototype.match is universally supported.
    return deepType.match(/^(array|bigint|date|error|function|generator|regexp|symbol)$/)
        ? deepType
        : typeof value === 'object' || typeof value === 'function'
            ? 'object'
            : typeof value;
}
exports.deepType = deepType;
exports.LEGACY_ENV_ADAPTER_URL = 'DATA_PROVIDER_URL';
exports.ENV_ADAPTER_URL = 'ADAPTER_URL';
const getURL = (prefix, required = false) => required
    ? exports.getRequiredURL(prefix)
    : exports.getEnv(exports.ENV_ADAPTER_URL, prefix) || exports.getEnv(exports.LEGACY_ENV_ADAPTER_URL, prefix);
exports.getURL = getURL;
const getRequiredURL = (prefix) => exports.getRequiredEnv(exports.ENV_ADAPTER_URL, prefix) || exports.getRequiredEnv(exports.LEGACY_ENV_ADAPTER_URL, prefix);
exports.getRequiredURL = getRequiredURL;
/**
 * Get variable from environment then check for a fallback if it is not set then throw if neither are set
 * @param primary The name of environment variable to look for first
 * @param prefix A string to add before the environment variable name
 * @param fallbacks The subsequent names of environment variables to look for if the primary is not found
 * @throws {RequiredEnvError} Will throw an error if environment variable is not defined.
 * @returns {string}
 */
const getRequiredEnvWithFallback = (primary, fallbacks, prefix = '') => {
    // Attempt primary
    const val = exports.getEnv(primary, prefix);
    if (val)
        return val;
    // Attempt fallbacks
    for (const fallback of fallbacks) {
        const val = exports.getEnv(fallback, prefix);
        if (val)
            return val;
    }
    throw new RequiredEnvError(getEnvName(primary, prefix));
};
exports.getRequiredEnvWithFallback = getRequiredEnvWithFallback;
//  URL Encoding
const charsToEncode = {
    ':': '%3A',
    '/': '%2F',
    '?': '%3F',
    '#': '%23',
    '[': '%5B',
    ']': '%5D',
    '@': '%40',
    '!': '%21',
    $: '%24',
    '&': '%26',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '*': '%2A',
    '+': '%2B',
    ',': '%2C',
    ';': '%3B',
    '=': '%3D',
    '%': '%25',
    ' ': '%20',
    '"': '%22',
    '<': '%3C',
    '>': '%3E',
    '{': '%7B',
    '}': '%7D',
    '|': '%7C',
    '^': '%5E',
    '`': '%60',
    '\\': '%5C',
};
/**
 * Check whether the given string contains characters in the given whitelist.
 * @param str The string to check.
 * @param whitelist The string array of whitelist entries. Returns true if any of these are found in 'str', otherwise returns false.
 * @returns {boolean}
 */
const stringHasWhitelist = (str, whitelist) => whitelist.some((el) => str.includes(el));
/**
 * Manually iterate through a given string and replace unsafe/reserved characters with encoded values (unless a character is whitelisted)
 * @param str The string to encode.
 * @param whitelist The string array of whitelist entries.
 * @returns {string}
 */
const percentEncodeString = (str, whitelist) => str
    .split('')
    .map((char) => {
    const encodedValue = charsToEncode[char];
    return encodedValue && !whitelist.includes(char) ? encodedValue : char;
})
    .join('');
/**
 * Build a URL path using the given pathTemplate and params. If a param is found in pathTemplate, it will be inserted there; otherwise, it will be ignored.
 * eg.) pathTemplate = "/from/:from/to/:to" and params = { from: "ETH", to: "BTC", note: "hello" } will become "/from/ETH/to/BTC"
 * @param pathTemplate The path template for the URL path. Each param to include in the path should have a prefix of ':'.
 * @param params The object containing keys & values to be added to the URL path.
 * @param whitelist The list of characters to whitelist for the URL path (if a param contains one of your whitelisted characters, it will not be encoded).
 * @returns {string}
 */
const buildUrlPath = (pathTemplate = '', params = {}, whitelist = '') => {
    const allowedChars = whitelist.split('');
    for (const param in params) {
        const value = params[param];
        if (!value)
            continue;
        // If string contains a whitelisted character: manually replace any non-whitelisted characters with percent encoded values. Otherwise, encode the string as usual.
        const encodedValue = stringHasWhitelist(value, allowedChars)
            ? percentEncodeString(value, allowedChars)
            : encodeURIComponent(value);
        pathTemplate = pathTemplate.replace(`:${param}`, encodedValue);
    }
    return pathTemplate;
};
exports.buildUrlPath = buildUrlPath;
/**
 * Build a full URL using the given baseUrl, pathTemplate and params. Uses buildUrlPath to add path & params.
 * @param baseUrl The base URL to add the pathTemplate & params to.
 * @param pathTemplate The path template for the URL path. Leave empty if only searchParams are required.
 * @param params The object containing keys & values to be added to the URL path.
 * @param whitelist The list of characters to whitelist for the URL path.
 * @returns {string}
 */
const buildUrl = (baseUrl, pathTemplate = '', params = {}, whitelist = '') => new URL(exports.buildUrlPath(pathTemplate, params, whitelist), baseUrl).toString();
exports.buildUrl = buildUrl;
//  URL Encoding
let unhandledRejectionHandlerRegistered = false;
/**
 * Adapters use to run with Node 14, which by default didn't crash when a rejected promised bubbled up to the top.
 * This function registers a global handler to catch those rejections and just log them to console.
 */
const registerUnhandledRejectionHandler = () => {
    if (unhandledRejectionHandlerRegistered) {
        if (exports.getEnv('NODE_ENV') !== 'test')
            modules_1.logger.warn('UnhandledRejectionHandler attempted to be registered more than once');
        return;
    }
    unhandledRejectionHandlerRegistered = true;
    process.on('unhandledRejection', (reason) => {
        modules_1.logger.warn('Unhandled promise rejection reached custom handler');
        modules_1.logger.warn(JSON.stringify(reason));
    });
};
exports.registerUnhandledRejectionHandler = registerUnhandledRejectionHandler;
/**
 * Sleeps for the provided number of milliseconds
 * @param ms The number of milliseconds to sleep for
 * @returns a Promise that resolves once the specified time passes
 */
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;
/**
 * Remove stale request entries from an array.
 * This function assumes that the array is sorted by timestamp,
 * where the oldest entry lives in the 0th index, and the newest entry
 * lives in the arr.length-1th index
 * @param items The items to filter
 * @param filter The windowing function to apply
 */
function sortedFilter(items, windowingFunction) {
    // if we want a higher performance implementation
    // we can later resort to a custom array class that is circular
    // so we can amortize expensive operations like resizing, and make
    // operations like moving the head index much quicker
    const firstNonStaleItemIndex = items.findIndex(windowingFunction);
    if (firstNonStaleItemIndex === -1) {
        return [];
    }
    return items.slice(firstNonStaleItemIndex);
}
exports.sortedFilter = sortedFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBb0M7QUFDcEMsbUNBQXdDO0FBQ3hDLCtCQUFtQztBQUVuQyx1Q0FBa0M7QUFFbEM7OztHQUdHO0FBQ1UsUUFBQSxlQUFlLEdBQWdCO0lBQzFDLFFBQVEsRUFBRSxHQUFHO0lBQ2IsT0FBTyxFQUFFLE1BQU07SUFDZixPQUFPLEVBQUUsSUFBSTtJQUNiLFlBQVksRUFBRSxNQUFNO0lBQ3BCLEtBQUssRUFBRSxHQUFHO0lBQ1YsV0FBVyxFQUFFLE9BQU87SUFDcEIsYUFBYSxFQUFFLE1BQU07SUFDckIsVUFBVSxFQUFFLE9BQU87SUFDbkIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsZUFBZSxFQUFFLE1BQU07SUFDdkIsdUJBQXVCLEVBQUUsT0FBTztJQUNoQyw4QkFBOEIsRUFBRSxPQUFPO0lBQ3ZDLGdCQUFnQixFQUFFLFdBQVc7SUFDN0IsNEJBQTRCLEVBQUUsS0FBSztJQUNuQyxrQ0FBa0MsRUFBRSxNQUFNO0lBQzFDLGdCQUFnQixFQUFFLE1BQU07SUFDeEIsbUJBQW1CLEVBQUUsS0FBSztJQUMxQixrQkFBa0IsRUFBRSxNQUFNO0lBQzFCLGNBQWMsRUFBRSxNQUFNO0lBQ3RCLDBCQUEwQixFQUFFLEdBQUc7SUFDL0IsdUJBQXVCLEVBQUUsU0FBUztJQUNsQywyQkFBMkIsRUFBRSxLQUFLO0lBQ2xDLCtCQUErQixFQUFFLE1BQU07SUFDdkMsdUNBQXVDLEVBQUUsR0FBRztJQUM1Qyw4QkFBOEIsRUFBRSxHQUFHO0lBQ25DLDhCQUE4QixFQUFFLEdBQUc7SUFDbkMsVUFBVSxFQUFFLE9BQU87SUFDbkIsaUJBQWlCLEVBQUUsR0FBRztJQUN0QixtQkFBbUIsRUFBRSxHQUFHO0lBQ3hCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIseUJBQXlCLEVBQUUsR0FBRztJ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QixFQUFFO0lBQ2pELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUMxRCxDQUFDLENBQUE7QUFGWSxRQUFBLEtBQUssU0FFakI7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsWUFBWSxDQUFJLEtBQVUsRUFBRSxpQkFBdUM7SUFDakYsaURBQWlEO0lBQ2pELCtEQUErRDtJQUMvRCxrRUFBa0U7SUFDbEUscURBQXFEO0lBQ3JELE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ2pFLElBQUksc0JBQXNCLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDakMsT0FBTyxFQUFFLENBQUE7S0FDVjtJQUVELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzVDLENBQUM7QUFYRCxvQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkYXB0ZXJDb250ZXh0LCBBZGFwdGVySW1wbGVtZW50YXRpb24sIEVudkRlZmF1bHRzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IERlY2ltYWwgfSBmcm9tICdkZWNpbWFsLmpzJ1xuaW1wb3J0IHsgZmxhdE1hcCwgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCdcbmltcG9ydCB7IENhY2hlRW50cnkgfSBmcm9tICcuL21pZGRsZXdhcmUvY2FjaGUvdHlwZXMnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL21vZHVsZXMnXG5cbi8qKlxuICogVXNlZCBpbiB0aGUgYGdldEVudmAgdXRpbCBmdW5jdGlvbiBhcyBhIGJhY2t1cCB3aGVuIGFuIGVudiB2YXJcbiAqIGlzIGBlbXB0eWAgb3IgYHVuZGVmaW5lZGAsIGFuZCBubyBgZW52RGVmYXVsdE92ZXJyaWRlYCBpcyBnaXZlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGJhc2VFbnZEZWZhdWx0czogRW52RGVmYXVsdHMgPSB7XG4gIEJBU0VfVVJMOiAnLycsXG4gIEVBX1BPUlQ6ICc4MDgwJyxcbiAgRUFfSE9TVDogJzo6JyxcbiAgTUVUUklDU19QT1JUOiAnOTA4MCcsXG4gIFJFVFJZOiAnMScsXG4gIEFQSV9USU1FT1VUOiAnMzAwMDAnLFxuICBDQUNIRV9FTkFCTEVEOiAndHJ1ZScsXG4gIENBQ0hFX1RZUEU6ICdsb2NhbCcsXG4gIENBQ0hFX01BWF9BR0U6ICc5MDAwMCcsIC8vIDEuNSBtaW51dGVzXG4gIENBQ0hFX01JTl9BR0U6ICczMDAwMCcsXG4gIENBQ0hFX01BWF9JVEVNUzogJzEwMDAnLFxuICBDQUNIRV9VUERBVEVfQUdFX09OX0dFVDogJ2ZhbHNlJyxcbiAgQ0FDSEVfUkVESVNfQ09OTkVDVElPTl9USU1FT1VUOiAnMTUwMDAnLCAvLyBUaW1lb3V0IHBlciBsb25nIGxpdmVkIGNvbm5lY3Rpb24gKG1zKVxuICBDQUNIRV9SRURJU19IT1NUOiAnMTI3LjAuMC4xJywgLy8gSVAgYWRkcmVzcyBvZiB0aGUgUmVkaXMgc2VydmVyXG4gIENBQ0hFX1JFRElTX01BWF9RVUVVRURfSVRFTVM6ICc1MDAnLCAvLyBNYXhpbXVtIGxlbmd0aCBvZiB0aGUgY2xpZW50J3MgaW50ZXJuYWwgY29tbWFuZCBxdWV1ZVxuICBDQUNIRV9SRURJU19NQVhfUkVDT05ORUNUX0NPT0xET1dOOiAnMzAwMCcsIC8vIE1heCBjb29sZG93biB0aW1lIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHJlY29ubmVjdCAobXMpXG4gIENBQ0hFX1JFRElTX1BPUlQ6ICc2Mzc5JywgLy8gUG9ydCBvZiB0aGUgUmVkaXMgc2VydmVyXG4gIENBQ0hFX1JFRElTX1RJTUVPVVQ6ICc1MDAnLCAvLyBUaW1lb3V0IHBlciByZXF1ZXN0IChtcylcbiAgUkFURV9MSU1JVF9FTkFCTEVEOiAndHJ1ZScsXG4gIFdBUk1VUF9FTkFCTEVEOiAndHJ1ZScsXG4gIFdBUk1VUF9VTkhFQUxUSFlfVEhSRVNIT0xEOiAnMycsXG4gIFdBUk1VUF9TVUJTQ1JJUFRJT05fVFRMOiAnMzYwMDAwMCcsIC8vIGRlZmF1bHQgMWhcbiAgUkVRVUVTVF9DT0FMRVNDSU5HX0lOVEVSVkFMOiAnMTAwJyxcbiAgUkVRVUVTVF9DT0FMRVNDSU5HX0lOVEVSVkFMX01BWDogJzEwMDAnLFxuICBSRVFVRVNUX0NPQUxFU0NJTkdfSU5URVJWQUxfQ09FRkZJQ0lFTlQ6ICcyJyxcbiAgUkVRVUVTVF9DT0FMRVNDSU5HX0VOVFJPUFlfTUFYOiAnMCcsXG4gIFJFUVVFU1RfQ09BTEVTQ0lOR19NQVhfUkVUUklFUzogJzUnLFxuICBXU19FTkFCTEVEOiAnZmFsc2UnLFxuICBXU19DT05ORUNUSU9OX0tFWTogJzEnLFxuICBXU19DT05ORUNUSU9OX0xJTUlUOiAnMScsXG4gIFdTX0NPTk5FQ1RJT05fVFRMOiAnNzAwMDAnLFxuICBXU19DT05ORUNUSU9OX1JFVFJZX0xJTUlUOiAnMycsXG4gIFdTX0NPTk5FQ1RJT05fUkVUUllfREVMQVk6ICcxMDAwJyxcbiAgV1NfU1VCU0NSSVBUSU9OX0xJTUlUOiAnMTAnLFxuICBXU19TVUJTQ1JJUFRJT05fVFRMOiAnMTIwMDAwJyxcbiAgV1NfU1VCU0NSSVBUSU9OX1VOUkVTUE9OU0lWRV9UVEw6ICcxMjAwMDAnLFxuICBERUZBVUxUX1dTX0hFQVJUQkVBVF9JTlRFUlZBTDogJzMwMDAwJyxcbn1cblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKG86IHVua25vd24pOiBib29sZWFuID0+XG4gIG8gIT09IG51bGwgJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkobykgPT09IGZhbHNlXG5cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gKG86IHVua25vd24pOiBib29sZWFuID0+XG4gIG8gIT09IG51bGwgJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkobylcblxuZXhwb3J0IGNvbnN0IHBhcnNlQm9vbCA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBmYWxzZVxuICBjb25zdCBfdmFsID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG4gIHJldHVybiAoX3ZhbCA9PT0gJ3RydWUnIHx8IF92YWwgPT09ICdmYWxzZScpICYmIF92YWwgPT09ICd0cnVlJ1xufVxuXG4vLyBjb252ZXJ0IHN0cmluZyB2YWx1ZXMgaW50byBOdW1iZXJzIHdoZXJlIHBvc3NpYmxlIChmb3IgaW5jb21pbmcgcXVlcnkgc3RyaW5ncylcbmV4cG9ydCBjb25zdCB0b09iamVjdFdpdGhOdW1iZXJzID0gKG9iajogYW55KSA9PiB7XG4gIGNvbnN0IHRvTnVtYmVyID0gKHY6IGFueSkgPT4gKGlzTmFOKHYpID8gdiA6IE51bWJlcih2KSlcbiAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhvYmopLm1hcCgoW2ssIHZdKSA9PiBbaywgdG9OdW1iZXIodildKSlcbn1cblxuLy8gcGljayBhIHJhbmRvbSBzdHJpbmcgZnJvbSBlbnYgdmFyIGFmdGVyIHNwbGl0dGluZyB3aXRoIHRoZSBkZWxpbWl0ZXIgKFwiYSZiJmNcIiBcIiZcIiAtPiBjaG9pY2UoW1wiYVwiLFwiYlwiLFwiY1wiXSkpXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tRW52ID0gKG5hbWU6IHN0cmluZywgZGVsaW1pdGVyID0gJywnLCBwcmVmaXggPSAnJyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHZhbCA9IGdldEVudihuYW1lLCBwcmVmaXgpXG4gIGlmICghdmFsKSByZXR1cm4gdmFsXG4gIGNvbnN0IGl0ZW1zID0gdmFsLnNwbGl0KGRlbGltaXRlcilcbiAgcmV0dXJuIGl0ZW1zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zLmxlbmd0aCldXG59XG5cbi8vIHBpY2sgYSByYW5kb20gc3RyaW5nIGZyb20gZW52IHZhciBhZnRlciBzcGxpdHRpbmcgd2l0aCB0aGUgZGVsaW1pdGVyIChcImEmYiZjXCIgXCImXCIgLT4gY2hvaWNlKFtcImFcIixcImJcIixcImNcIl0pKVxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbVJlcXVpcmVkRW52ID0gKFxuICBuYW1lOiBzdHJpbmcsXG4gIGRlbGltaXRlciA9ICcsJyxcbiAgcHJlZml4ID0gJycsXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCB2YWwgPSBnZXRSZXF1aXJlZEVudihuYW1lLCBwcmVmaXgpXG4gIGNvbnN0IGl0ZW1zID0gdmFsLnNwbGl0KGRlbGltaXRlcilcbiAgcmV0dXJuIGl0ZW1zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zLmxlbmd0aCldXG59XG5cbi8vIFdlIGdlbmVyYXRlIGFuIFVVSUQgcGVyIGluc3RhbmNlXG5leHBvcnQgY29uc3QgdXVpZCA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXByb2Nlc3MuZW52LlVVSUQpIHByb2Nlc3MuZW52LlVVSUQgPSB1dWlkdjQoKVxuICByZXR1cm4gcHJvY2Vzcy5lbnYuVVVJRFxufVxuXG4vKipcbiAqIFJldHVybiBhIHZhbHVlIHVzZWQgZm9yIGV4cG9uZW50aWFsIGJhY2tvZmYgaW4gbWlsbGlzZWNvbmRzLlxuICogQGV4YW1wbGVcbiAqIGV4cG9uZW50aWFsQmFja09mZk1zKDEsMTAwLDEwMDAsMikgPT09IDEwMFxuICogZXhwb25lbnRpYWxCYWNrT2ZmTXMoMiwxMDAsMTAwMCwyKSA9PT0gMjAwXG4gKiBleHBvbmVudGlhbEJhY2tPZmZNcygzLDEwMCwxMDAwLDIpID09PSA0MDBcbiAqXG4gKiBAcGFyYW0gcmV0cnlDb3VudCBUaGUgYW1vdW50IG9mIHJldHJpZXMgdGhhdCBoYXZlIHBhc3NlZFxuICogQHBhcmFtIGludGVydmFsIFRoZSBpbnRlcnZhbCBpbiBtc1xuICogQHBhcmFtIG1heCBUaGUgbWF4aW11bSBiYWNrLW9mZiBpbiBtc1xuICogQHBhcmFtIGNvZWZmaWNpZW50IFRoZSBiYXNlIG11bHRpcGxpZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGV4cG9uZW50aWFsQmFja09mZk1zID0gKHJldHJ5Q291bnQgPSAxLCBpbnRlcnZhbCA9IDEwMCwgbWF4ID0gMTAwMCwgY29lZmZpY2llbnQgPSAyKSA9PlxuICBNYXRoLm1pbihtYXgsIGludGVydmFsICogY29lZmZpY2llbnQgKiogKHJldHJ5Q291bnQgLSAxKSlcblxuZXhwb3J0IGNvbnN0IGdldFdpdGhDb2FsZXNjaW5nID0gYXN5bmMgKHtcbiAgZ2V0LFxuICBpc0luRmxpZ2h0LFxuICByZXRyaWVzID0gNSxcbiAgaW50ZXJ2YWwgPSAoKSA9PiAxMDAsXG59OiB7XG4gIGdldDogKHJldHJ5Q291bnQ6IG51bWJlcikgPT4gUHJvbWlzZTxDYWNoZUVudHJ5IHwgdW5kZWZpbmVkPlxuICBpc0luRmxpZ2h0OiAocmV0cnlDb3VudDogbnVtYmVyKSA9PiBQcm9taXNlPGJvb2xlYW4+XG4gIHJldHJpZXM6IG51bWJlclxuICBpbnRlcnZhbDogKHJldHJ5Q291bnQ6IG51bWJlcikgPT4gbnVtYmVyXG59KSA9PiB7XG4gIGNvbnN0IF9zZWxmID0gYXN5bmMgKF9yZXRyaWVzOiBudW1iZXIpOiBQcm9taXNlPHVuZGVmaW5lZCB8IENhY2hlRW50cnk+ID0+IHtcbiAgICBpZiAoX3JldHJpZXMgPT09IDApIHJldHVyblxuICAgIGNvbnN0IHJldHJ5Q291bnQgPSByZXRyaWVzIC0gX3JldHJpZXMgKyAxXG4gICAgY29uc3QgZW50cnkgPSBhd2FpdCBnZXQocmV0cnlDb3VudClcbiAgICBpZiAoZW50cnkpIHJldHVybiBlbnRyeVxuICAgIGNvbnN0IGluRmxpZ2h0ID0gYXdhaXQgaXNJbkZsaWdodChyZXRyeUNvdW50KVxuICAgIGlmICghaW5GbGlnaHQpIHJldHVyblxuICAgIGF3YWl0IHNsZWVwKGludGVydmFsKHJldHJ5Q291bnQpKVxuICAgIHJldHVybiBhd2FpdCBfc2VsZihfcmV0cmllcyAtIDEpXG4gIH1cbiAgcmV0dXJuIGF3YWl0IF9zZWxmKHJldHJpZXMpXG59XG5cbmNvbnN0IGdldEVudk5hbWUgPSAobmFtZTogc3RyaW5nLCBwcmVmaXggPSAnJykgPT4ge1xuICBjb25zdCBlbnZOYW1lID0gcHJlZml4ID8gYCR7cHJlZml4fV8ke25hbWV9YCA6IG5hbWVcbiAgaWYgKCFpc0Vudk5hbWVWYWxpZChlbnZOYW1lKSlcbiAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBlbnZpcm9ubWVudCB2YXIgbmFtZTogJHtlbnZOYW1lfS4gT25seSAnL15bX2EtejAtOV0rJC9pJyBpcyBzdXBwb3J0ZWQuYClcbiAgcmV0dXJuIGVudk5hbWVcbn1cblxuLy8gT25seSBjYXNlLWluc2Vuc2l0aXZlIGFscGhhbnVtZXJpYyBhbmQgdW5kZXJzY29yZSAoXykgYXJlIGFsbG93ZWQgZm9yIGVudiB2YXJzXG5jb25zdCBpc0Vudk5hbWVWYWxpZCA9IChuYW1lOiBzdHJpbmcpID0+IC9eW19hLXowLTldKyQvaS50ZXN0KG5hbWUpXG5cbi8qKlxuICogR2V0IHRoZSBlbnYgdmFyIHdpdGggdGhlIGdpdmVuIGBuYW1lYC4gSWYgdGhlIHZhcmlhYmxlIGlzXG4gKiBub3QgcHJlc2VudCBpbiBgcHJvY2Vzcy5lbnZgLCBpdCB3aWxsIGRlZmF1bHQgdG8gdGhlIGFkYXB0ZXInc1xuICogYGVudkRlZmF1bHRPdmVycmlkZXNgIGlmIGFkYXB0ZXIncyBgY29udGV4dGAgaXMgcHJlc2VudCwgdGhlblxuICogYGJhc2VFbnZEZWZhdWx0c2AuIEluIG9yZGVyIGZvciBgZW52RGVmYXVsdE92ZXJyaWRlc2AgdG8gb3ZlcnJpZGUgdGhlXG4gKiBiYXNlIGRlZmF1bHQsIHRoZSBhZGFwdGVyJ3MgYGNvbnRleHRgIG11c3QgYmUgcGFzc2VkIGludG8gYGdldEVudmBcbiAqIGV2ZXJ5d2hlcmUgdGhhdCB0aGUgdmFyaWFibGUgaXMgZmV0Y2hlZC4gU2VlIGBXU19FTkFCTEVEYCBhcyBhbiBleGFtcGxlLlxuICogQHBhcmFtIG5hbWUgRW52IHZhciB0byBmZXRjaFxuICogQHBhcmFtIHByZWZpeCBQcmVmaXggZm9yIGVudiB2YXIgKHVzZWZ1bCB3aGVuIHdvcmtpbmcgd2l0aCBjb21wb3NpdGVzKVxuICogQHBhcmFtIGNvbnRleHQgQWRhcHRlciBjb250ZXh0IHRvIHB1bGwgYGVudkRlZmF1bHRPdmVycmlkZXNgIGZyb21cbiAqIEByZXR1cm5zIHRoZSBlbnYgdmFyIHN0cmluZyBpZiBmb3VuZCwgZWxzZSB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVudiA9IChuYW1lOiBzdHJpbmcsIHByZWZpeCA9ICcnLCBjb250ZXh0PzogQWRhcHRlckNvbnRleHQpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBsZXQgZW52VmFyID0gcHJvY2Vzcy5lbnZbZ2V0RW52TmFtZShuYW1lLCBwcmVmaXgpXVxuICBpZiAoIWVudlZhciB8fCBlbnZWYXIgPT09ICcnKSB7XG4gICAgLy9AdHMtZXhwZWN0LWVycm9yIEVudkRlZmF1bHRPdmVycmlkZXMgb25seSBhbGxvd3Mgc3BlY2lmaWMgc3RyaW5nIGtleXMsIGJ1dCBvcHRpb25hbCBjaGFpbmluZ1xuICAgIC8vIHByb3RlY3RzIGFnYWluc3QgY2FzZXMgd2hlcmUgJ25hbWUnIGlzIG5vdCBpbiBFbnZEZWZhdWx0T3ZlcnJpZGVzXG4gICAgZW52VmFyID0gY29udGV4dD8uZW52RGVmYXVsdE92ZXJyaWRlcz8uW25hbWVdID8/IGJhc2VFbnZEZWZhdWx0c1tuYW1lXVxuICB9XG4gIGlmIChlbnZWYXIgPT09ICcnKSBlbnZWYXIgPSB1bmRlZmluZWRcbiAgcmV0dXJuIGVudlZhclxufVxuXG4vLyBDdXN0b20gZXJyb3IgZm9yIHJlcXVpcmVkIGVudiB2YXJpYWJsZS5cbmV4cG9ydCBjbGFzcyBSZXF1aXJlZEVudkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgUGxlYXNlIHNldCB0aGUgcmVxdWlyZWQgZW52ICR7bmFtZX0uYClcbiAgICB0aGlzLm5hbWUgPSBSZXF1aXJlZEVudkVycm9yLm5hbWVcbiAgfVxufVxuXG4vKipcbiAqIEdldCB2YXJpYWJsZSBmcm9tIGVudmlyb25tZW50c1xuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgZW52aXJvbm1lbnQgdmFyaWFibGVcbiAqIEBwYXJhbSBwcmVmaXggQSBzdHJpbmcgdG8gYWRkIGJlZm9yZSB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUgbmFtZVxuICogQHRocm93cyB7UmVxdWlyZWRFbnZFcnJvcn0gV2lsbCB0aHJvdyBhbiBlcnJvciBpZiBlbnZpcm9ubWVudCB2YXJpYWJsZSBpcyBub3QgZGVmaW5lZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZXF1aXJlZEVudiA9IChuYW1lOiBzdHJpbmcsIHByZWZpeCA9ICcnKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdmFsID0gZ2V0RW52KG5hbWUsIHByZWZpeClcbiAgaWYgKCF2YWwpIHRocm93IG5ldyBSZXF1aXJlZEVudkVycm9yKGdldEVudk5hbWUobmFtZSwgcHJlZml4KSlcbiAgcmV0dXJuIHZhbFxufVxuXG4vLyBmb3JtYXQgaW5wdXQgYXMgYW4gYXJyYXkgcmVnYXJkbGVzcyBvZiBpZiBpdCBpcyBhIHN0cmluZyBvciBhbiBhcnJheSBhbHJlYWR5XG5leHBvcnQgY29uc3QgZm9ybWF0QXJyYXkgPSAoaW5wdXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogc3RyaW5nW10gPT5cbiAgdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/IFtpbnB1dF0gOiBpbnB1dFxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogVGFrZXMgYW4gQXJyYXk8Vj4sIGFuZCBhIGdyb3VwaW5nIGZ1bmN0aW9uLFxuICogYW5kIHJldHVybnMgYSBNYXAgb2YgdGhlIGFycmF5IGdyb3VwZWQgYnkgdGhlIGdyb3VwaW5nIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSBsaXN0IEFuIGFycmF5IG9mIHR5cGUgVi5cbiAqIEBwYXJhbSBrZXlHZXR0ZXIgQSBGdW5jdGlvbiB0aGF0IHRha2VzIHRoZSB0aGUgQXJyYXkgdHlwZSBWIGFzIGFuIGlucHV0LCBhbmQgcmV0dXJucyBhIHZhbHVlIG9mIHR5cGUgSy5cbiAqICAgICAgICAgICAgICAgICAgSyBpcyBnZW5lcmFsbHkgaW50ZW5kZWQgdG8gYmUgYSBwcm9wZXJ0eSBrZXkgb2YgVi5cbiAqXG4gKiBAcmV0dXJucyBNYXAgb2YgdGhlIGFycmF5IGdyb3VwZWQgYnkgdGhlIGdyb3VwaW5nIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxLLCBWPihsaXN0OiBBcnJheTxWPiwga2V5R2V0dGVyOiAoaW5wdXQ6IFYpID0+IEspOiBNYXA8SywgQXJyYXk8Vj4+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxLLCBBcnJheTxWPj4oKVxuICBsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBjb25zdCBrZXkgPSBrZXlHZXR0ZXIoaXRlbSlcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbWFwLmdldChrZXkpXG4gICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICBtYXAuc2V0KGtleSwgW2l0ZW1dKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2xsZWN0aW9uLnB1c2goaXRlbSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBtYXBcbn1cblxuLyoqXG4gKiBQcmVkaWNhdGUgdXNlZCB0byBmaW5kIGFkYXB0ZXIgYnkgbmFtZVxuICpcbiAqIEBwYXJhbSBuYW1lIHN0cmluZyBhZGFwdGVyIG5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGJ5TmFtZSA9XG4gIChuYW1lPzogc3RyaW5nKSA9PlxuICAoYTogQWRhcHRlckltcGxlbWVudGF0aW9uKTogYm9vbGVhbiA9PlxuICAgIGEuTkFNRS50b1VwcGVyQ2FzZSgpID09PSBuYW1lPy50b1VwcGVyQ2FzZSgpXG5cbi8qKlxuICogQ292ZXJ0IG51bWJlciB0byBtYXggbnVtYmVyIG9mIGRlY2ltYWxzLCB0cmltIHRyYWlsaW5nIHplcm9zXG4gKlxuICogQHBhcmFtIG51bSBudW1iZXIgdG8gY29udmVydCB0byBmaXhlZCBtYXggbnVtYmVyIG9mIGRlY2ltYWxzXG4gKiBAcGFyYW0gZGVjaW1hbHMgbWF4IG51bWJlciBvZiBkZWNpbWFsc1xuICovXG5leHBvcnQgY29uc3QgdG9GaXhlZE1heCA9IChudW06IG51bWJlciB8IHN0cmluZyB8IERlY2ltYWwsIGRlY2ltYWxzOiBudW1iZXIpOiBzdHJpbmcgPT5cbiAgbmV3IERlY2ltYWwobnVtKVxuICAgIC50b0ZpeGVkKGRlY2ltYWxzKVxuICAgIC8vIHJlbW92ZSB0cmFpbGluZyB6ZXJvc1xuICAgIC5yZXBsYWNlKC8oXFwuXFxkKj9bMS05XSkwKyQvZywgJyQxJylcbiAgICAvLyByZW1vdmUgZGVjaW1hbCBwYXJ0IGlmIGFsbCB6ZXJvcyAob3Igb25seSBkZWNpbWFsIHBvaW50KVxuICAgIC5yZXBsYWNlKC9cXC4wKiQvZywgJycpXG5cbi8vIEhlbHBlciB0byBpZGVudGlmeSBpZiBkZWJ1ZyBtb2RlIGlzIHJ1bm5pbmdcbmV4cG9ydCBjb25zdCBpc0RlYnVnID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gcGFyc2VCb29sKGdldEVudignREVCVUcnKSkgfHwgZ2V0RW52KCdOT0RFX0VOVicpID09PSAnZGV2ZWxvcG1lbnQnXG59XG5cbi8vIEhlbHBlciB0byBpZGVudGlmeSBpZiBkZWJ1ZyBsb2cgbGV2ZWwgaXMgc2V0XG5leHBvcnQgY29uc3QgaXNEZWJ1Z0xvZ0xldmVsID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gZ2V0RW52KCdMT0dfTEVWRUwnKSA9PT0gJ2RlYnVnJ1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBDYWxjdWxhdGVzIGFsbCBwb3NzaWJsZSBwZXJtdXRhdGlvbnMgd2l0aG91dCByZXBldGl0aW9uIG9mIGEgY2VydGFpbiBzaXplLlxuICpcbiAqIEBwYXJhbSBjb2xsZWN0aW9uIEEgY29sbGVjdGlvbiBvZiBkaXN0aW5jdCB2YWx1ZXMgdG8gY2FsY3VsYXRlIHRoZSBwZXJtdXRhdGlvbnMgZnJvbS5cbiAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgdmFsdWVzIHRvIGNvbWJpbmUuXG4gKlxuICogQHJldHVybnMgQXJyYXkgb2YgcGVybXV0YXRpb25zXG4gKi9cbmNvbnN0IHBlcm11dGF0aW9ucyA9IChjb2xsZWN0aW9uOiBhbnksIG46IGFueSkgPT4ge1xuICBjb25zdCBhcnJheSA9IHZhbHVlcyhjb2xsZWN0aW9uKVxuICBpZiAoYXJyYXkubGVuZ3RoIDwgbikgcmV0dXJuIFtdXG5cbiAgY29uc3QgcmVjdXIgPSAoYXJyYXk6IGFueSwgbjogYW55KSA9PiB7XG4gICAgaWYgKC0tbiA8IDApIHJldHVybiBbW11dXG5cbiAgICBjb25zdCBwZXJtdXRhdGlvbnM6IGFueVtdID0gW11cbiAgICBhcnJheS5mb3JFYWNoKCh2YWx1ZTogYW55LCBpbmRleDogYW55LCBhcnJheTogYW55KSA9PiB7XG4gICAgICBhcnJheSA9IGFycmF5LnNsaWNlKClcbiAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSlcbiAgICAgIHJlY3VyKGFycmF5LCBuKS5mb3JFYWNoKChwZXJtdXRhdGlvbikgPT4ge1xuICAgICAgICBwZXJtdXRhdGlvbi51bnNoaWZ0KHZhbHVlKVxuICAgICAgICBwZXJtdXRhdGlvbnMucHVzaChwZXJtdXRhdGlvbilcbiAgICAgIH0pXG4gICAgfSlcbiAgICByZXR1cm4gcGVybXV0YXRpb25zXG4gIH1cbiAgcmV0dXJuIHJlY3VyKGFycmF5LCBuKVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQnVpbGRzIGEgcGVybXV0YXRpb24gc2V0IGZyb20gYSBsaXN0IG9mIG9wdGlvbnNcbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyB0byBjcmVhdGUgYSBwZXJtdXRhdGlvbiBmcm9tXG4gKiBAcGFyYW0gZGVsaW1pdGVyIChPcHRpb25hbCkgSm9pbnMgdGhlIHBlcm11dGF0aW9uIHJlc3VsdHMgdG8gYSBzdHJpbmdcbiAqXG4gKiBAcmV0dXJucyBBcnJheSBvZiBwZXJtdXRhdGlvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IHBlcm11dGF0b3IgPSAob3B0aW9uczogc3RyaW5nW10sIGRlbGltaXRlcj86IHN0cmluZyk6IHN0cmluZ1tdIHwgc3RyaW5nW11bXSA9PiB7XG4gIGNvbnN0IG91dHB1dDogc3RyaW5nW11bXSA9IGZsYXRNYXAob3B0aW9ucywgKF86IGFueSwgaTogYW55LCBhOiBhbnkpID0+IHBlcm11dGF0aW9ucyhhLCBpICsgMSkpXG4gIGNvbnN0IGpvaW4gPSAoY29tYm9zOiBzdHJpbmdbXVtdKSA9PiBjb21ib3MubWFwKChwKSA9PiBwLmpvaW4oZGVsaW1pdGVyKSlcbiAgcmV0dXJuIHR5cGVvZiBkZWxpbWl0ZXIgPT09ICdzdHJpbmcnID8gam9pbihvdXRwdXQpIDogb3V0cHV0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDaGVjayBleGlzdGluZyAobm9uLXVuZGVmaW5lZCkgdmFsdWUgZm9yIGl0cyB0eXBlLlxuICpcbiAqIEB1cmxcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL09wZXJhdG9ycy90eXBlb2YjcmVhbC13b3JsZF91c2FnZVxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdHlwZSBjaGVja1xuICogQHBhcmFtIGZ1bGxDbGFzcyAoT3B0aW9uYWwpIFdoZXRoZXIgdG8gdXNlIHBvbHlmaWxsIGZvciBjaGVja2luZyBudWxsXG4gKlxuICogQHJldHVybnMgU3RyaW5nIGRlc2NyaWJpbmcgdHlwZSBvZiBvYmpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBUeXBlKHZhbHVlOiB1bmtub3duLCBmdWxsQ2xhc3M/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgLy8gZ2V0IHRvUHJvdG90eXBlU3RyaW5nKCkgb2Ygb2JqIChoYW5kbGVzIGFsbCB0eXBlcylcbiAgLy8gRWFybHkgSlMgZW52aXJvbm1lbnRzIHJldHVybiAnW29iamVjdCBPYmplY3RdJyBmb3IgbnVsbCwgc28gaXQncyBiZXN0IHRvIGRpcmVjdGx5IGNoZWNrIGZvciBpdC5cbiAgaWYgKGZ1bGxDbGFzcykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/ICdbb2JqZWN0IE51bGxdJyA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSlcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiAodmFsdWUgKyAnJykudG9Mb3dlckNhc2UoKVxuICB9IC8vIGltcGxpY2l0IHRvU3RyaW5nKCkgY29udmVyc2lvblxuXG4gIGNvbnN0IGRlZXBUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKVxuICBpZiAoZGVlcFR5cGUgPT09ICdnZW5lcmF0b3JmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gJ2Z1bmN0aW9uJ1xuICB9XG5cbiAgLy8gUHJldmVudCBvdmVyc3BlY2lmaWNpdHkgKGZvciBleGFtcGxlLCBbb2JqZWN0IEhUTUxEaXZFbGVtZW50XSwgZXRjKS5cbiAgLy8gQWNjb3VudCBmb3IgZnVuY3Rpb25pc2ggUmVnZXhwIChBbmRyb2lkIDw9Mi4zKSwgZnVuY3Rpb25pc2ggPG9iamVjdD4gZWxlbWVudCAoQ2hyb21lIDw9NTcsIEZpcmVmb3ggPD01MiksIGV0Yy5cbiAgLy8gU3RyaW5nLnByb3RvdHlwZS5tYXRjaCBpcyB1bml2ZXJzYWxseSBzdXBwb3J0ZWQuXG5cbiAgcmV0dXJuIGRlZXBUeXBlLm1hdGNoKC9eKGFycmF5fGJpZ2ludHxkYXRlfGVycm9yfGZ1bmN0aW9ufGdlbmVyYXRvcnxyZWdleHB8c3ltYm9sKSQvKVxuICAgID8gZGVlcFR5cGVcbiAgICA6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nXG4gICAgPyAnb2JqZWN0J1xuICAgIDogdHlwZW9mIHZhbHVlXG59XG5cbmV4cG9ydCBjb25zdCBMRUdBQ1lfRU5WX0FEQVBURVJfVVJMID0gJ0RBVEFfUFJPVklERVJfVVJMJ1xuZXhwb3J0IGNvbnN0IEVOVl9BREFQVEVSX1VSTCA9ICdBREFQVEVSX1VSTCdcblxuZXhwb3J0IGNvbnN0IGdldFVSTCA9IChwcmVmaXg6IHN0cmluZywgcmVxdWlyZWQgPSBmYWxzZSk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PlxuICByZXF1aXJlZFxuICAgID8gZ2V0UmVxdWlyZWRVUkwocHJlZml4KVxuICAgIDogZ2V0RW52KEVOVl9BREFQVEVSX1VSTCwgcHJlZml4KSB8fCBnZXRFbnYoTEVHQUNZX0VOVl9BREFQVEVSX1VSTCwgcHJlZml4KVxuXG5leHBvcnQgY29uc3QgZ2V0UmVxdWlyZWRVUkwgPSAocHJlZml4OiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgZ2V0UmVxdWlyZWRFbnYoRU5WX0FEQVBURVJfVVJMLCBwcmVmaXgpIHx8IGdldFJlcXVpcmVkRW52KExFR0FDWV9FTlZfQURBUFRFUl9VUkwsIHByZWZpeClcblxuLyoqXG4gKiBHZXQgdmFyaWFibGUgZnJvbSBlbnZpcm9ubWVudCB0aGVuIGNoZWNrIGZvciBhIGZhbGxiYWNrIGlmIGl0IGlzIG5vdCBzZXQgdGhlbiB0aHJvdyBpZiBuZWl0aGVyIGFyZSBzZXRcbiAqIEBwYXJhbSBwcmltYXJ5IFRoZSBuYW1lIG9mIGVudmlyb25tZW50IHZhcmlhYmxlIHRvIGxvb2sgZm9yIGZpcnN0XG4gKiBAcGFyYW0gcHJlZml4IEEgc3RyaW5nIHRvIGFkZCBiZWZvcmUgdGhlIGVudmlyb25tZW50IHZhcmlhYmxlIG5hbWVcbiAqIEBwYXJhbSBmYWxsYmFja3MgVGhlIHN1YnNlcXVlbnQgbmFtZXMgb2YgZW52aXJvbm1lbnQgdmFyaWFibGVzIHRvIGxvb2sgZm9yIGlmIHRoZSBwcmltYXJ5IGlzIG5vdCBmb3VuZFxuICogQHRocm93cyB7UmVxdWlyZWRFbnZFcnJvcn0gV2lsbCB0aHJvdyBhbiBlcnJvciBpZiBlbnZpcm9ubWVudCB2YXJpYWJsZSBpcyBub3QgZGVmaW5lZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZXF1aXJlZEVudldpdGhGYWxsYmFjayA9IChcbiAgcHJpbWFyeTogc3RyaW5nLFxuICBmYWxsYmFja3M6IHN0cmluZ1tdLFxuICBwcmVmaXggPSAnJyxcbik6IHN0cmluZyA9PiB7XG4gIC8vIEF0dGVtcHQgcHJpbWFyeVxuICBjb25zdCB2YWwgPSBnZXRFbnYocHJpbWFyeSwgcHJlZml4KVxuICBpZiAodmFsKSByZXR1cm4gdmFsXG5cbiAgLy8gQXR0ZW1wdCBmYWxsYmFja3NcbiAgZm9yIChjb25zdCBmYWxsYmFjayBvZiBmYWxsYmFja3MpIHtcbiAgICBjb25zdCB2YWwgPSBnZXRFbnYoZmFsbGJhY2ssIHByZWZpeClcbiAgICBpZiAodmFsKSByZXR1cm4gdmFsXG4gIH1cblxuICB0aHJvdyBuZXcgUmVxdWlyZWRFbnZFcnJvcihnZXRFbnZOYW1lKHByaW1hcnksIHByZWZpeCkpXG59XG5cbi8vICBVUkwgRW5jb2RpbmdcblxuY29uc3QgY2hhcnNUb0VuY29kZSA9IHtcbiAgJzonOiAnJTNBJyxcbiAgJy8nOiAnJTJGJyxcbiAgJz8nOiAnJTNGJyxcbiAgJyMnOiAnJTIzJyxcbiAgJ1snOiAnJTVCJyxcbiAgJ10nOiAnJTVEJyxcbiAgJ0AnOiAnJTQwJyxcbiAgJyEnOiAnJTIxJyxcbiAgJDogJyUyNCcsXG4gICcmJzogJyUyNicsXG4gIFwiJ1wiOiAnJTI3JyxcbiAgJygnOiAnJTI4JyxcbiAgJyknOiAnJTI5JyxcbiAgJyonOiAnJTJBJyxcbiAgJysnOiAnJTJCJyxcbiAgJywnOiAnJTJDJyxcbiAgJzsnOiAnJTNCJyxcbiAgJz0nOiAnJTNEJyxcbiAgJyUnOiAnJTI1JyxcbiAgJyAnOiAnJTIwJyxcbiAgJ1wiJzogJyUyMicsXG4gICc8JzogJyUzQycsXG4gICc+JzogJyUzRScsXG4gICd7JzogJyU3QicsXG4gICd9JzogJyU3RCcsXG4gICd8JzogJyU3QycsXG4gICdeJzogJyU1RScsXG4gICdgJzogJyU2MCcsXG4gICdcXFxcJzogJyU1QycsXG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGNvbnRhaW5zIGNoYXJhY3RlcnMgaW4gdGhlIGdpdmVuIHdoaXRlbGlzdC5cbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBjaGVjay5cbiAqIEBwYXJhbSB3aGl0ZWxpc3QgVGhlIHN0cmluZyBhcnJheSBvZiB3aGl0ZWxpc3QgZW50cmllcy4gUmV0dXJucyB0cnVlIGlmIGFueSBvZiB0aGVzZSBhcmUgZm91bmQgaW4gJ3N0cicsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IHN0cmluZ0hhc1doaXRlbGlzdCA9IChzdHI6IHN0cmluZywgd2hpdGVsaXN0OiBzdHJpbmdbXSk6IGJvb2xlYW4gPT5cbiAgd2hpdGVsaXN0LnNvbWUoKGVsKSA9PiBzdHIuaW5jbHVkZXMoZWwpKVxuXG4vKipcbiAqIE1hbnVhbGx5IGl0ZXJhdGUgdGhyb3VnaCBhIGdpdmVuIHN0cmluZyBhbmQgcmVwbGFjZSB1bnNhZmUvcmVzZXJ2ZWQgY2hhcmFjdGVycyB3aXRoIGVuY29kZWQgdmFsdWVzICh1bmxlc3MgYSBjaGFyYWN0ZXIgaXMgd2hpdGVsaXN0ZWQpXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICogQHBhcmFtIHdoaXRlbGlzdCBUaGUgc3RyaW5nIGFycmF5IG9mIHdoaXRlbGlzdCBlbnRyaWVzLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgcGVyY2VudEVuY29kZVN0cmluZyA9IChzdHI6IHN0cmluZywgd2hpdGVsaXN0OiBzdHJpbmdbXSk6IHN0cmluZyA9PlxuICBzdHJcbiAgICAuc3BsaXQoJycpXG4gICAgLm1hcCgoY2hhcikgPT4ge1xuICAgICAgY29uc3QgZW5jb2RlZFZhbHVlID0gY2hhcnNUb0VuY29kZVtjaGFyIGFzIGtleW9mIHR5cGVvZiBjaGFyc1RvRW5jb2RlXVxuICAgICAgcmV0dXJuIGVuY29kZWRWYWx1ZSAmJiAhd2hpdGVsaXN0LmluY2x1ZGVzKGNoYXIpID8gZW5jb2RlZFZhbHVlIDogY2hhclxuICAgIH0pXG4gICAgLmpvaW4oJycpXG5cbi8qKlxuICogQnVpbGQgYSBVUkwgcGF0aCB1c2luZyB0aGUgZ2l2ZW4gcGF0aFRlbXBsYXRlIGFuZCBwYXJhbXMuIElmIGEgcGFyYW0gaXMgZm91bmQgaW4gcGF0aFRlbXBsYXRlLCBpdCB3aWxsIGJlIGluc2VydGVkIHRoZXJlOyBvdGhlcndpc2UsIGl0IHdpbGwgYmUgaWdub3JlZC5cbiAqIGVnLikgcGF0aFRlbXBsYXRlID0gXCIvZnJvbS86ZnJvbS90by86dG9cIiBhbmQgcGFyYW1zID0geyBmcm9tOiBcIkVUSFwiLCB0bzogXCJCVENcIiwgbm90ZTogXCJoZWxsb1wiIH0gd2lsbCBiZWNvbWUgXCIvZnJvbS9FVEgvdG8vQlRDXCJcbiAqIEBwYXJhbSBwYXRoVGVtcGxhdGUgVGhlIHBhdGggdGVtcGxhdGUgZm9yIHRoZSBVUkwgcGF0aC4gRWFjaCBwYXJhbSB0byBpbmNsdWRlIGluIHRoZSBwYXRoIHNob3VsZCBoYXZlIGEgcHJlZml4IG9mICc6Jy5cbiAqIEBwYXJhbSBwYXJhbXMgVGhlIG9iamVjdCBjb250YWluaW5nIGtleXMgJiB2YWx1ZXMgdG8gYmUgYWRkZWQgdG8gdGhlIFVSTCBwYXRoLlxuICogQHBhcmFtIHdoaXRlbGlzdCBUaGUgbGlzdCBvZiBjaGFyYWN0ZXJzIHRvIHdoaXRlbGlzdCBmb3IgdGhlIFVSTCBwYXRoIChpZiBhIHBhcmFtIGNvbnRhaW5zIG9uZSBvZiB5b3VyIHdoaXRlbGlzdGVkIGNoYXJhY3RlcnMsIGl0IHdpbGwgbm90IGJlIGVuY29kZWQpLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGJ1aWxkVXJsUGF0aCA9IChwYXRoVGVtcGxhdGUgPSAnJywgcGFyYW1zID0ge30sIHdoaXRlbGlzdCA9ICcnKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYWxsb3dlZENoYXJzID0gd2hpdGVsaXN0LnNwbGl0KCcnKVxuXG4gIGZvciAoY29uc3QgcGFyYW0gaW4gcGFyYW1zKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJhbXNbcGFyYW0gYXMga2V5b2YgdHlwZW9mIHBhcmFtc11cbiAgICBpZiAoIXZhbHVlKSBjb250aW51ZVxuXG4gICAgLy8gSWYgc3RyaW5nIGNvbnRhaW5zIGEgd2hpdGVsaXN0ZWQgY2hhcmFjdGVyOiBtYW51YWxseSByZXBsYWNlIGFueSBub24td2hpdGVsaXN0ZWQgY2hhcmFjdGVycyB3aXRoIHBlcmNlbnQgZW5jb2RlZCB2YWx1ZXMuIE90aGVyd2lzZSwgZW5jb2RlIHRoZSBzdHJpbmcgYXMgdXN1YWwuXG4gICAgY29uc3QgZW5jb2RlZFZhbHVlID0gc3RyaW5nSGFzV2hpdGVsaXN0KHZhbHVlLCBhbGxvd2VkQ2hhcnMpXG4gICAgICA/IHBlcmNlbnRFbmNvZGVTdHJpbmcodmFsdWUsIGFsbG93ZWRDaGFycylcbiAgICAgIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKVxuXG4gICAgcGF0aFRlbXBsYXRlID0gcGF0aFRlbXBsYXRlLnJlcGxhY2UoYDoke3BhcmFtfWAsIGVuY29kZWRWYWx1ZSlcbiAgfVxuXG4gIHJldHVybiBwYXRoVGVtcGxhdGVcbn1cblxuLyoqXG4gKiBCdWlsZCBhIGZ1bGwgVVJMIHVzaW5nIHRoZSBnaXZlbiBiYXNlVXJsLCBwYXRoVGVtcGxhdGUgYW5kIHBhcmFtcy4gVXNlcyBidWlsZFVybFBhdGggdG8gYWRkIHBhdGggJiBwYXJhbXMuXG4gKiBAcGFyYW0gYmFzZVVybCBUaGUgYmFzZSBVUkwgdG8gYWRkIHRoZSBwYXRoVGVtcGxhdGUgJiBwYXJhbXMgdG8uXG4gKiBAcGFyYW0gcGF0aFRlbXBsYXRlIFRoZSBwYXRoIHRlbXBsYXRlIGZvciB0aGUgVVJMIHBhdGguIExlYXZlIGVtcHR5IGlmIG9ubHkgc2VhcmNoUGFyYW1zIGFyZSByZXF1aXJlZC5cbiAqIEBwYXJhbSBwYXJhbXMgVGhlIG9iamVjdCBjb250YWluaW5nIGtleXMgJiB2YWx1ZXMgdG8gYmUgYWRkZWQgdG8gdGhlIFVSTCBwYXRoLlxuICogQHBhcmFtIHdoaXRlbGlzdCBUaGUgbGlzdCBvZiBjaGFyYWN0ZXJzIHRvIHdoaXRlbGlzdCBmb3IgdGhlIFVSTCBwYXRoLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGJ1aWxkVXJsID0gKGJhc2VVcmw6IHN0cmluZywgcGF0aFRlbXBsYXRlID0gJycsIHBhcmFtcyA9IHt9LCB3aGl0ZWxpc3QgPSAnJyk6IHN0cmluZyA9PlxuICBuZXcgVVJMKGJ1aWxkVXJsUGF0aChwYXRoVGVtcGxhdGUsIHBhcmFtcywgd2hpdGVsaXN0KSwgYmFzZVVybCkudG9TdHJpbmcoKVxuXG4vLyAgVVJMIEVuY29kaW5nXG5cbmxldCB1bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyUmVnaXN0ZXJlZCA9IGZhbHNlXG5cbi8qKlxuICogQWRhcHRlcnMgdXNlIHRvIHJ1biB3aXRoIE5vZGUgMTQsIHdoaWNoIGJ5IGRlZmF1bHQgZGlkbid0IGNyYXNoIHdoZW4gYSByZWplY3RlZCBwcm9taXNlZCBidWJibGVkIHVwIHRvIHRoZSB0b3AuXG4gKiBUaGlzIGZ1bmN0aW9uIHJlZ2lzdGVycyBhIGdsb2JhbCBoYW5kbGVyIHRvIGNhdGNoIHRob3NlIHJlamVjdGlvbnMgYW5kIGp1c3QgbG9nIHRoZW0gdG8gY29uc29sZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyVW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKHVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXJSZWdpc3RlcmVkKSB7XG4gICAgaWYgKGdldEVudignTk9ERV9FTlYnKSAhPT0gJ3Rlc3QnKVxuICAgICAgbG9nZ2VyLndhcm4oJ1VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIgYXR0ZW1wdGVkIHRvIGJlIHJlZ2lzdGVyZWQgbW9yZSB0aGFuIG9uY2UnKVxuICAgIHJldHVyblxuICB9XG5cbiAgdW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlclJlZ2lzdGVyZWQgPSB0cnVlXG4gIHByb2Nlc3Mub24oJ3VuaGFuZGxlZFJlamVjdGlvbicsIChyZWFzb24pID0+IHtcbiAgICBsb2dnZXIud2FybignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uIHJlYWNoZWQgY3VzdG9tIGhhbmRsZXInKVxuICAgIGxvZ2dlci53YXJuKEpTT04uc3RyaW5naWZ5KHJlYXNvbikpXG4gIH0pXG59XG5cbi8qKlxuICogU2xlZXBzIGZvciB0aGUgcHJvdmlkZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kc1xuICogQHBhcmFtIG1zIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHNsZWVwIGZvclxuICogQHJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSB0aGUgc3BlY2lmaWVkIHRpbWUgcGFzc2VzXG4gKi9cbmV4cG9ydCBjb25zdCBzbGVlcCA9IChtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpXG59XG5cbi8qKlxuICogUmVtb3ZlIHN0YWxlIHJlcXVlc3QgZW50cmllcyBmcm9tIGFuIGFycmF5LlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgdGhlIGFycmF5IGlzIHNvcnRlZCBieSB0aW1lc3RhbXAsXG4gKiB3aGVyZSB0aGUgb2xkZXN0IGVudHJ5IGxpdmVzIGluIHRoZSAwdGggaW5kZXgsIGFuZCB0aGUgbmV3ZXN0IGVudHJ5XG4gKiBsaXZlcyBpbiB0aGUgYXJyLmxlbmd0aC0xdGggaW5kZXhcbiAqIEBwYXJhbSBpdGVtcyBUaGUgaXRlbXMgdG8gZmlsdGVyXG4gKiBAcGFyYW0gZmlsdGVyIFRoZSB3aW5kb3dpbmcgZnVuY3Rpb24gdG8gYXBwbHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnRlZEZpbHRlcjxUPihpdGVtczogVFtdLCB3aW5kb3dpbmdGdW5jdGlvbjogKGl0ZW06IFQpID0+IGJvb2xlYW4pOiBUW10ge1xuICAvLyBpZiB3ZSB3YW50IGEgaGlnaGVyIHBlcmZvcm1hbmNlIGltcGxlbWVudGF0aW9uXG4gIC8vIHdlIGNhbiBsYXRlciByZXNvcnQgdG8gYSBjdXN0b20gYXJyYXkgY2xhc3MgdGhhdCBpcyBjaXJjdWxhclxuICAvLyBzbyB3ZSBjYW4gYW1vcnRpemUgZXhwZW5zaXZlIG9wZXJhdGlvbnMgbGlrZSByZXNpemluZywgYW5kIG1ha2VcbiAgLy8gb3BlcmF0aW9ucyBsaWtlIG1vdmluZyB0aGUgaGVhZCBpbmRleCBtdWNoIHF1aWNrZXJcbiAgY29uc3QgZmlyc3ROb25TdGFsZUl0ZW1JbmRleCA9IGl0ZW1zLmZpbmRJbmRleCh3aW5kb3dpbmdGdW5jdGlvbilcbiAgaWYgKGZpcnN0Tm9uU3RhbGVJdGVtSW5kZXggPT09IC0xKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICByZXR1cm4gaXRlbXMuc2xpY2UoZmlyc3ROb25TdGFsZUl0ZW1JbmRleClcbn1cbiJdfQ==