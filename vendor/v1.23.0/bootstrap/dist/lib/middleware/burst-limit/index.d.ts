import { Middleware } from '@chainlink/types';
import { Store } from 'redux';
import { RequestsState } from './reducer';
export * as actions from './actions';
export * as reducer from './reducer';
export declare const SECOND_LIMIT_RETRIES = 10;
export declare const MINUTE_LIMIT_WARMER_BUFFER = 0.9;
export declare const withBurstLimit: (store?: Store<import("redux").CombinedState<{
    requests: RequestsState;
}>, import("redux").AnyAction> | undefined) => Middleware;
//# sourceMappingURL=index.d.ts.map