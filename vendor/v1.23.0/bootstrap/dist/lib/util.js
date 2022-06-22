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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBb0M7QUFDcEMsbUNBQXdDO0FBQ3hDLCtCQUFtQztBQUVuQyx1Q0FBa0M7QUFFbEM7OztHQUdHO0FBQ1UsUUFBQSxlQUFlLEdBQWdCO0lBQzFDLFFBQVEsRUFBRSxHQUFHO0lBQ2IsT0FBTyxFQUFFLE1BQU07SUFDZixZQUFZLEVBQUUsTUFBTTtJQUNwQixLQUFLLEVBQUUsR0FBRztJQUNWLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLGFBQWEsRUFBRSxNQUFNO0lBQ3JCLFVBQVUsRUFBRSxPQUFPO0lBQ25CLGFBQWEsRUFBRSxPQUFPO0lBQ3RCLGFBQWEsRUFBRSxPQUFPO0lBQ3RCLGVBQWUsRUFBRSxNQUFNO0lBQ3ZCLHVCQUF1QixFQUFFLE9BQU87SUFDaEMsOEJBQThCLEVBQUUsT0FBTztJQUN2QyxnQkFBZ0IsRUFBRSxXQUFXO0lBQzdCLDRCQUE0QixFQUFFLEtBQUs7SUFDbkMsa0NBQWtDLEVBQUUsTUFBTTtJQUMxQyxnQkFBZ0IsRUFBRSxNQUFNO0lBQ3hCLG1CQUFtQixFQUFFLEtBQUs7SUFDMUIsa0JBQWtCLEVBQUUsTUFBTTtJQUMxQixjQUFjLEVBQUUsTUFBTTtJQUN0QiwwQkFBMEIsRUFBRSxHQUFHO0lBQy9CLHVCQUF1QixFQUFFLFNBQVM7SUFDbEMsMkJBQTJCLEVBQUUsS0FBSztJQUNsQywrQkFBK0IsRUFBRSxNQUFNO0lBQ3ZDLHVDQUF1QyxFQUFFLEdBQUc7SUFDNUMsOEJBQThCLEVBQUUsR0FBRztJQUNuQyw4QkFBOEIsRUFBRSxHQUFHO0lBQ25DLFVBQVUsRUFBRSxPQUFPO0lBQ25CLGlCQUFpQixFQUFFLEdBQUc7SUFDdEIsbUJBQW1CLEVBQUUsR0FBRztJQUN4QixpQkFBaUIsRUFBRSxPQUFPO0lBQzFCLHlCQUF5QixFQUFFLEdBQUc7SUFDOUIseUJBQXlCLEVBQUUsTUFB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QUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDMUQsQ0FBQyxDQUFBO0FBRlksUUFBQSxLQUFLLFNBRWpCO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLFlBQVksQ0FBSSxLQUFVLEVBQUUsaUJBQXVDO0lBQ2pGLGlEQUFpRDtJQUNqRCwrREFBK0Q7SUFDL0Qsa0VBQWtFO0lBQ2xFLHFEQUFxRDtJQUNyRCxNQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNqRSxJQUFJLHNCQUFzQixLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2pDLE9BQU8sRUFBRSxDQUFBO0tBQ1Y7SUFFRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtBQUM1QyxDQUFDO0FBWEQsb0NBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGFwdGVyQ29udGV4dCwgQWRhcHRlckltcGxlbWVudGF0aW9uLCBFbnZEZWZhdWx0cyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBEZWNpbWFsIH0gZnJvbSAnZGVjaW1hbC5qcydcbmltcG9ydCB7IGZsYXRNYXAsIHZhbHVlcyB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXG5pbXBvcnQgeyBDYWNoZUVudHJ5IH0gZnJvbSAnLi9taWRkbGV3YXJlL2NhY2hlL3R5cGVzJ1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi9tb2R1bGVzJ1xuXG4vKipcbiAqIFVzZWQgaW4gdGhlIGBnZXRFbnZgIHV0aWwgZnVuY3Rpb24gYXMgYSBiYWNrdXAgd2hlbiBhbiBlbnYgdmFyXG4gKiBpcyBgZW1wdHlgIG9yIGB1bmRlZmluZWRgLCBhbmQgbm8gYGVudkRlZmF1bHRPdmVycmlkZWAgaXMgZ2l2ZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBiYXNlRW52RGVmYXVsdHM6IEVudkRlZmF1bHRzID0ge1xuICBCQVNFX1VSTDogJy8nLFxuICBFQV9QT1JUOiAnODA4MCcsXG4gIE1FVFJJQ1NfUE9SVDogJzkwODAnLFxuICBSRVRSWTogJzEnLFxuICBBUElfVElNRU9VVDogJzMwMDAwJyxcbiAgQ0FDSEVfRU5BQkxFRDogJ3RydWUnLFxuICBDQUNIRV9UWVBFOiAnbG9jYWwnLFxuICBDQUNIRV9NQVhfQUdFOiAnOTAwMDAnLCAvLyAxLjUgbWludXRlc1xuICBDQUNIRV9NSU5fQUdFOiAnMzAwMDAnLFxuICBDQUNIRV9NQVhfSVRFTVM6ICcxMDAwJyxcbiAgQ0FDSEVfVVBEQVRFX0FHRV9PTl9HRVQ6ICdmYWxzZScsXG4gIENBQ0hFX1JFRElTX0NPTk5FQ1RJT05fVElNRU9VVDogJzE1MDAwJywgLy8gVGltZW91dCBwZXIgbG9uZyBsaXZlZCBjb25uZWN0aW9uIChtcylcbiAgQ0FDSEVfUkVESVNfSE9TVDogJzEyNy4wLjAuMScsIC8vIElQIGFkZHJlc3Mgb2YgdGhlIFJlZGlzIHNlcnZlclxuICBDQUNIRV9SRURJU19NQVhfUVVFVUVEX0lURU1TOiAnNTAwJywgLy8gTWF4aW11bSBsZW5ndGggb2YgdGhlIGNsaWVudCdzIGludGVybmFsIGNvbW1hbmQgcXVldWVcbiAgQ0FDSEVfUkVESVNfTUFYX1JFQ09OTkVDVF9DT09MRE9XTjogJzMwMDAnLCAvLyBNYXggY29vbGRvd24gdGltZSBiZWZvcmUgYXR0ZW1wdGluZyB0byByZWNvbm5lY3QgKG1zKVxuICBDQUNIRV9SRURJU19QT1JUOiAnNjM3OScsIC8vIFBvcnQgb2YgdGhlIFJlZGlzIHNlcnZlclxuICBDQUNIRV9SRURJU19USU1FT1VUOiAnNTAwJywgLy8gVGltZW91dCBwZXIgcmVxdWVzdCAobXMpXG4gIFJBVEVfTElNSVRfRU5BQkxFRDogJ3RydWUnLFxuICBXQVJNVVBfRU5BQkxFRDogJ3RydWUnLFxuICBXQVJNVVBfVU5IRUFMVEhZX1RIUkVTSE9MRDogJzMnLFxuICBXQVJNVVBfU1VCU0NSSVBUSU9OX1RUTDogJzM2MDAwMDAnLCAvLyBkZWZhdWx0IDFoXG4gIFJFUVVFU1RfQ09BTEVTQ0lOR19JTlRFUlZBTDogJzEwMCcsXG4gIFJFUVVFU1RfQ09BTEVTQ0lOR19JTlRFUlZBTF9NQVg6ICcxMDAwJyxcbiAgUkVRVUVTVF9DT0FMRVNDSU5HX0lOVEVSVkFMX0NPRUZGSUNJRU5UOiAnMicsXG4gIFJFUVVFU1RfQ09BTEVTQ0lOR19FTlRST1BZX01BWDogJzAnLFxuICBSRVFVRVNUX0NPQUxFU0NJTkdfTUFYX1JFVFJJRVM6ICc1JyxcbiAgV1NfRU5BQkxFRDogJ2ZhbHNlJyxcbiAgV1NfQ09OTkVDVElPTl9LRVk6ICcxJyxcbiAgV1NfQ09OTkVDVElPTl9MSU1JVDogJzEnLFxuICBXU19DT05ORUNUSU9OX1RUTDogJzcwMDAwJyxcbiAgV1NfQ09OTkVDVElPTl9SRVRSWV9MSU1JVDogJzMnLFxuICBXU19DT05ORUNUSU9OX1JFVFJZX0RFTEFZOiAnMTAwMCcsXG4gIFdTX1NVQlNDUklQVElPTl9MSU1JVDogJzEwJyxcbiAgV1NfU1VCU0NSSVBUSU9OX1RUTDogJzEyMDAwMCcsXG4gIFdTX1NVQlNDUklQVElPTl9VTlJFU1BPTlNJVkVfVFRMOiAnMTIwMDAwJyxcbiAgREVGQVVMVF9XU19IRUFSVEJFQVRfSU5URVJWQUw6ICczMDAwMCcsXG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IChvOiB1bmtub3duKTogYm9vbGVhbiA9PlxuICBvICE9PSBudWxsICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KG8pID09PSBmYWxzZVxuXG5leHBvcnQgY29uc3QgaXNBcnJheSA9IChvOiB1bmtub3duKTogYm9vbGVhbiA9PlxuICBvICE9PSBudWxsICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KG8pXG5cbmV4cG9ydCBjb25zdCBwYXJzZUJvb2wgPSAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2VcbiAgY29uc3QgX3ZhbCA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuICByZXR1cm4gKF92YWwgPT09ICd0cnVlJyB8fCBfdmFsID09PSAnZmFsc2UnKSAmJiBfdmFsID09PSAndHJ1ZSdcbn1cblxuLy8gY29udmVydCBzdHJpbmcgdmFsdWVzIGludG8gTnVtYmVycyB3aGVyZSBwb3NzaWJsZSAoZm9yIGluY29taW5nIHF1ZXJ5IHN0cmluZ3MpXG5leHBvcnQgY29uc3QgdG9PYmplY3RXaXRoTnVtYmVycyA9IChvYmo6IGFueSkgPT4ge1xuICBjb25zdCB0b051bWJlciA9ICh2OiBhbnkpID0+IChpc05hTih2KSA/IHYgOiBOdW1iZXIodikpXG4gIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LmVudHJpZXMob2JqKS5tYXAoKFtrLCB2XSkgPT4gW2ssIHRvTnVtYmVyKHYpXSkpXG59XG5cbi8vIHBpY2sgYSByYW5kb20gc3RyaW5nIGZyb20gZW52IHZhciBhZnRlciBzcGxpdHRpbmcgd2l0aCB0aGUgZGVsaW1pdGVyIChcImEmYiZjXCIgXCImXCIgLT4gY2hvaWNlKFtcImFcIixcImJcIixcImNcIl0pKVxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbUVudiA9IChuYW1lOiBzdHJpbmcsIGRlbGltaXRlciA9ICcsJywgcHJlZml4ID0gJycpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCB2YWwgPSBnZXRFbnYobmFtZSwgcHJlZml4KVxuICBpZiAoIXZhbCkgcmV0dXJuIHZhbFxuICBjb25zdCBpdGVtcyA9IHZhbC5zcGxpdChkZWxpbWl0ZXIpXG4gIHJldHVybiBpdGVtc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtcy5sZW5ndGgpXVxufVxuXG4vLyBwaWNrIGEgcmFuZG9tIHN0cmluZyBmcm9tIGVudiB2YXIgYWZ0ZXIgc3BsaXR0aW5nIHdpdGggdGhlIGRlbGltaXRlciAoXCJhJmImY1wiIFwiJlwiIC0+IGNob2ljZShbXCJhXCIsXCJiXCIsXCJjXCJdKSlcbmV4cG9ydCBjb25zdCBnZXRSYW5kb21SZXF1aXJlZEVudiA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBkZWxpbWl0ZXIgPSAnLCcsXG4gIHByZWZpeCA9ICcnLFxuKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgdmFsID0gZ2V0UmVxdWlyZWRFbnYobmFtZSwgcHJlZml4KVxuICBjb25zdCBpdGVtcyA9IHZhbC5zcGxpdChkZWxpbWl0ZXIpXG4gIHJldHVybiBpdGVtc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtcy5sZW5ndGgpXVxufVxuXG4vLyBXZSBnZW5lcmF0ZSBhbiBVVUlEIHBlciBpbnN0YW5jZVxuZXhwb3J0IGNvbnN0IHV1aWQgPSAoKTogc3RyaW5nID0+IHtcbiAgaWYgKCFwcm9jZXNzLmVudi5VVUlEKSBwcm9jZXNzLmVudi5VVUlEID0gdXVpZHY0KClcbiAgcmV0dXJuIHByb2Nlc3MuZW52LlVVSURcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSB2YWx1ZSB1c2VkIGZvciBleHBvbmVudGlhbCBiYWNrb2ZmIGluIG1pbGxpc2Vjb25kcy5cbiAqIEBleGFtcGxlXG4gKiBleHBvbmVudGlhbEJhY2tPZmZNcygxLDEwMCwxMDAwLDIpID09PSAxMDBcbiAqIGV4cG9uZW50aWFsQmFja09mZk1zKDIsMTAwLDEwMDAsMikgPT09IDIwMFxuICogZXhwb25lbnRpYWxCYWNrT2ZmTXMoMywxMDAsMTAwMCwyKSA9PT0gNDAwXG4gKlxuICogQHBhcmFtIHJldHJ5Q291bnQgVGhlIGFtb3VudCBvZiByZXRyaWVzIHRoYXQgaGF2ZSBwYXNzZWRcbiAqIEBwYXJhbSBpbnRlcnZhbCBUaGUgaW50ZXJ2YWwgaW4gbXNcbiAqIEBwYXJhbSBtYXggVGhlIG1heGltdW0gYmFjay1vZmYgaW4gbXNcbiAqIEBwYXJhbSBjb2VmZmljaWVudCBUaGUgYmFzZSBtdWx0aXBsaWVyXG4gKi9cbmV4cG9ydCBjb25zdCBleHBvbmVudGlhbEJhY2tPZmZNcyA9IChyZXRyeUNvdW50ID0gMSwgaW50ZXJ2YWwgPSAxMDAsIG1heCA9IDEwMDAsIGNvZWZmaWNpZW50ID0gMikgPT5cbiAgTWF0aC5taW4obWF4LCBpbnRlcnZhbCAqIGNvZWZmaWNpZW50ICoqIChyZXRyeUNvdW50IC0gMSkpXG5cbmV4cG9ydCBjb25zdCBnZXRXaXRoQ29hbGVzY2luZyA9IGFzeW5jICh7XG4gIGdldCxcbiAgaXNJbkZsaWdodCxcbiAgcmV0cmllcyA9IDUsXG4gIGludGVydmFsID0gKCkgPT4gMTAwLFxufToge1xuICBnZXQ6IChyZXRyeUNvdW50OiBudW1iZXIpID0+IFByb21pc2U8Q2FjaGVFbnRyeSB8IHVuZGVmaW5lZD5cbiAgaXNJbkZsaWdodDogKHJldHJ5Q291bnQ6IG51bWJlcikgPT4gUHJvbWlzZTxib29sZWFuPlxuICByZXRyaWVzOiBudW1iZXJcbiAgaW50ZXJ2YWw6IChyZXRyeUNvdW50OiBudW1iZXIpID0+IG51bWJlclxufSkgPT4ge1xuICBjb25zdCBfc2VsZiA9IGFzeW5jIChfcmV0cmllczogbnVtYmVyKTogUHJvbWlzZTx1bmRlZmluZWQgfCBDYWNoZUVudHJ5PiA9PiB7XG4gICAgaWYgKF9yZXRyaWVzID09PSAwKSByZXR1cm5cbiAgICBjb25zdCByZXRyeUNvdW50ID0gcmV0cmllcyAtIF9yZXRyaWVzICsgMVxuICAgIGNvbnN0IGVudHJ5ID0gYXdhaXQgZ2V0KHJldHJ5Q291bnQpXG4gICAgaWYgKGVudHJ5KSByZXR1cm4gZW50cnlcbiAgICBjb25zdCBpbkZsaWdodCA9IGF3YWl0IGlzSW5GbGlnaHQocmV0cnlDb3VudClcbiAgICBpZiAoIWluRmxpZ2h0KSByZXR1cm5cbiAgICBhd2FpdCBzbGVlcChpbnRlcnZhbChyZXRyeUNvdW50KSlcbiAgICByZXR1cm4gYXdhaXQgX3NlbGYoX3JldHJpZXMgLSAxKVxuICB9XG4gIHJldHVybiBhd2FpdCBfc2VsZihyZXRyaWVzKVxufVxuXG5jb25zdCBnZXRFbnZOYW1lID0gKG5hbWU6IHN0cmluZywgcHJlZml4ID0gJycpID0+IHtcbiAgY29uc3QgZW52TmFtZSA9IHByZWZpeCA/IGAke3ByZWZpeH1fJHtuYW1lfWAgOiBuYW1lXG4gIGlmICghaXNFbnZOYW1lVmFsaWQoZW52TmFtZSkpXG4gICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZW52aXJvbm1lbnQgdmFyIG5hbWU6ICR7ZW52TmFtZX0uIE9ubHkgJy9eW19hLXowLTldKyQvaScgaXMgc3VwcG9ydGVkLmApXG4gIHJldHVybiBlbnZOYW1lXG59XG5cbi8vIE9ubHkgY2FzZS1pbnNlbnNpdGl2ZSBhbHBoYW51bWVyaWMgYW5kIHVuZGVyc2NvcmUgKF8pIGFyZSBhbGxvd2VkIGZvciBlbnYgdmFyc1xuY29uc3QgaXNFbnZOYW1lVmFsaWQgPSAobmFtZTogc3RyaW5nKSA9PiAvXltfYS16MC05XSskL2kudGVzdChuYW1lKVxuXG4vKipcbiAqIEdldCB0aGUgZW52IHZhciB3aXRoIHRoZSBnaXZlbiBgbmFtZWAuIElmIHRoZSB2YXJpYWJsZSBpc1xuICogbm90IHByZXNlbnQgaW4gYHByb2Nlc3MuZW52YCwgaXQgd2lsbCBkZWZhdWx0IHRvIHRoZSBhZGFwdGVyJ3NcbiAqIGBlbnZEZWZhdWx0T3ZlcnJpZGVzYCBpZiBhZGFwdGVyJ3MgYGNvbnRleHRgIGlzIHByZXNlbnQsIHRoZW5cbiAqIGBiYXNlRW52RGVmYXVsdHNgLiBJbiBvcmRlciBmb3IgYGVudkRlZmF1bHRPdmVycmlkZXNgIHRvIG92ZXJyaWRlIHRoZVxuICogYmFzZSBkZWZhdWx0LCB0aGUgYWRhcHRlcidzIGBjb250ZXh0YCBtdXN0IGJlIHBhc3NlZCBpbnRvIGBnZXRFbnZgXG4gKiBldmVyeXdoZXJlIHRoYXQgdGhlIHZhcmlhYmxlIGlzIGZldGNoZWQuIFNlZSBgV1NfRU5BQkxFRGAgYXMgYW4gZXhhbXBsZS5cbiAqIEBwYXJhbSBuYW1lIEVudiB2YXIgdG8gZmV0Y2hcbiAqIEBwYXJhbSBwcmVmaXggUHJlZml4IGZvciBlbnYgdmFyICh1c2VmdWwgd2hlbiB3b3JraW5nIHdpdGggY29tcG9zaXRlcylcbiAqIEBwYXJhbSBjb250ZXh0IEFkYXB0ZXIgY29udGV4dCB0byBwdWxsIGBlbnZEZWZhdWx0T3ZlcnJpZGVzYCBmcm9tXG4gKiBAcmV0dXJucyB0aGUgZW52IHZhciBzdHJpbmcgaWYgZm91bmQsIGVsc2UgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbnYgPSAobmFtZTogc3RyaW5nLCBwcmVmaXggPSAnJywgY29udGV4dD86IEFkYXB0ZXJDb250ZXh0KTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgbGV0IGVudlZhciA9IHByb2Nlc3MuZW52W2dldEVudk5hbWUobmFtZSwgcHJlZml4KV1cbiAgaWYgKCFlbnZWYXIgfHwgZW52VmFyID09PSAnJykge1xuICAgIC8vQHRzLWV4cGVjdC1lcnJvciBFbnZEZWZhdWx0T3ZlcnJpZGVzIG9ubHkgYWxsb3dzIHNwZWNpZmljIHN0cmluZyBrZXlzLCBidXQgb3B0aW9uYWwgY2hhaW5pbmdcbiAgICAvLyBwcm90ZWN0cyBhZ2FpbnN0IGNhc2VzIHdoZXJlICduYW1lJyBpcyBub3QgaW4gRW52RGVmYXVsdE92ZXJyaWRlc1xuICAgIGVudlZhciA9IGNvbnRleHQ/LmVudkRlZmF1bHRPdmVycmlkZXM/LltuYW1lXSA/PyBiYXNlRW52RGVmYXVsdHNbbmFtZV1cbiAgfVxuICBpZiAoZW52VmFyID09PSAnJykgZW52VmFyID0gdW5kZWZpbmVkXG4gIHJldHVybiBlbnZWYXJcbn1cblxuLy8gQ3VzdG9tIGVycm9yIGZvciByZXF1aXJlZCBlbnYgdmFyaWFibGUuXG5leHBvcnQgY2xhc3MgUmVxdWlyZWRFbnZFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoYFBsZWFzZSBzZXQgdGhlIHJlcXVpcmVkIGVudiAke25hbWV9LmApXG4gICAgdGhpcy5uYW1lID0gUmVxdWlyZWRFbnZFcnJvci5uYW1lXG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgdmFyaWFibGUgZnJvbSBlbnZpcm9ubWVudHNcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIGVudmlyb25tZW50IHZhcmlhYmxlXG4gKiBAcGFyYW0gcHJlZml4IEEgc3RyaW5nIHRvIGFkZCBiZWZvcmUgdGhlIGVudmlyb25tZW50IHZhcmlhYmxlIG5hbWVcbiAqIEB0aHJvd3Mge1JlcXVpcmVkRW52RXJyb3J9IFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IGRlZmluZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UmVxdWlyZWRFbnYgPSAobmFtZTogc3RyaW5nLCBwcmVmaXggPSAnJyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHZhbCA9IGdldEVudihuYW1lLCBwcmVmaXgpXG4gIGlmICghdmFsKSB0aHJvdyBuZXcgUmVxdWlyZWRFbnZFcnJvcihnZXRFbnZOYW1lKG5hbWUsIHByZWZpeCkpXG4gIHJldHVybiB2YWxcbn1cblxuLy8gZm9ybWF0IGlucHV0IGFzIGFuIGFycmF5IHJlZ2FyZGxlc3Mgb2YgaWYgaXQgaXMgYSBzdHJpbmcgb3IgYW4gYXJyYXkgYWxyZWFkeVxuZXhwb3J0IGNvbnN0IGZvcm1hdEFycmF5ID0gKGlucHV0OiBzdHJpbmcgfCBzdHJpbmdbXSk6IHN0cmluZ1tdID0+XG4gIHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgPyBbaW5wdXRdIDogaW5wdXRcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRha2VzIGFuIEFycmF5PFY+LCBhbmQgYSBncm91cGluZyBmdW5jdGlvbixcbiAqIGFuZCByZXR1cm5zIGEgTWFwIG9mIHRoZSBhcnJheSBncm91cGVkIGJ5IHRoZSBncm91cGluZyBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gbGlzdCBBbiBhcnJheSBvZiB0eXBlIFYuXG4gKiBAcGFyYW0ga2V5R2V0dGVyIEEgRnVuY3Rpb24gdGhhdCB0YWtlcyB0aGUgdGhlIEFycmF5IHR5cGUgViBhcyBhbiBpbnB1dCwgYW5kIHJldHVybnMgYSB2YWx1ZSBvZiB0eXBlIEsuXG4gKiAgICAgICAgICAgICAgICAgIEsgaXMgZ2VuZXJhbGx5IGludGVuZGVkIHRvIGJlIGEgcHJvcGVydHkga2V5IG9mIFYuXG4gKlxuICogQHJldHVybnMgTWFwIG9mIHRoZSBhcnJheSBncm91cGVkIGJ5IHRoZSBncm91cGluZyBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8SywgVj4obGlzdDogQXJyYXk8Vj4sIGtleUdldHRlcjogKGlucHV0OiBWKSA9PiBLKTogTWFwPEssIEFycmF5PFY+PiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8SywgQXJyYXk8Vj4+KClcbiAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3Qga2V5ID0ga2V5R2V0dGVyKGl0ZW0pXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG1hcC5nZXQoa2V5KVxuICAgIGlmICghY29sbGVjdGlvbikge1xuICAgICAgbWFwLnNldChrZXksIFtpdGVtXSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29sbGVjdGlvbi5wdXNoKGl0ZW0pXG4gICAgfVxuICB9KVxuICByZXR1cm4gbWFwXG59XG5cbi8qKlxuICogUHJlZGljYXRlIHVzZWQgdG8gZmluZCBhZGFwdGVyIGJ5IG5hbWVcbiAqXG4gKiBAcGFyYW0gbmFtZSBzdHJpbmcgYWRhcHRlciBuYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBieU5hbWUgPVxuICAobmFtZT86IHN0cmluZykgPT5cbiAgKGE6IEFkYXB0ZXJJbXBsZW1lbnRhdGlvbik6IGJvb2xlYW4gPT5cbiAgICBhLk5BTUUudG9VcHBlckNhc2UoKSA9PT0gbmFtZT8udG9VcHBlckNhc2UoKVxuXG4vKipcbiAqIENvdmVydCBudW1iZXIgdG8gbWF4IG51bWJlciBvZiBkZWNpbWFscywgdHJpbSB0cmFpbGluZyB6ZXJvc1xuICpcbiAqIEBwYXJhbSBudW0gbnVtYmVyIHRvIGNvbnZlcnQgdG8gZml4ZWQgbWF4IG51bWJlciBvZiBkZWNpbWFsc1xuICogQHBhcmFtIGRlY2ltYWxzIG1heCBudW1iZXIgb2YgZGVjaW1hbHNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvRml4ZWRNYXggPSAobnVtOiBudW1iZXIgfCBzdHJpbmcgfCBEZWNpbWFsLCBkZWNpbWFsczogbnVtYmVyKTogc3RyaW5nID0+XG4gIG5ldyBEZWNpbWFsKG51bSlcbiAgICAudG9GaXhlZChkZWNpbWFscylcbiAgICAvLyByZW1vdmUgdHJhaWxpbmcgemVyb3NcbiAgICAucmVwbGFjZSgvKFxcLlxcZCo/WzEtOV0pMCskL2csICckMScpXG4gICAgLy8gcmVtb3ZlIGRlY2ltYWwgcGFydCBpZiBhbGwgemVyb3MgKG9yIG9ubHkgZGVjaW1hbCBwb2ludClcbiAgICAucmVwbGFjZSgvXFwuMCokL2csICcnKVxuXG4vLyBIZWxwZXIgdG8gaWRlbnRpZnkgaWYgZGVidWcgbW9kZSBpcyBydW5uaW5nXG5leHBvcnQgY29uc3QgaXNEZWJ1ZyA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIHBhcnNlQm9vbChnZXRFbnYoJ0RFQlVHJykpIHx8IGdldEVudignTk9ERV9FTlYnKSA9PT0gJ2RldmVsb3BtZW50J1xufVxuXG4vLyBIZWxwZXIgdG8gaWRlbnRpZnkgaWYgZGVidWcgbG9nIGxldmVsIGlzIHNldFxuZXhwb3J0IGNvbnN0IGlzRGVidWdMb2dMZXZlbCA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGdldEVudignTE9HX0xFVkVMJykgPT09ICdkZWJ1Zydcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQ2FsY3VsYXRlcyBhbGwgcG9zc2libGUgcGVybXV0YXRpb25zIHdpdGhvdXQgcmVwZXRpdGlvbiBvZiBhIGNlcnRhaW4gc2l6ZS5cbiAqXG4gKiBAcGFyYW0gY29sbGVjdGlvbiBBIGNvbGxlY3Rpb24gb2YgZGlzdGluY3QgdmFsdWVzIHRvIGNhbGN1bGF0ZSB0aGUgcGVybXV0YXRpb25zIGZyb20uXG4gKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIHZhbHVlcyB0byBjb21iaW5lLlxuICpcbiAqIEByZXR1cm5zIEFycmF5IG9mIHBlcm11dGF0aW9uc1xuICovXG5jb25zdCBwZXJtdXRhdGlvbnMgPSAoY29sbGVjdGlvbjogYW55LCBuOiBhbnkpID0+IHtcbiAgY29uc3QgYXJyYXkgPSB2YWx1ZXMoY29sbGVjdGlvbilcbiAgaWYgKGFycmF5Lmxlbmd0aCA8IG4pIHJldHVybiBbXVxuXG4gIGNvbnN0IHJlY3VyID0gKGFycmF5OiBhbnksIG46IGFueSkgPT4ge1xuICAgIGlmICgtLW4gPCAwKSByZXR1cm4gW1tdXVxuXG4gICAgY29uc3QgcGVybXV0YXRpb25zOiBhbnlbXSA9IFtdXG4gICAgYXJyYXkuZm9yRWFjaCgodmFsdWU6IGFueSwgaW5kZXg6IGFueSwgYXJyYXk6IGFueSkgPT4ge1xuICAgICAgYXJyYXkgPSBhcnJheS5zbGljZSgpXG4gICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICByZWN1cihhcnJheSwgbikuZm9yRWFjaCgocGVybXV0YXRpb24pID0+IHtcbiAgICAgICAgcGVybXV0YXRpb24udW5zaGlmdCh2YWx1ZSlcbiAgICAgICAgcGVybXV0YXRpb25zLnB1c2gocGVybXV0YXRpb24pXG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIHBlcm11dGF0aW9uc1xuICB9XG4gIHJldHVybiByZWN1cihhcnJheSwgbilcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEJ1aWxkcyBhIHBlcm11dGF0aW9uIHNldCBmcm9tIGEgbGlzdCBvZiBvcHRpb25zXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gY3JlYXRlIGEgcGVybXV0YXRpb24gZnJvbVxuICogQHBhcmFtIGRlbGltaXRlciAoT3B0aW9uYWwpIEpvaW5zIHRoZSBwZXJtdXRhdGlvbiByZXN1bHRzIHRvIGEgc3RyaW5nXG4gKlxuICogQHJldHVybnMgQXJyYXkgb2YgcGVybXV0YXRpb25zXG4gKi9cbmV4cG9ydCBjb25zdCBwZXJtdXRhdG9yID0gKG9wdGlvbnM6IHN0cmluZ1tdLCBkZWxpbWl0ZXI/OiBzdHJpbmcpOiBzdHJpbmdbXSB8IHN0cmluZ1tdW10gPT4ge1xuICBjb25zdCBvdXRwdXQ6IHN0cmluZ1tdW10gPSBmbGF0TWFwKG9wdGlvbnMsIChfOiBhbnksIGk6IGFueSwgYTogYW55KSA9PiBwZXJtdXRhdGlvbnMoYSwgaSArIDEpKVxuICBjb25zdCBqb2luID0gKGNvbWJvczogc3RyaW5nW11bXSkgPT4gY29tYm9zLm1hcCgocCkgPT4gcC5qb2luKGRlbGltaXRlcikpXG4gIHJldHVybiB0eXBlb2YgZGVsaW1pdGVyID09PSAnc3RyaW5nJyA/IGpvaW4ob3V0cHV0KSA6IG91dHB1dFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ2hlY2sgZXhpc3RpbmcgKG5vbi11bmRlZmluZWQpIHZhbHVlIGZvciBpdHMgdHlwZS5cbiAqXG4gKiBAdXJsXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9PcGVyYXRvcnMvdHlwZW9mI3JlYWwtd29ybGRfdXNhZ2VcbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHR5cGUgY2hlY2tcbiAqIEBwYXJhbSBmdWxsQ2xhc3MgKE9wdGlvbmFsKSBXaGV0aGVyIHRvIHVzZSBwb2x5ZmlsbCBmb3IgY2hlY2tpbmcgbnVsbFxuICpcbiAqIEByZXR1cm5zIFN0cmluZyBkZXNjcmliaW5nIHR5cGUgb2Ygb2JqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwVHlwZSh2YWx1ZTogdW5rbm93biwgZnVsbENsYXNzPzogYm9vbGVhbik6IHN0cmluZyB7XG4gIC8vIGdldCB0b1Byb3RvdHlwZVN0cmluZygpIG9mIG9iaiAoaGFuZGxlcyBhbGwgdHlwZXMpXG4gIC8vIEVhcmx5IEpTIGVudmlyb25tZW50cyByZXR1cm4gJ1tvYmplY3QgT2JqZWN0XScgZm9yIG51bGwsIHNvIGl0J3MgYmVzdCB0byBkaXJlY3RseSBjaGVjayBmb3IgaXQuXG4gIGlmIChmdWxsQ2xhc3MpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgPyAnW29iamVjdCBOdWxsXScgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpXG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gKHZhbHVlICsgJycpLnRvTG93ZXJDYXNlKClcbiAgfSAvLyBpbXBsaWNpdCB0b1N0cmluZygpIGNvbnZlcnNpb25cblxuICBjb25zdCBkZWVwVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKClcbiAgaWYgKGRlZXBUeXBlID09PSAnZ2VuZXJhdG9yZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuICdmdW5jdGlvbidcbiAgfVxuXG4gIC8vIFByZXZlbnQgb3ZlcnNwZWNpZmljaXR5IChmb3IgZXhhbXBsZSwgW29iamVjdCBIVE1MRGl2RWxlbWVudF0sIGV0YykuXG4gIC8vIEFjY291bnQgZm9yIGZ1bmN0aW9uaXNoIFJlZ2V4cCAoQW5kcm9pZCA8PTIuMyksIGZ1bmN0aW9uaXNoIDxvYmplY3Q+IGVsZW1lbnQgKENocm9tZSA8PTU3LCBGaXJlZm94IDw9NTIpLCBldGMuXG4gIC8vIFN0cmluZy5wcm90b3R5cGUubWF0Y2ggaXMgdW5pdmVyc2FsbHkgc3VwcG9ydGVkLlxuXG4gIHJldHVybiBkZWVwVHlwZS5tYXRjaCgvXihhcnJheXxiaWdpbnR8ZGF0ZXxlcnJvcnxmdW5jdGlvbnxnZW5lcmF0b3J8cmVnZXhwfHN5bWJvbCkkLylcbiAgICA/IGRlZXBUeXBlXG4gICAgOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gJ29iamVjdCdcbiAgICA6IHR5cGVvZiB2YWx1ZVxufVxuXG5leHBvcnQgY29uc3QgTEVHQUNZX0VOVl9BREFQVEVSX1VSTCA9ICdEQVRBX1BST1ZJREVSX1VSTCdcbmV4cG9ydCBjb25zdCBFTlZfQURBUFRFUl9VUkwgPSAnQURBUFRFUl9VUkwnXG5cbmV4cG9ydCBjb25zdCBnZXRVUkwgPSAocHJlZml4OiBzdHJpbmcsIHJlcXVpcmVkID0gZmFsc2UpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT5cbiAgcmVxdWlyZWRcbiAgICA/IGdldFJlcXVpcmVkVVJMKHByZWZpeClcbiAgICA6IGdldEVudihFTlZfQURBUFRFUl9VUkwsIHByZWZpeCkgfHwgZ2V0RW52KExFR0FDWV9FTlZfQURBUFRFUl9VUkwsIHByZWZpeClcblxuZXhwb3J0IGNvbnN0IGdldFJlcXVpcmVkVVJMID0gKHByZWZpeDogc3RyaW5nKTogc3RyaW5nID0+XG4gIGdldFJlcXVpcmVkRW52KEVOVl9BREFQVEVSX1VSTCwgcHJlZml4KSB8fCBnZXRSZXF1aXJlZEVudihMRUdBQ1lfRU5WX0FEQVBURVJfVVJMLCBwcmVmaXgpXG5cbi8qKlxuICogR2V0IHZhcmlhYmxlIGZyb20gZW52aXJvbm1lbnQgdGhlbiBjaGVjayBmb3IgYSBmYWxsYmFjayBpZiBpdCBpcyBub3Qgc2V0IHRoZW4gdGhyb3cgaWYgbmVpdGhlciBhcmUgc2V0XG4gKiBAcGFyYW0gcHJpbWFyeSBUaGUgbmFtZSBvZiBlbnZpcm9ubWVudCB2YXJpYWJsZSB0byBsb29rIGZvciBmaXJzdFxuICogQHBhcmFtIHByZWZpeCBBIHN0cmluZyB0byBhZGQgYmVmb3JlIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZSBuYW1lXG4gKiBAcGFyYW0gZmFsbGJhY2tzIFRoZSBzdWJzZXF1ZW50IG5hbWVzIG9mIGVudmlyb25tZW50IHZhcmlhYmxlcyB0byBsb29rIGZvciBpZiB0aGUgcHJpbWFyeSBpcyBub3QgZm91bmRcbiAqIEB0aHJvd3Mge1JlcXVpcmVkRW52RXJyb3J9IFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IGRlZmluZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UmVxdWlyZWRFbnZXaXRoRmFsbGJhY2sgPSAoXG4gIHByaW1hcnk6IHN0cmluZyxcbiAgZmFsbGJhY2tzOiBzdHJpbmdbXSxcbiAgcHJlZml4ID0gJycsXG4pOiBzdHJpbmcgPT4ge1xuICAvLyBBdHRlbXB0IHByaW1hcnlcbiAgY29uc3QgdmFsID0gZ2V0RW52KHByaW1hcnksIHByZWZpeClcbiAgaWYgKHZhbCkgcmV0dXJuIHZhbFxuXG4gIC8vIEF0dGVtcHQgZmFsbGJhY2tzXG4gIGZvciAoY29uc3QgZmFsbGJhY2sgb2YgZmFsbGJhY2tzKSB7XG4gICAgY29uc3QgdmFsID0gZ2V0RW52KGZhbGxiYWNrLCBwcmVmaXgpXG4gICAgaWYgKHZhbCkgcmV0dXJuIHZhbFxuICB9XG5cbiAgdGhyb3cgbmV3IFJlcXVpcmVkRW52RXJyb3IoZ2V0RW52TmFtZShwcmltYXJ5LCBwcmVmaXgpKVxufVxuXG4vLyAgVVJMIEVuY29kaW5nXG5cbmNvbnN0IGNoYXJzVG9FbmNvZGUgPSB7XG4gICc6JzogJyUzQScsXG4gICcvJzogJyUyRicsXG4gICc/JzogJyUzRicsXG4gICcjJzogJyUyMycsXG4gICdbJzogJyU1QicsXG4gICddJzogJyU1RCcsXG4gICdAJzogJyU0MCcsXG4gICchJzogJyUyMScsXG4gICQ6ICclMjQnLFxuICAnJic6ICclMjYnLFxuICBcIidcIjogJyUyNycsXG4gICcoJzogJyUyOCcsXG4gICcpJzogJyUyOScsXG4gICcqJzogJyUyQScsXG4gICcrJzogJyUyQicsXG4gICcsJzogJyUyQycsXG4gICc7JzogJyUzQicsXG4gICc9JzogJyUzRCcsXG4gICclJzogJyUyNScsXG4gICcgJzogJyUyMCcsXG4gICdcIic6ICclMjInLFxuICAnPCc6ICclM0MnLFxuICAnPic6ICclM0UnLFxuICAneyc6ICclN0InLFxuICAnfSc6ICclN0QnLFxuICAnfCc6ICclN0MnLFxuICAnXic6ICclNUUnLFxuICAnYCc6ICclNjAnLFxuICAnXFxcXCc6ICclNUMnLFxufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBjb250YWlucyBjaGFyYWN0ZXJzIGluIHRoZSBnaXZlbiB3aGl0ZWxpc3QuXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gY2hlY2suXG4gKiBAcGFyYW0gd2hpdGVsaXN0IFRoZSBzdHJpbmcgYXJyYXkgb2Ygd2hpdGVsaXN0IGVudHJpZXMuIFJldHVybnMgdHJ1ZSBpZiBhbnkgb2YgdGhlc2UgYXJlIGZvdW5kIGluICdzdHInLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBzdHJpbmdIYXNXaGl0ZWxpc3QgPSAoc3RyOiBzdHJpbmcsIHdoaXRlbGlzdDogc3RyaW5nW10pOiBib29sZWFuID0+XG4gIHdoaXRlbGlzdC5zb21lKChlbCkgPT4gc3RyLmluY2x1ZGVzKGVsKSlcblxuLyoqXG4gKiBNYW51YWxseSBpdGVyYXRlIHRocm91Z2ggYSBnaXZlbiBzdHJpbmcgYW5kIHJlcGxhY2UgdW5zYWZlL3Jlc2VydmVkIGNoYXJhY3RlcnMgd2l0aCBlbmNvZGVkIHZhbHVlcyAodW5sZXNzIGEgY2hhcmFjdGVyIGlzIHdoaXRlbGlzdGVkKVxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqIEBwYXJhbSB3aGl0ZWxpc3QgVGhlIHN0cmluZyBhcnJheSBvZiB3aGl0ZWxpc3QgZW50cmllcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHBlcmNlbnRFbmNvZGVTdHJpbmcgPSAoc3RyOiBzdHJpbmcsIHdoaXRlbGlzdDogc3RyaW5nW10pOiBzdHJpbmcgPT5cbiAgc3RyXG4gICAgLnNwbGl0KCcnKVxuICAgIC5tYXAoKGNoYXIpID0+IHtcbiAgICAgIGNvbnN0IGVuY29kZWRWYWx1ZSA9IGNoYXJzVG9FbmNvZGVbY2hhciBhcyBrZXlvZiB0eXBlb2YgY2hhcnNUb0VuY29kZV1cbiAgICAgIHJldHVybiBlbmNvZGVkVmFsdWUgJiYgIXdoaXRlbGlzdC5pbmNsdWRlcyhjaGFyKSA/IGVuY29kZWRWYWx1ZSA6IGNoYXJcbiAgICB9KVxuICAgIC5qb2luKCcnKVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIHBhdGggdXNpbmcgdGhlIGdpdmVuIHBhdGhUZW1wbGF0ZSBhbmQgcGFyYW1zLiBJZiBhIHBhcmFtIGlzIGZvdW5kIGluIHBhdGhUZW1wbGF0ZSwgaXQgd2lsbCBiZSBpbnNlcnRlZCB0aGVyZTsgb3RoZXJ3aXNlLCBpdCB3aWxsIGJlIGlnbm9yZWQuXG4gKiBlZy4pIHBhdGhUZW1wbGF0ZSA9IFwiL2Zyb20vOmZyb20vdG8vOnRvXCIgYW5kIHBhcmFtcyA9IHsgZnJvbTogXCJFVEhcIiwgdG86IFwiQlRDXCIsIG5vdGU6IFwiaGVsbG9cIiB9IHdpbGwgYmVjb21lIFwiL2Zyb20vRVRIL3RvL0JUQ1wiXG4gKiBAcGFyYW0gcGF0aFRlbXBsYXRlIFRoZSBwYXRoIHRlbXBsYXRlIGZvciB0aGUgVVJMIHBhdGguIEVhY2ggcGFyYW0gdG8gaW5jbHVkZSBpbiB0aGUgcGF0aCBzaG91bGQgaGF2ZSBhIHByZWZpeCBvZiAnOicuXG4gKiBAcGFyYW0gcGFyYW1zIFRoZSBvYmplY3QgY29udGFpbmluZyBrZXlzICYgdmFsdWVzIHRvIGJlIGFkZGVkIHRvIHRoZSBVUkwgcGF0aC5cbiAqIEBwYXJhbSB3aGl0ZWxpc3QgVGhlIGxpc3Qgb2YgY2hhcmFjdGVycyB0byB3aGl0ZWxpc3QgZm9yIHRoZSBVUkwgcGF0aCAoaWYgYSBwYXJhbSBjb250YWlucyBvbmUgb2YgeW91ciB3aGl0ZWxpc3RlZCBjaGFyYWN0ZXJzLCBpdCB3aWxsIG5vdCBiZSBlbmNvZGVkKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBidWlsZFVybFBhdGggPSAocGF0aFRlbXBsYXRlID0gJycsIHBhcmFtcyA9IHt9LCB3aGl0ZWxpc3QgPSAnJyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGFsbG93ZWRDaGFycyA9IHdoaXRlbGlzdC5zcGxpdCgnJylcblxuICBmb3IgKGNvbnN0IHBhcmFtIGluIHBhcmFtcykge1xuICAgIGNvbnN0IHZhbHVlID0gcGFyYW1zW3BhcmFtIGFzIGtleW9mIHR5cGVvZiBwYXJhbXNdXG4gICAgaWYgKCF2YWx1ZSkgY29udGludWVcblxuICAgIC8vIElmIHN0cmluZyBjb250YWlucyBhIHdoaXRlbGlzdGVkIGNoYXJhY3RlcjogbWFudWFsbHkgcmVwbGFjZSBhbnkgbm9uLXdoaXRlbGlzdGVkIGNoYXJhY3RlcnMgd2l0aCBwZXJjZW50IGVuY29kZWQgdmFsdWVzLiBPdGhlcndpc2UsIGVuY29kZSB0aGUgc3RyaW5nIGFzIHVzdWFsLlxuICAgIGNvbnN0IGVuY29kZWRWYWx1ZSA9IHN0cmluZ0hhc1doaXRlbGlzdCh2YWx1ZSwgYWxsb3dlZENoYXJzKVxuICAgICAgPyBwZXJjZW50RW5jb2RlU3RyaW5nKHZhbHVlLCBhbGxvd2VkQ2hhcnMpXG4gICAgICA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSlcblxuICAgIHBhdGhUZW1wbGF0ZSA9IHBhdGhUZW1wbGF0ZS5yZXBsYWNlKGA6JHtwYXJhbX1gLCBlbmNvZGVkVmFsdWUpXG4gIH1cblxuICByZXR1cm4gcGF0aFRlbXBsYXRlXG59XG5cbi8qKlxuICogQnVpbGQgYSBmdWxsIFVSTCB1c2luZyB0aGUgZ2l2ZW4gYmFzZVVybCwgcGF0aFRlbXBsYXRlIGFuZCBwYXJhbXMuIFVzZXMgYnVpbGRVcmxQYXRoIHRvIGFkZCBwYXRoICYgcGFyYW1zLlxuICogQHBhcmFtIGJhc2VVcmwgVGhlIGJhc2UgVVJMIHRvIGFkZCB0aGUgcGF0aFRlbXBsYXRlICYgcGFyYW1zIHRvLlxuICogQHBhcmFtIHBhdGhUZW1wbGF0ZSBUaGUgcGF0aCB0ZW1wbGF0ZSBmb3IgdGhlIFVSTCBwYXRoLiBMZWF2ZSBlbXB0eSBpZiBvbmx5IHNlYXJjaFBhcmFtcyBhcmUgcmVxdWlyZWQuXG4gKiBAcGFyYW0gcGFyYW1zIFRoZSBvYmplY3QgY29udGFpbmluZyBrZXlzICYgdmFsdWVzIHRvIGJlIGFkZGVkIHRvIHRoZSBVUkwgcGF0aC5cbiAqIEBwYXJhbSB3aGl0ZWxpc3QgVGhlIGxpc3Qgb2YgY2hhcmFjdGVycyB0byB3aGl0ZWxpc3QgZm9yIHRoZSBVUkwgcGF0aC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBidWlsZFVybCA9IChiYXNlVXJsOiBzdHJpbmcsIHBhdGhUZW1wbGF0ZSA9ICcnLCBwYXJhbXMgPSB7fSwgd2hpdGVsaXN0ID0gJycpOiBzdHJpbmcgPT5cbiAgbmV3IFVSTChidWlsZFVybFBhdGgocGF0aFRlbXBsYXRlLCBwYXJhbXMsIHdoaXRlbGlzdCksIGJhc2VVcmwpLnRvU3RyaW5nKClcblxuLy8gIFVSTCBFbmNvZGluZ1xuXG5sZXQgdW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlclJlZ2lzdGVyZWQgPSBmYWxzZVxuXG4vKipcbiAqIEFkYXB0ZXJzIHVzZSB0byBydW4gd2l0aCBOb2RlIDE0LCB3aGljaCBieSBkZWZhdWx0IGRpZG4ndCBjcmFzaCB3aGVuIGEgcmVqZWN0ZWQgcHJvbWlzZWQgYnViYmxlZCB1cCB0byB0aGUgdG9wLlxuICogVGhpcyBmdW5jdGlvbiByZWdpc3RlcnMgYSBnbG9iYWwgaGFuZGxlciB0byBjYXRjaCB0aG9zZSByZWplY3Rpb25zIGFuZCBqdXN0IGxvZyB0aGVtIHRvIGNvbnNvbGUuXG4gKi9cbmV4cG9ydCBjb25zdCByZWdpc3RlclVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gIGlmICh1bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyUmVnaXN0ZXJlZCkge1xuICAgIGlmIChnZXRFbnYoJ05PREVfRU5WJykgIT09ICd0ZXN0JylcbiAgICAgIGxvZ2dlci53YXJuKCdVbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyIGF0dGVtcHRlZCB0byBiZSByZWdpc3RlcmVkIG1vcmUgdGhhbiBvbmNlJylcbiAgICByZXR1cm5cbiAgfVxuXG4gIHVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXJSZWdpc3RlcmVkID0gdHJ1ZVxuICBwcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCAocmVhc29uKSA9PiB7XG4gICAgbG9nZ2VyLndhcm4oJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbiByZWFjaGVkIGN1c3RvbSBoYW5kbGVyJylcbiAgICBsb2dnZXIud2FybihKU09OLnN0cmluZ2lmeShyZWFzb24pKVxuICB9KVxufVxuXG4vKipcbiAqIFNsZWVwcyBmb3IgdGhlIHByb3ZpZGVkIG51bWJlciBvZiBtaWxsaXNlY29uZHNcbiAqIEBwYXJhbSBtcyBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBzbGVlcCBmb3JcbiAqIEByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgdGhlIHNwZWNpZmllZCB0aW1lIHBhc3Nlc1xuICovXG5leHBvcnQgY29uc3Qgc2xlZXAgPSAobXM6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKVxufVxuXG4vKipcbiAqIFJlbW92ZSBzdGFsZSByZXF1ZXN0IGVudHJpZXMgZnJvbSBhbiBhcnJheS5cbiAqIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IHRoZSBhcnJheSBpcyBzb3J0ZWQgYnkgdGltZXN0YW1wLFxuICogd2hlcmUgdGhlIG9sZGVzdCBlbnRyeSBsaXZlcyBpbiB0aGUgMHRoIGluZGV4LCBhbmQgdGhlIG5ld2VzdCBlbnRyeVxuICogbGl2ZXMgaW4gdGhlIGFyci5sZW5ndGgtMXRoIGluZGV4XG4gKiBAcGFyYW0gaXRlbXMgVGhlIGl0ZW1zIHRvIGZpbHRlclxuICogQHBhcmFtIGZpbHRlciBUaGUgd2luZG93aW5nIGZ1bmN0aW9uIHRvIGFwcGx5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0ZWRGaWx0ZXI8VD4oaXRlbXM6IFRbXSwgd2luZG93aW5nRnVuY3Rpb246IChpdGVtOiBUKSA9PiBib29sZWFuKTogVFtdIHtcbiAgLy8gaWYgd2Ugd2FudCBhIGhpZ2hlciBwZXJmb3JtYW5jZSBpbXBsZW1lbnRhdGlvblxuICAvLyB3ZSBjYW4gbGF0ZXIgcmVzb3J0IHRvIGEgY3VzdG9tIGFycmF5IGNsYXNzIHRoYXQgaXMgY2lyY3VsYXJcbiAgLy8gc28gd2UgY2FuIGFtb3J0aXplIGV4cGVuc2l2ZSBvcGVyYXRpb25zIGxpa2UgcmVzaXppbmcsIGFuZCBtYWtlXG4gIC8vIG9wZXJhdGlvbnMgbGlrZSBtb3ZpbmcgdGhlIGhlYWQgaW5kZXggbXVjaCBxdWlja2VyXG4gIGNvbnN0IGZpcnN0Tm9uU3RhbGVJdGVtSW5kZXggPSBpdGVtcy5maW5kSW5kZXgod2luZG93aW5nRnVuY3Rpb24pXG4gIGlmIChmaXJzdE5vblN0YWxlSXRlbUluZGV4ID09PSAtMSkge1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgcmV0dXJuIGl0ZW1zLnNsaWNlKGZpcnN0Tm9uU3RhbGVJdGVtSW5kZXgpXG59XG4iXX0=