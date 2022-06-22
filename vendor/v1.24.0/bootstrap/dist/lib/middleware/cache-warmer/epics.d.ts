import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { RootState } from '../../..';
import { Config } from './config';
export interface EpicDependencies {
    config: Config;
}
export declare const executeHandler: Epic<AnyAction, AnyAction, RootState, EpicDependencies>;
export declare const warmupSubscriber: Epic<AnyAction, AnyAction, any, EpicDependencies>;
/**
 * Handle warmup response request events
 */
export declare const warmupRequestHandler: Epic<AnyAction, AnyAction, any>;
export declare const warmupUnsubscriber: Epic<AnyAction, AnyAction, any, EpicDependencies>;
export declare const rootEpic: any;
export declare const epicMiddleware: import("redux-observable").EpicMiddleware<any, any, any, EpicDependencies>;
//# sourceMappingURL=epics.d.ts.map