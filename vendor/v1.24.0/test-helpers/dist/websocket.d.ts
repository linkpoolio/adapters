import { WebSocketClassProvider } from '@chainlink/ea-bootstrap/src/lib/middleware/ws/recorder';
import { Server } from 'mock-socket';
/**
 * Sets the mocked websocket instance in the provided provider class.
 * We need this here, because the tests will connect using their instance of WebSocketClassProvider;
 * fetching from this library to the @chainlink/ea-bootstrap package would access _another_ instance
 * of the same constructor. Although it should be a singleton, dependencies are different so that
 * means that the static classes themselves are also different.
 *
 * @param provider singleton WebSocketClassProvider
 */
export declare const mockWebSocketProvider: (provider: typeof WebSocketClassProvider) => void;
export declare const mockWebSocketServer: (url: string) => Server;
export declare type WsMessageExchange = {
    request: unknown;
    response: unknown;
};
export declare type ParsedWsMessageExchange = WsMessageExchange & {
    expected: string;
};
export declare const MockWsServer: typeof Server;
/**
 * This function will add listeners for messages on the mocked server, checking if they match one
 * of the expected messages and replying with the provided responses. It does not enforce the sequence
 * provided, only that all exchanges happen at some point.
 *
 * @param server the mocked WS server
 * @param flow an array of message exchanges
 * @param options options to enforce sequence and error on unexpected messages
 * @returns a promise that resolves when all exchanges have executed
 */
export declare const mockWebSocketFlow: (server: Server, flow: WsMessageExchange[], options?: {
    enforceSequence: boolean;
    errorOnUnexpectedMessage: boolean;
}) => Promise<boolean>;
//# sourceMappingURL=websocket.d.ts.map