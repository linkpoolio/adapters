import { AdapterRequest, AdapterResponse, Execute } from '@chainlink/types';
import { BatchableProperty } from './reducer';
export interface WarmupExecutePayload extends AdapterRequest {
    /**
     * The Execute function of the adapter. Used when polling for new data.
     */
    executeFn: Execute;
    /**
     * The response returned from requesting data from a provider
     */
    result: AdapterResponse;
}
export declare const warmupExecute: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupExecutePayload, string>;
export interface WarmupSubscribedPayload extends WarmupExecutePayload {
    /**
     * Override the key to used when storing the subscription
     * Batch warmers will use a key without the data property
     */
    key?: string;
    /**
     * If a subscription is being warmed by a batch warmer
     * This will hold the subscription key of the parent
     */
    parent?: string;
    /**
     * If a subscription is being warmed by a parent batch request
     * This will hold the key of the request data to join
     * (e.g.
     * when getting price data this might be "base"
     * that will be the path in data:
     *  {
     *    "base": ["ETH", "USD"],
     *    "quote": "USD"
     *  }
     * )
     */
    batchablePropertyPath?: BatchableProperty[];
    /**
     * If a subscription is a batch warmer that is warming multiple other requests
     * This will hold a map of the children subscription key to the last time it was seen
     */
    childLastSeenById?: {
        [childKey: string]: number;
    };
}
export interface WarmupSubscribedMultiplePayload {
    members: WarmupSubscribedPayload[];
}
export interface WarmupUnsubscribedPayload {
    key: string;
    isBatched: boolean;
    reason: string;
}
export interface WarmupStoppedPayload {
    keys: string[];
    isBatched: boolean;
}
interface WarmupSubscriptionTimeoutResetPayload {
    key: string;
}
interface WarmupJoinGroupPayload {
    parent: string;
    childLastSeenById: {
        [childKey: string]: number;
    };
    batchablePropertyPath: BatchableProperty[];
}
interface WarmupLeaveGroupPayload {
    parent: string;
    childLastSeenById: {
        [childKey: string]: number;
    };
    batchablePropertyPath: BatchableProperty[];
}
export declare const warmupSubscribed: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupSubscribedPayload, string>;
export declare const warmupSubscribedMultiple: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupSubscribedMultiplePayload, string>;
export declare const warmupSubscriptionTimeoutReset: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupSubscriptionTimeoutResetPayload, string>;
export declare const warmupUnsubscribed: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupUnsubscribedPayload, string>;
export declare const warmupStopped: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupStoppedPayload, string>;
export declare const warmupJoinGroup: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupJoinGroupPayload, string>;
export declare const warmupLeaveGroup: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupLeaveGroupPayload, string>;
export declare const warmupShutdown: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"WARMUP/SHUTDOWN">;
interface WarmupRequestedPayload {
    /**
     * State lookup key so that the warmup handler can find the slice of data it needs
     * to warmup the cold EA
     */
    key: string;
}
interface WarmupFulfilledPayload {
    /**
     * State lookup key
     */
    key: string;
}
interface WarmupFailedPayload {
    /**
     * State lookup key
     */
    feedLabel: string;
    key: string;
    error: Error;
}
/**
 * These set of events are emitted when our warmup handler requests the EA itself to warm up
 * the cache for a particular key
 */
export declare const warmupRequested: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupRequestedPayload, string>;
export declare const warmupFulfilled: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupFulfilledPayload, string>;
export declare const warmupFailed: import("@reduxjs/toolkit").ActionCreatorWithPayload<WarmupFailedPayload, string>;
export {};
//# sourceMappingURL=actions.d.ts.map