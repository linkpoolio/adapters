import { AdapterErrorResponse } from '@chainlink/types';
export declare class AdapterError extends Error {
    jobRunID: string;
    status: string;
    statusCode: number;
    name: string;
    message: string;
    cause: any;
    url?: string;
    errorResponse: any;
    feedID?: string;
    providerStatusCode?: number;
    constructor({ jobRunID, status, statusCode, name, message, cause, url, errorResponse, feedID, providerStatusCode, }: Partial<AdapterError>);
    toJSONResponse(): AdapterErrorResponse;
}
//# sourceMappingURL=error.d.ts.map