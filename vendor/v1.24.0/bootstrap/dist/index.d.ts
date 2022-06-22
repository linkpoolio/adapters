import { AdapterRequest, AdapterContext, Execute, ExecuteSync, MakeWSHandler, Middleware, APIEndpoint, Config } from '@chainlink/types';
import { Store } from 'redux';
import { Cache } from './lib/middleware/cache';
import * as cacheWarmer from './lib/middleware/cache-warmer';
import { AdapterError, logger as Logger, Requester, Validator, Overrider, Builder } from './lib/modules';
import * as RateLimit from './lib/middleware/rate-limit';
import * as burstLimit from './lib/middleware/burst-limit';
import * as ErrorBackoff from './lib/middleware/error-backoff';
import * as CacheKey from './lib/middleware/cache-key';
import * as server from './lib/server';
import * as util from './lib/util';
import * as ws from './lib/middleware/ws';
import { FastifyInstance } from 'fastify';
declare const REDUX_MIDDLEWARE: readonly ["burstLimit", "cacheWarmer", "errorBackoff", "rateLimit", "ws"];
declare type ReduxMiddleware = typeof REDUX_MIDDLEWARE[number];
declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    errorBackoff: import("redux").CombinedState<{
        requests: ErrorBackoff.reducer.RequestsState;
    }>;
    burstLimit: import("redux").CombinedState<{
        requests: burstLimit.reducer.RequestsState;
    }>;
    cacheWarmer: import("redux").CombinedState<{
        subscriptions: cacheWarmer.reducer.SubscriptionState;
        warmups: cacheWarmer.reducer.RequestState;
    }>;
    rateLimit: import("redux").CombinedState<{
        heartbeats: RateLimit.reducer.Heartbeats;
    }>;
    ws: import("redux").CombinedState<{
        connections: ws.reducer.ConnectionsState;
        subscriptions: ws.reducer.SubscriptionsState;
    }>;
}>, import("redux").AnyAction>;
export declare type RootState = ReturnType<typeof rootReducer>;
export declare const store: Store<any, import("redux").AnyAction>;
export declare const storeSlice: (slice: ReduxMiddleware) => Store;
export declare const makeMiddleware: <C extends Config>(execute: Execute, makeWsHandler?: MakeWSHandler | undefined, endpointSelector?: ((request: AdapterRequest) => APIEndpoint<C>) | undefined) => Middleware[];
export declare const withMiddleware: (execute: Execute, context: AdapterContext, middleware: Middleware[]) => Promise<Execute>;
export declare const executeSync: ExecuteSync;
export declare type ExternalAdapter = {
    execute: Execute;
    makeWsHandler?: MakeWSHandler;
    endpointSelector?: (request: AdapterRequest) => APIEndpoint;
};
export declare type ExecuteHandler = {
    server: () => Promise<FastifyInstance>;
};
export declare const expose: <C extends Config>(context: AdapterContext, execute: Execute, makeWsHandler?: MakeWSHandler | undefined, endpointSelector?: ((request: AdapterRequest) => APIEndpoint<C>) | undefined) => ExecuteHandler;
export { Requester, Validator, Overrider, CacheKey, AdapterError, Builder, Logger, util, server, Cache, RateLimit, FastifyInstance, };
//# sourceMappingURL=index.d.ts.map