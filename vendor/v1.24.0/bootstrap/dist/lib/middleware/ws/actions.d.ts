import { AdapterContext, AdapterRequest, WSHandler } from '@chainlink/types';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WSConfig, WSConnectionInfo } from './types';
/** CONNECTIONS */
export interface WSConfigPayload {
    config: WSConfig;
    wsHandler: WSHandler;
}
export interface WSConnectFulfilledPayload extends WSConfigPayload {
    connectionInfo: WSConnectionInfo;
}
export interface WSConfigDetailedPayload extends WSConfigPayload {
    request: AdapterRequest;
    context: AdapterContext;
    wsHandler: WSHandler;
}
export interface WSConfigDetailedPayloadOverride extends WSConfigDetailedPayload {
    wsHandler: WSHandlerOverride;
}
export interface WSErrorPayload {
    connectionInfo: WSConnectionInfo;
    reason: string;
}
export interface WSSaveFirstMessagePayload {
    subscriptionKey: string;
    message: any;
}
export interface WSUpdateSubscriptionInputPayload {
    subscriptionKey: string;
    input: AdapterRequest;
}
export interface WSRunOnConnectFunctions {
    wsHandler: WSHandler;
    wsSubject: WebSocketSubject<any>;
    input: AdapterRequest;
}
export interface WSSaveMessageToConnection {
    connectionKey: string;
    message: any;
}
export declare const runOnConnectFunctions: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSRunOnConnectFunctions], import("../../store").ActionBase & WSRunOnConnectFunctions, "WS/RUN_ON_CONNECT_FUNCTIONS", never, never>;
export declare const updateSubscriptionInput: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSUpdateSubscriptionInputPayload], import("../../store").ActionBase & WSUpdateSubscriptionInputPayload, "WS/UPDATE_SUBSRCRIPTION_INPUT", never, never>;
export declare const saveFirstMessageReceived: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSSaveFirstMessagePayload], import("../../store").ActionBase & WSSaveFirstMessagePayload, "WS/SAVE_FIRST_MESSAGE_RECEIVED", never, never>;
export declare const wsSubscriptionReady: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSConfigDetailedPayloadOverride], import("../../store").ActionBase & WSConfigDetailedPayloadOverride, "WS/SUBSCRIPTION_READY", never, never>;
export declare const connectRequested: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSConfigDetailedPayload], import("../../store").ActionBase & WSConfigDetailedPayload, "WS/CONNECT_REQUESTED", never, never>;
export declare const connectFulfilled: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSConnectFulfilledPayload], import("../../store").ActionBase & WSConnectFulfilledPayload, "WS/CONNECT_FULFILLED", never, never>;
export declare const connectFailed: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSErrorPayload], import("../../store").ActionBase & WSErrorPayload, "WS/CONNECTION_FAILED", never, never>;
export declare const disconnectFulfilled: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSConfigPayload], import("../../store").ActionBase & WSConfigPayload, "WS/DISCONNECT_FULFILLED", never, never>;
export declare const disconnectRequested: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSConfigPayload], import("../../store").ActionBase & WSConfigPayload, "WS/DISCONNECT_REQUESTED", never, never>;
export declare const saveOnConnectMessage: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSSaveMessageToConnection], import("../../store").ActionBase & WSSaveMessageToConnection, "WS/SAVE_ON_CONNECT_MESSAGE", never, never>;
export declare const incrementOnConnectIdx: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: {
    key: string;
}], import("../../store").ActionBase & {
    key: string;
}, "WS/INCREMENT_ON_CONNECT_IDX", never, never>;
export declare const onConnectComplete: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSSubscriptionPayload], import("../../store").ActionBase & WSSubscriptionPayload, "WS/ON_CONNECT_COMPLETE", never, never>;
export declare const WSReset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"WS/RESET">;
/** SUBSCRIPTIONS */
export interface WSSubscriptionPayload {
    connectionInfo: WSConnectionInfo;
    subscriptionMsg: any;
    input: AdapterRequest;
    context: AdapterContext;
    messageToSave?: any;
    filterMultiplex?: (message: any) => boolean;
    shouldNeverUnsubscribe?: boolean;
}
export interface WSSubscriptionErrorPayload extends WSErrorPayload {
    subscriptionMsg?: any;
    input?: AdapterRequest;
    error?: unknown;
    wsHandler: WSHandlerOverride;
}
export interface WSSubscriptionErrorHandlerPayload {
    connectionInfo: WSConnectionInfo;
    input?: AdapterRequest;
    subscriptionMsg?: any;
    shouldNotRetrySubscription: boolean;
    shouldNotRetryConnection: boolean;
}
export declare const subscribeRequested: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSSubscriptionPayload], import("../../store").ActionBase & WSSubscriptionPayload, "WS/SUBSCRIBE_REQUESTED", never, never>;
export declare const subscribeFulfilled: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSSubscriptionPayload], import("../../store").ActionBase & WSSubscriptionPayload, "WS/SUBSCRIBE_FULFILLED", never, never>;
export declare const subscriptionError: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSSubscriptionErrorPayload], import("../../store").ActionBase & WSSubscriptionErrorPayload, "WS/SUBSCRIPTION_ERROR", never, never>;
export declare const subscriptionErrorHandler: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSSubscriptionErrorHandlerPayload], import("../../store").ActionBase & WSSubscriptionErrorHandlerPayload, "WS/SUBSCRIPTION_ERROR_HANDLER", never, never>;
export declare const unsubscribeRequested: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSSubscriptionPayload], import("../../store").ActionBase & WSSubscriptionPayload, "WS/UNSUBSCRIBE_REQUESTED", never, never>;
export declare const unsubscribeFulfilled: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSSubscriptionPayload], import("../../store").ActionBase & WSSubscriptionPayload, "WS/UNSUBSCRIBE_FULFILLED", never, never>;
/** MESSAGEs */
export interface WSMessagePayload {
    message: unknown;
    subscriptionKey: string;
    input: AdapterRequest;
    context: AdapterContext;
    connectionInfo: WSConnectionInfo;
    wsHandler: WSHandlerOverride;
    timestamp: number;
}
export declare const messageReceived: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[p: WSMessagePayload], import("../../store").ActionBase & WSMessagePayload, "WS/MESSAGE_RECEIVED", never, never>;
/** OVERRIDES */
export interface WSHandlerOverride extends WSHandler {
    connection: {
        url: string;
        protocol?: any;
    };
}
export interface WSConfigOverride extends WSConfigDetailedPayload {
    wsHandler: WSHandlerOverride;
}
//# sourceMappingURL=actions.d.ts.map