import { AdapterErrorResponse, AdapterResponse, RequestConfig, AdapterRequest, AdapterRequestData, ResultPath, AdapterBatchResponse } from '@chainlink/types';
import { reducer } from '../middleware/cache-warmer';
import { AxiosResponse } from 'axios';
import { getDefaultConfig, logConfig } from '../config';
import { AdapterError } from './error';
export declare class Requester {
    static request<T extends AdapterRequestData>(config: RequestConfig, customError?: any, retries?: number, delay?: number): Promise<AxiosResponse<T>>;
    static validateResultNumber(data: {
        [key: string]: any;
    }, path: ResultPath, options?: {
        inverse?: boolean;
    }): number;
    static getResult(data: {
        [key: string]: unknown;
    }, path: ResultPath): unknown;
    /**
     * Extend a typed Axios response with a single result or group of results
     * @param response Axios response object
     * @param result (optional) a single result value
     * @param results (optional) a group of results from a batch request
     */
    static withResult<T>(response: AxiosResponse<T>, result?: number | string, results?: [string, AdapterRequest, number][]): AxiosResponseWithLiftedResult<T> | AxiosResponseWithPayloadAndLiftedResult<T>;
    static errored(jobRunID?: string, error?: AdapterError | Error | string, statusCode?: number, feedID?: string): AdapterErrorResponse;
    /**
     * Conforms the .request() response to the expected Chainlink response structure
     * @param jobRunID
     * @param response The response data object
     * @param verbose Return full response data (optional, default: false)
     */
    static success(jobRunID: string | undefined, response: Partial<AxiosResponse>, verbose?: boolean, batchablePropertyPath?: reducer.BatchableProperty[]): AdapterResponse;
    static getDefaultConfig: typeof getDefaultConfig;
    static logConfig: typeof logConfig;
    static toVendorName: <K, V>(key: K, names: {
        [key: string]: V;
    }) => V;
}
/**
 * Contained within the body of an api response
 * from a request that asked for a single data point
 *
 * @example Request Parameters
 * ```
 * {
 *  "data": {
 *      "base": "ETH",
 *      "quote": "USD"
 *   }
 *}
 * ```
 */
interface SingleResult {
    result?: number | string;
}
/**
 * Contained within the body of an api response
 * from a request that asked for multiple data points
 *
 * @example Request Parameters
 * ```
 * {
 *  "data": {
 *      "base": "ETH,BTC",
 *      "quote": "USD"
 *   }
 *}
 * ```
 */
interface BatchedResult {
    /**
     * Tuples for
     * [
     *    its input parameters as a single request (used in caching),
     *    its result
     * ]
     */
    results?: AdapterBatchResponse;
}
/**
 * A lifted result is derived from a raw response,
 * where the response payload will be slightly normalized,
 * "lifting" nested data into the root object
 *
 * @example
 * ```ts
 * // Raw response payload
 * {
 *  payload: {
 *   data: {
 *     nested: {
 *      result: {}
 *     }
 *   }
 *  }
 * // lifted
 *
 * {
 *  data: { results: {}}
 * }
 * ```
 */
declare type LiftedResult = SingleResult & BatchedResult;
/**
 * An Axios response with a result or results added to the response data.
 */
declare type AxiosResponseWithLiftedResult<T> = AxiosResponse<T & LiftedResult>;
/**
 * An Axios response that has response data that is not an object
 * needs to be transformed into an object to hold the result or results fields.
 *
 * The original response data will be store under the key of payload.
 */
declare type AxiosResponseWithPayloadAndLiftedResult<T> = AxiosResponse<{
    payload: T;
} & LiftedResult>;
export {};
//# sourceMappingURL=requester.d.ts.map