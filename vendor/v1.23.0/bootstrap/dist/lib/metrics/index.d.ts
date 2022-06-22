import * as client from 'prom-client';
import { Middleware } from '@chainlink/types';
export declare const setupMetrics: (name: string) => void;
export declare const METRICS_ENABLED: boolean;
export declare const withMetrics: Middleware;
export declare enum HttpRequestType {
    CACHE_HIT = "cacheHit",
    DATA_PROVIDER_HIT = "dataProviderHit",
    ADAPTER_ERROR = "adapterError"
}
export declare const httpRequestsTotal: client.Counter<"type" | "feed_id" | "status_code" | "method" | "retry" | "is_cache_warming" | "provider_status_code">;
export declare const httpRequestDurationSeconds: client.Histogram<string>;
export declare const cacheWarmerRequests: client.Counter<"statusCode" | "apiKey" | "method" | "retry">;
export declare const httpRequestsCacheHits: client.Counter<"statusCode" | "apiKey" | "method" | "retry">;
export declare const httpRequestsDataProviderHits: client.Counter<"statusCode" | "apiKey" | "method" | "retry">;
export * as util from './util';
//# sourceMappingURL=index.d.ts.map