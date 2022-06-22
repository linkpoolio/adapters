import { MakeWSHandler, Middleware } from '@chainlink/types';
import { Store } from 'redux';
import { RootState } from './reducer';
export * as actions from './actions';
export * as config from './config';
export * as epics from './epics';
export * as recorder from './recorder';
export * as reducer from './reducer';
export * as types from './types';
export declare const withWebSockets: (store: Store<RootState>, makeWsHandler?: MakeWSHandler | undefined) => Middleware;
//# sourceMappingURL=index.d.ts.map