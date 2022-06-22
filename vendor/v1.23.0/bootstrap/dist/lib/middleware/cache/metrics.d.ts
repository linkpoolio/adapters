interface CacheExecutionDurationParams {
    participantId: string;
    feedId?: string;
    isFromWs: boolean;
}
export declare const beginObserveCacheMetrics: ({ participantId, feedId, isFromWs, }: CacheExecutionDurationParams) => {
    stalenessAndExecutionTime(cacheHit: boolean, staleness?: number): number;
    cacheGet({ value }: {
        value: unknown;
    }): void;
    cacheSet({ statusCode, maxAge }: {
        statusCode: number;
        maxAge: number;
    }): void;
};
export {};
//# sourceMappingURL=metrics.d.ts.map