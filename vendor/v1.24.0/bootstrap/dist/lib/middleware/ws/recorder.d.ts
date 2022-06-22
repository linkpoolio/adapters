import WebSocket from 'ws';
interface WsMessage {
    type: 'sent' | 'received';
    data: unknown;
}
export declare class WsMessageRecorder {
    private static messages;
    static add(message: WsMessage): void;
    static print(): void;
}
declare type WebSocketClass = new (url: string, protocols?: string | string[] | undefined) => WebSocket;
export declare class WebSocketClassProvider {
    static ctor: WebSocketClass;
    static set(ctor: WebSocketClass): void;
    static get(): WebSocketClass;
}
export {};
//# sourceMappingURL=recorder.d.ts.map