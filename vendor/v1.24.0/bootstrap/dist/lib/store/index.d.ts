import { AnyAction, Dispatch, Middleware, PreloadedState, Reducer, Store } from 'redux';
export declare const asAction: <T>() => (p: T) => {
    payload: ActionBase & T;
};
export declare const toActionPayload: <T>(data: T) => ActionBase & T;
export interface ActionBase {
    id: string;
    createdAt: string;
}
export declare function configureStore(rootReducer: Reducer, preloadedState?: PreloadedState<any>, middleware?: Middleware<unknown, any, Dispatch<AnyAction>>[]): Store;
//# sourceMappingURL=index.d.ts.map