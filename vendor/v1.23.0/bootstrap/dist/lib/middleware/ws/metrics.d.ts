import * as client from 'prom-client';
export declare const ws_connection_active: client.Gauge<"url" | "key" | "experimental">;
export declare const ws_connection_errors: client.Counter<"message" | "url" | "key" | "experimental">;
export declare const ws_connection_retries: client.Counter<"url" | "key" | "experimental">;
export declare const ws_subscription_active: client.Gauge<"feed_id" | "experimental" | "connection_key" | "connection_url" | "subscription_key">;
export declare const ws_subscription_total: client.Counter<"feed_id" | "experimental" | "connection_key" | "connection_url" | "subscription_key">;
export declare const ws_subscription_errors: client.Counter<"message" | "feed_id" | "experimental" | "connection_key" | "connection_url" | "subscription_key">;
export declare const ws_message_total: client.Counter<"feed_id" | "experimental" | "subscription_key">;
export declare const ws_message_errors: client.Counter<"experimental" | "connection_key" | "connection_url" | "subscription_key">;
//# sourceMappingURL=metrics.d.ts.map