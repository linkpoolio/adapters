import { AdapterContext, AdapterRequest } from '@chainlink/types';
/**
 * Generate a key for the WS middleware
 *
 * NOTE:
 * Exclude mode is enforced because the data given to the WS framework
 * is not an Adapter Request, but a subscription message.
 *
 * (e.g. Cryptocompare)
 * { action: 'SubAdd', subs: [ '5~CCCAGG~BTC~USD' ] }
 *
 * The structure of which may change with every adapter, so we need to
 * use exclude mode to handle dynamically changing properties.
 */
export declare const getSubsId: (subscriptionMsg: AdapterRequest) => string;
export interface ConnectionsState {
    total: number;
    all: {
        [key: string]: {
            shouldNotRetryConnecting?: boolean;
            active: boolean;
            connecting: number;
            wasEverConnected?: boolean;
            connectionParams?: {
                [T: string]: string;
            };
            requestId: number;
            isOnConnectChainComplete: boolean;
        };
    };
}
export declare const connectionsReducer: import("redux").Reducer<ConnectionsState, import("redux").AnyAction>;
export interface SubscriptionsState {
    /** Map of all subscriptions by key */
    total: number;
    all: {
        [key: string]: {
            active: boolean;
            wasEverActive?: boolean;
            unsubscribed?: boolean;
            subscribing: number;
            input: AdapterRequest;
            context: AdapterContext;
            subscriptionParams?: any;
            connectionKey: string;
            shouldNotRetry?: boolean;
            lastUpdatedAt?: number;
        };
    };
}
export declare const subscriptionsReducer: import("redux").Reducer<SubscriptionsState, import("redux").AnyAction>;
export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    connections: ConnectionsState;
    subscriptions: SubscriptionsState;
}>, import("redux").AnyAction>;
export declare type RootState = ReturnType<typeof rootReducer>;
//# sourceMappingURL=reducer.d.ts.map