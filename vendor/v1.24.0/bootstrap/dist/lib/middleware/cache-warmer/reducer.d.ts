import { AdapterRequest, Execute } from '@chainlink/types';
export interface BatchableProperty {
    name: string;
    limit?: number;
}
/**
 * Metadata about a request
 */
export interface SubscriptionData {
    /**
     * The original request data that triggered this subscription
     */
    origin: AdapterRequest['data'];
    /**
     * The wrapped execute function that was used to service the request
     */
    executeFn: Execute;
    /**
     * The time this subscription started in unix time
     */
    startedAt: number;
    /**
     * Boolean trigger to prevent multiple subscriptions on the same key
     * We need this because checking state for this within an epic doesnt work,
     * the reducers are always executed before epics are
     */
    isDuplicate: boolean;
    /**
     * If a subscription is being warmed by a parent batch request
     * This will hold the subscription key of the parent
     */
    parent?: string;
    /**
     * If a subscription is being warmed by a parent batch request
     * This will hold the key of the request data to join
     */
    batchablePropertyPath?: BatchableProperty[];
    /**
     * If a subscription is warming multiple other requests
     * This will hold a map of the subscription key to the last time it was seen
     */
    childLastSeenById?: {
        [childKey: string]: number;
    };
}
export interface SubscriptionState {
    [requestKey: string]: SubscriptionData;
}
export declare const subscriptionsReducer: import("redux").Reducer<SubscriptionState, import("redux").AnyAction>;
export interface RequestData {
    /**
     * Current error for warmup request, if any
     */
    error: Error | null;
    /**
     * The consecutive number of times we've had successful warmups
     */
    successCount: number;
    /**
     * The consecutive number of times we've had errors trying to send a warmup request
     */
    errorCount: number;
}
export interface RequestState {
    [key: string]: RequestData;
}
export declare const warmupReducer: import("redux").Reducer<RequestState, import("redux").AnyAction>;
export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    subscriptions: SubscriptionState;
    warmups: RequestState;
}>, import("redux").AnyAction>;
export declare type CacheWarmerState = ReturnType<typeof rootReducer>;
//# sourceMappingURL=reducer.d.ts.map