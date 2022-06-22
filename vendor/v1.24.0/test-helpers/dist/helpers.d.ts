import { Execute } from '@chainlink/types';
export declare function assertError(statusCode: any, data: any, expectedJobId: any): void;
export declare function assertSuccess(statusCode: any, data: any, expectedJobId: any): void;
export declare function successes(requests: any[], execute: Execute, assertions?: any): void;
export declare function validationErrors(requests: any[], execute: Execute): void;
export declare function serverErrors(requests: any[], execute: Execute): void;
//# sourceMappingURL=helpers.d.ts.map