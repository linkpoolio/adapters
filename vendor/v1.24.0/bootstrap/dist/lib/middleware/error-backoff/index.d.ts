import { Middleware } from '@chainlink/types';
import { Store } from 'redux';
import { RequestsState } from './reducer';
export * as actions from './actions';
export * as reducer from './reducer';
export declare const withErrorBackoff: (store?: Store<import("redux").CombinedState<{
    requests: RequestsState;
}>, import("redux").AnyAction> | undefined) => Middleware;
//# sourceMappingURL=index.d.ts.map