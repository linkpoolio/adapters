/// <reference types="mock-socket" />
/// <reference types="@chainlink/types" />
import * as behaviors from './behaviors';
import * as websocket from './websocket';
declare const _default: {
    mockWebSocketProvider: (provider: typeof import("@chainlink/ea-bootstrap/src/lib/middleware/ws/recorder").WebSocketClassProvider) => void;
    mockWebSocketServer: (url: string) => import("mock-socket").Server;
    MockWsServer: typeof import("mock-socket").Server;
    mockWebSocketFlow: (server: import("mock-socket").Server, flow: websocket.WsMessageExchange[], options?: {
        enforceSequence: boolean;
        errorOnUnexpectedMessage: boolean;
    }) => Promise<boolean>;
    TESTING_PRIVATE_KEY: string;
    startChain(port?: number): Promise<import("hardhat/internal/hardhat-network/jsonrpc/server").JsonRpcServer>;
    shouldBehaveLikeBalanceAdapter: typeof behaviors.shouldBehaveLikeBalanceAdapter;
    assertError(statusCode: any, data: any, expectedJobId: any): void;
    assertSuccess(statusCode: any, data: any, expectedJobId: any): void;
    successes(requests: any[], execute: import("@chainlink/types").Execute, assertions?: any): void;
    validationErrors(requests: any[], execute: import("@chainlink/types").Execute): void;
    serverErrors(requests: any[], execute: import("@chainlink/types").Execute): void;
};
export = _default;
//# sourceMappingURL=index.d.ts.map