import * as client from 'prom-client';
export declare const redis_connections_open: client.Counter<string>;
export declare const redis_retries_count: client.Counter<string>;
export declare enum CMD_SENT_STATUS {
    TIMEOUT = "TIMEOUT",
    FAIL = "FAIL",
    SUCCESS = "SUCCESS"
}
export declare const redis_commands_sent_count: client.Counter<"status" | "function_name">;
//# sourceMappingURL=metrics.d.ts.map