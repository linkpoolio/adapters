export declare enum IntervalNames {
    MINUTE = "MINUTE",
    HOUR = "HOUR"
}
export declare const Intervals: {
    [key: string]: number;
};
export interface Heartbeat {
    id: string;
    /**
     * Cost
     */
    c: number;
    /**
     * Timestamp
     */
    t: number;
    /**
     * isCacheHit
     */
    h: boolean;
}
export interface Heartbeats {
    total: {
        [interval: string]: number;
    };
    participants: {
        [participantId: string]: {
            [interval: string]: Heartbeat[];
        };
    };
}
export declare function selectTotalNumberOfHeartbeatsFor(state: Heartbeats, interval: IntervalNames): number;
export declare function selectParticiantsHeartbeatsFor(state: Heartbeats, interval: IntervalNames, id: string): Heartbeat[];
export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    heartbeats: Heartbeats;
}>, import("redux").AnyAction>;
export declare type RootState = ReturnType<typeof rootReducer>;
//# sourceMappingURL=reducer.d.ts.map