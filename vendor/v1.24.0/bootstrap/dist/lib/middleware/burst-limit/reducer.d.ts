export declare enum IntervalNames {
    SECOND = "SECOND",
    MINUTE = "MINUTE"
}
export declare const Intervals: {
    [key: string]: number;
};
export interface Request {
    id: string;
    /**
     * Timestamp
     */
    t: number;
}
export interface RequestsState {
    total: {
        [interval: string]: number;
    };
    participants: {
        [interval: string]: Request[];
    };
}
export declare const initialRequestsState: RequestsState;
export declare const requestReducer: import("redux").Reducer<RequestsState, import("redux").AnyAction>;
export declare function selectTotalNumberOfRequestsFor(state: RequestsState, interval: IntervalNames): number;
export declare function selectParticiantsRequestsFor(state: RequestsState, interval: IntervalNames): Request[];
export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    requests: RequestsState;
}>, import("redux").AnyAction>;
export declare type BurstLimitState = ReturnType<typeof rootReducer>;
//# sourceMappingURL=reducer.d.ts.map