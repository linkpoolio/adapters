export declare enum IntervalNames {
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
        [interval in IntervalNames]: number;
    };
    participants: {
        [interval in IntervalNames]: Request[];
    };
}
export declare const initialRequestsState: RequestsState;
export declare const requestReducer: import("redux").Reducer<RequestsState, import("redux").AnyAction>;
export declare function selectParticiantsRequestsById(state: RequestsState, interval: IntervalNames, id: string): Request[];
export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    requests: RequestsState;
}>, import("redux").AnyAction>;
export declare type ErrorBackoffState = ReturnType<typeof rootReducer>;
//# sourceMappingURL=reducer.d.ts.map