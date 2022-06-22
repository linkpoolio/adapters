import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { RootState } from './reducer';
export declare const subscribeReadyEpic: Epic<AnyAction, AnyAction, {
    ws: RootState;
}, any>;
export declare const connectEpic: Epic<AnyAction, AnyAction, {
    ws: RootState;
}, any>;
export declare const recordErrorEpic: Epic<AnyAction, AnyAction, {
    ws: RootState;
}, any>;
export declare const writeMessageToCacheEpic: Epic<AnyAction, AnyAction, {
    ws: RootState;
}, any>;
export declare const metricsEpic: Epic<AnyAction, AnyAction, any, any>;
export declare const rootEpic: any;
export declare const epicMiddleware: import("redux-observable").EpicMiddleware<import("redux").Action<any>, import("redux").Action<any>, void, any>;
//# sourceMappingURL=epics.d.ts.map