import { AdapterContext, Execute, Middleware } from '@chainlink/types';
import { FastifyInstance } from 'fastify';
export declare const HEADER_CONTENT_TYPE = "Content-Type";
export declare const CONTENT_TYPE_APPLICATION_JSON = "application/json";
export declare const CONTENT_TYPE_TEXT_PLAIN = "text/plain";
export declare const initHandler: (adapterContext: AdapterContext, execute: Execute, middleware: Middleware[]) => () => Promise<FastifyInstance>;
//# sourceMappingURL=server.d.ts.map