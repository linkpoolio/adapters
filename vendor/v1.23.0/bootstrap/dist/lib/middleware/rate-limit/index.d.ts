import { AdapterRequest, Middleware } from '@chainlink/types';
import { Store } from 'redux';
import { Config } from './config';
import { Heartbeats, IntervalNames, RootState } from './reducer';
export * as actions from './actions';
export * as reducer from './reducer';
/**
 * Calculates how much capacity a participant deserves based on its weight on the adapter
 * @param state Redux Heartbeats state
 * @param interval Time window size to get heartbeats
 * @param id Participant ID to get participants heartbeats
 */
export declare const computeThroughput: (config: Config, state: Heartbeats, interval: IntervalNames, id: string) => number;
/**
 * [LEGACY] Returns hash of the input request payload excluding some volatile paths
 *
 * @param request payload
 */
export declare const makeId: (request: AdapterRequest) => string;
/**
 * Calculate maxAge to keep the item cached so we allow the specified throughput.
 *
 * @param throughput number of allowed requests in interval
 * @param interval time window in ms
 */
export declare const maxAgeFor: (throughput: number, interval: number) => number;
export declare const withRateLimit: (store: Store<RootState>) => Middleware;
//# sourceMappingURL=index.d.ts.map