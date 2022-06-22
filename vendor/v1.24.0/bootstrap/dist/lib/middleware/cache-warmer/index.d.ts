import { Execute, MakeWSHandler, Middleware } from '@chainlink/types';
import { Store } from 'redux';
import { RootState as WSState } from '../ws/reducer';
import { CacheWarmerState } from './reducer';
export * as actions from './actions';
export * as epics from './epics';
export * as reducer from './reducer';
interface WSInput {
    store: Store<WSState>;
    makeWSHandler?: MakeWSHandler;
}
export declare const withCacheWarmer: (warmerStore: Store<CacheWarmerState>, middleware: Middleware[], ws: WSInput) => (rawExecute: Execute) => Middleware;
//# sourceMappingURL=index.d.ts.map