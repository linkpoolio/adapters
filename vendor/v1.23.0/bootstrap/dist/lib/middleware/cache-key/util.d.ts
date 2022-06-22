import { AdapterRequest } from '@chainlink/types';
import objectHash from 'object-hash';
/** Common keys within adapter requests that should be ignored to generate a stable key*/
export declare const excludableAdapterRequestProperties: Record<string, true>;
/** Common keys within adapter requests that should be used to generate a stable key*/
export declare const includableAdapterRequestProperties: string[];
/** Common keys within adapter requests that should be ignored within "data" to create a stable key*/
export declare const excludableInternalAdapterRequestProperties: string[];
export declare const getKeyData: (data: AdapterRequest) => any;
export declare type HashMode = 'include' | 'exclude';
/**
 * Generates a key by hashing input data
 *
 * @param data Adapter request input data
 * @param hashOptions Additional configuration for the objectHash package
 * @param mode Which behavior to use:
 *    include (default) - hash only selected properties throwing out everything else
 *    exclude           - hash the entire data object after excluding certain properties
 *
 * @returns string
 */
export declare const hash: (data: AdapterRequest, hashOptions: Required<Parameters<typeof objectHash>>['1'], mode?: HashMode) => string;
export declare const getHashOpts: () => Required<Parameters<typeof objectHash>>['1'];
//# sourceMappingURL=util.d.ts.map