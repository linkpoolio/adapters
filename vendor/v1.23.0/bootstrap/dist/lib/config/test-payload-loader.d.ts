import { AdapterRequestData } from '@chainlink/types';
/**
 * The test payload read in from filesystem
 */
export interface Payload {
    requests: AdapterRequestData[];
}
/**
 * Test payload with discriminated union so we can tell when we should just do
 * a simple liveness check rather than a sample request
 */
declare type TestPayload = (Payload & {
    isDefault: false;
}) | {
    isDefault: true;
};
/**
 * Load in a JSON file containing a test payload for the current adapter,
 * used in healthchecks to make sample requests
 */
export declare function loadTestPayload(): TestPayload;
export {};
//# sourceMappingURL=test-payload-loader.d.ts.map