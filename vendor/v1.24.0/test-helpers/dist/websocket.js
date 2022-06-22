"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockWebSocketFlow = exports.MockWsServer = exports.mockWebSocketServer = exports.mockWebSocketProvider = void 0;
const mock_socket_1 = require("mock-socket");
/**
 * Sets the mocked websocket instance in the provided provider class.
 * We need this here, because the tests will connect using their instance of WebSocketClassProvider;
 * fetching from this library to the @chainlink/ea-bootstrap package would access _another_ instance
 * of the same constructor. Although it should be a singleton, dependencies are different so that
 * means that the static classes themselves are also different.
 *
 * @param provider singleton WebSocketClassProvider
 */
const mockWebSocketProvider = (provider) => {
    // Extend mock WebSocket class to bypass protocol headers error
    class MockWebSocket extends mock_socket_1.WebSocket {
        constructor(url, protocol) {
            super(url, protocol instanceof Object ? undefined : protocol);
        }
    }
    // Need to disable typing, the mock-socket impl does not implement the ws interface fully
    provider.set(MockWebSocket); // eslint-disable-line @typescript-eslint/no-explicit-any
};
exports.mockWebSocketProvider = mockWebSocketProvider;
const mockWebSocketServer = (url) => {
    return new mock_socket_1.Server(url, { mock: false });
};
exports.mockWebSocketServer = mockWebSocketServer;
// Export this here so adapter packages don't have to add the mock library themselves.
// Note: Types aren't working properly, due to the object-like export in this package's index
exports.MockWsServer = mock_socket_1.Server;
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
const mockWebSocketFlow = async (server, flow, options = {
    enforceSequence: true,
    errorOnUnexpectedMessage: true,
}) => {
    return new Promise((resolve) => {
        const buildPayload = (msg) => (typeof msg === 'string' ? msg : JSON.stringify(msg));
        // Parse requests beforehand to avoid stringifying all exchanges on every incoming ws message
        const parsedFlow = flow.map((exchange) => ({
            ...exchange,
            expected: buildPayload(exchange.request),
        }));
        server.on('connection', async (connection) => {
            // Handler to send the response (or responses) back to the client
            const sendResponse = (response, nested = false) => {
                if (!nested && Array.isArray(response) && response.length > 0) {
                    response.forEach((r) => sendResponse(r, true));
                }
                else {
                    connection.send(buildPayload(response));
                }
            };
            connection.on('message', (received) => {
                let exchange;
                if (parsedFlow.length === 0 && options.errorOnUnexpectedMessage) {
                    throw Error(`Unexpected WS message, received: '${received}'`);
                }
                if (options.enforceSequence) {
                    // If the sequence is enforced, get first item from the flow of exchanges
                    exchange = parsedFlow[0];
                    if (exchange.expected !== received) {
                        if (options.errorOnUnexpectedMessage) {
                            throw Error(`The WS message received does not match the expected one.
                 Expected: '${exchange.expected}'
                 Received: '${received}'`);
                        }
                        else {
                            return;
                        }
                    }
                    // Message received matches expected request, remove exchange from the list
                    parsedFlow.shift();
                }
                else {
                    // If the sequence is not enforced, try to find the received msg within the list of expected exchanges
                    const i = parsedFlow.findIndex((exchange) => exchange.expected === received);
                    if (i === -1) {
                        if (options.errorOnUnexpectedMessage) {
                            throw Error(`Unexpected WS message, received: '${received}'`);
                        }
                        else {
                            return;
                        }
                    }
                    // Message received matches expected request, remove exchange from the list
                    exchange = parsedFlow.splice(i, 1)[0];
                }
                sendResponse(exchange.response);
                if (parsedFlow.length === 0) {
                    resolve(true);
                }
            });
        });
    });
};
exports.mockWebSocketFlow = mockWebSocketFlow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dlYnNvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBK0M7QUFFL0M7Ozs7Ozs7O0dBUUc7QUFDSSxNQUFNLHFCQUFxQixHQUFHLENBQUMsUUFBdUMsRUFBUSxFQUFFO0lBQ3JGLCtEQUErRDtJQUMvRCxNQUFNLGFBQWMsU0FBUSx1QkFBUztRQUNuQyxZQUFZLEdBQVcsRUFBRSxRQUFnRTtZQUN2RixLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVEsWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDL0QsQ0FBQztLQUNGO0lBRUQseUZBQXlGO0lBQ3pGLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBb0IsQ0FBQyxDQUFBLENBQUMseURBQXlEO0FBQzlGLENBQUMsQ0FBQTtBQVZZLFFBQUEscUJBQXFCLHlCQVVqQztBQUVNLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRTtJQUN6RCxPQUFPLElBQUksb0JBQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUE7QUFGWSxRQUFBLG1CQUFtQix1QkFFL0I7QUFXRCxzRkFBc0Y7QUFDdEYsNkZBQTZGO0FBQ2hGLFFBQUEsWUFBWSxHQUFHLG9CQUFNLENBQUE7QUFFbEM7Ozs7Ozs7OztHQVNHO0FBQ0ksTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLE1BQWMsRUFDZCxJQUF5QixFQUN6QixPQUFPLEdBQUc7SUFDUixlQUFlLEVBQUUsSUFBSTtJQUNyQix3QkFBd0IsRUFBRSxJQUFJO0NBQy9CLEVBQ2lCLEVBQUU7SUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzdCLE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBWSxFQUFF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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2ViU29ja2V0Q2xhc3NQcm92aWRlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwL3NyYy9saWIvbWlkZGxld2FyZS93cy9yZWNvcmRlcidcbmltcG9ydCB7IFNlcnZlciwgV2ViU29ja2V0IH0gZnJvbSAnbW9jay1zb2NrZXQnXG5cbi8qKlxuICogU2V0cyB0aGUgbW9ja2VkIHdlYnNvY2tldCBpbnN0YW5jZSBpbiB0aGUgcHJvdmlkZWQgcHJvdmlkZXIgY2xhc3MuXG4gKiBXZSBuZWVkIHRoaXMgaGVyZSwgYmVjYXVzZSB0aGUgdGVzdHMgd2lsbCBjb25uZWN0IHVzaW5nIHRoZWlyIGluc3RhbmNlIG9mIFdlYlNvY2tldENsYXNzUHJvdmlkZXI7XG4gKiBmZXRjaGluZyBmcm9tIHRoaXMgbGlicmFyeSB0byB0aGUgQGNoYWlubGluay9lYS1ib290c3RyYXAgcGFja2FnZSB3b3VsZCBhY2Nlc3MgX2Fub3RoZXJfIGluc3RhbmNlXG4gKiBvZiB0aGUgc2FtZSBjb25zdHJ1Y3Rvci4gQWx0aG91Z2ggaXQgc2hvdWxkIGJlIGEgc2luZ2xldG9uLCBkZXBlbmRlbmNpZXMgYXJlIGRpZmZlcmVudCBzbyB0aGF0XG4gKiBtZWFucyB0aGF0IHRoZSBzdGF0aWMgY2xhc3NlcyB0aGVtc2VsdmVzIGFyZSBhbHNvIGRpZmZlcmVudC5cbiAqXG4gKiBAcGFyYW0gcHJvdmlkZXIgc2luZ2xldG9uIFdlYlNvY2tldENsYXNzUHJvdmlkZXJcbiAqL1xuZXhwb3J0IGNvbnN0IG1vY2tXZWJTb2NrZXRQcm92aWRlciA9IChwcm92aWRlcjogdHlwZW9mIFdlYlNvY2tldENsYXNzUHJvdmlkZXIpOiB2b2lkID0+IHtcbiAgLy8gRXh0ZW5kIG1vY2sgV2ViU29ja2V0IGNsYXNzIHRvIGJ5cGFzcyBwcm90b2NvbCBoZWFkZXJzIGVycm9yXG4gIGNsYXNzIE1vY2tXZWJTb2NrZXQgZXh0ZW5kcyBXZWJTb2NrZXQge1xuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCBwcm90b2NvbDogc3RyaW5nIHwgc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgdW5kZWZpbmVkKSB7XG4gICAgICBzdXBlcih1cmwsIHByb3RvY29sIGluc3RhbmNlb2YgT2JqZWN0ID8gdW5kZWZpbmVkIDogcHJvdG9jb2wpXG4gICAgfVxuICB9XG5cbiAgLy8gTmVlZCB0byBkaXNhYmxlIHR5cGluZywgdGhlIG1vY2stc29ja2V0IGltcGwgZG9lcyBub3QgaW1wbGVtZW50IHRoZSB3cyBpbnRlcmZhY2UgZnVsbHlcbiAgcHJvdmlkZXIuc2V0KE1vY2tXZWJTb2NrZXQgYXMgYW55KSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbn1cblxuZXhwb3J0IGNvbnN0IG1vY2tXZWJTb2NrZXRTZXJ2ZXIgPSAodXJsOiBzdHJpbmcpOiBTZXJ2ZXIgPT4ge1xuICByZXR1cm4gbmV3IFNlcnZlcih1cmwsIHsgbW9jazogZmFsc2UgfSlcbn1cblxuZXhwb3J0IHR5cGUgV3NNZXNzYWdlRXhjaGFuZ2UgPSB7XG4gIHJlcXVlc3Q6IHVua25vd25cbiAgcmVzcG9uc2U6IHVua25vd25cbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkV3NNZXNzYWdlRXhjaGFuZ2UgPSBXc01lc3NhZ2VFeGNoYW5nZSAmIHtcbiAgZXhwZWN0ZWQ6IHN0cmluZ1xufVxuXG4vLyBFeHBvcnQgdGhpcyBoZXJlIHNvIGFkYXB0ZXIgcGFja2FnZXMgZG9uJ3QgaGF2ZSB0byBhZGQgdGhlIG1vY2sgbGlicmFyeSB0aGVtc2VsdmVzLlxuLy8gTm90ZTogVHlwZXMgYXJlbid0IHdvcmtpbmcgcHJvcGVybHksIGR1ZSB0byB0aGUgb2JqZWN0LWxpa2UgZXhwb3J0IGluIHRoaXMgcGFja2FnZSdzIGluZGV4XG5leHBvcnQgY29uc3QgTW9ja1dzU2VydmVyID0gU2VydmVyXG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGFkZCBsaXN0ZW5lcnMgZm9yIG1lc3NhZ2VzIG9uIHRoZSBtb2NrZWQgc2VydmVyLCBjaGVja2luZyBpZiB0aGV5IG1hdGNoIG9uZVxuICogb2YgdGhlIGV4cGVjdGVkIG1lc3NhZ2VzIGFuZCByZXBseWluZyB3aXRoIHRoZSBwcm92aWRlZCByZXNwb25zZXMuIEl0IGRvZXMgbm90IGVuZm9yY2UgdGhlIHNlcXVlbmNlXG4gKiBwcm92aWRlZCwgb25seSB0aGF0IGFsbCBleGNoYW5nZXMgaGFwcGVuIGF0IHNvbWUgcG9pbnQuXG4gKlxuICogQHBhcmFtIHNlcnZlciB0aGUgbW9ja2VkIFdTIHNlcnZlclxuICogQHBhcmFtIGZsb3cgYW4gYXJyYXkgb2YgbWVzc2FnZSBleGNoYW5nZXNcbiAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgdG8gZW5mb3JjZSBzZXF1ZW5jZSBhbmQgZXJyb3Igb24gdW5leHBlY3RlZCBtZXNzYWdlc1xuICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgZXhjaGFuZ2VzIGhhdmUgZXhlY3V0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IG1vY2tXZWJTb2NrZXRGbG93ID0gYXN5bmMgKFxuICBzZXJ2ZXI6IFNlcnZlcixcbiAgZmxvdzogV3NNZXNzYWdlRXhjaGFuZ2VbXSxcbiAgb3B0aW9ucyA9IHtcbiAgICBlbmZvcmNlU2VxdWVuY2U6IHRydWUsXG4gICAgZXJyb3JPblVuZXhwZWN0ZWRNZXNzYWdlOiB0cnVlLFxuICB9LFxuKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGJ1aWxkUGF5bG9hZCA9IChtc2c6IHVua25vd24pID0+ICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJyA/IG1zZyA6IEpTT04uc3RyaW5naWZ5KG1zZykpXG5cbiAgICAvLyBQYXJzZSByZXF1ZXN0cyBiZWZvcmVoYW5kIHRvIGF2b2lkIHN0cmluZ2lmeWluZyBhbGwgZXhjaGFuZ2VzIG9uIGV2ZXJ5IGluY29taW5nIHdzIG1lc3NhZ2VcbiAgICBjb25zdCBwYXJzZWRGbG93OiBQYXJzZWRXc01lc3NhZ2VFeGNoYW5nZVtdID0gZmxvdy5tYXAoKGV4Y2hhbmdlKSA9PiAoe1xuICAgICAgLi4uZXhjaGFuZ2UsXG4gICAgICBleHBlY3RlZDogYnVpbGRQYXlsb2FkKGV4Y2hhbmdlLnJlcXVlc3QpLFxuICAgIH0pKVxuXG4gICAgc2VydmVyLm9uKCdjb25uZWN0aW9uJywgYXN5bmMgKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgIC8vIEhhbmRsZXIgdG8gc2VuZCB0aGUgcmVzcG9uc2UgKG9yIHJlc3BvbnNlcykgYmFjayB0byB0aGUgY2xpZW50XG4gICAgICBjb25zdCBzZW5kUmVzcG9uc2UgPSAocmVzcG9uc2U6IHVua25vd24sIG5lc3RlZCA9IGZhbHNlKSA9PiB7XG4gICAgICAgIGlmICghbmVzdGVkICYmIEFycmF5LmlzQXJyYXkocmVzcG9uc2UpICYmIHJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXNwb25zZS5mb3JFYWNoKChyKSA9PiBzZW5kUmVzcG9uc2UociwgdHJ1ZSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29ubmVjdGlvbi5zZW5kKGJ1aWxkUGF5bG9hZChyZXNwb25zZSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29ubmVjdGlvbi5vbignbWVzc2FnZScsIChyZWNlaXZlZCkgPT4ge1xuICAgICAgICBsZXQgZXhjaGFuZ2VcblxuICAgICAgICBpZiAocGFyc2VkRmxvdy5sZW5ndGggPT09IDAgJiYgb3B0aW9ucy5lcnJvck9uVW5leHBlY3RlZE1lc3NhZ2UpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihgVW5leHBlY3RlZCBXUyBtZXNzYWdlLCByZWNlaXZlZDogJyR7cmVjZWl2ZWR9J2ApXG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5lbmZvcmNlU2VxdWVuY2UpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgc2VxdWVuY2UgaXMgZW5mb3JjZWQsIGdldCBmaXJzdCBpdGVtIGZyb20gdGhlIGZsb3cgb2YgZXhjaGFuZ2VzXG4gICAgICAgICAgZXhjaGFuZ2UgPSBwYXJzZWRGbG93WzBdIGFzIFBhcnNlZFdzTWVzc2FnZUV4Y2hhbmdlXG5cbiAgICAgICAgICBpZiAoZXhjaGFuZ2UuZXhwZWN0ZWQgIT09IHJlY2VpdmVkKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lcnJvck9uVW5leHBlY3RlZE1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYFRoZSBXUyBtZXNzYWdlIHJlY2VpdmVkIGRvZXMgbm90IG1hdGNoIHRoZSBleHBlY3RlZCBvbmUuXG4gICAgICAgICAgICAgICAgIEV4cGVjdGVkOiAnJHtleGNoYW5nZS5leHBlY3RlZH0nXG4gICAgICAgICAgICAgICAgIFJlY2VpdmVkOiAnJHtyZWNlaXZlZH0nYCxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTWVzc2FnZSByZWNlaXZlZCBtYXRjaGVzIGV4cGVjdGVkIHJlcXVlc3QsIHJlbW92ZSBleGNoYW5nZSBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgcGFyc2VkRmxvdy5zaGlmdCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgdGhlIHNlcXVlbmNlIGlzIG5vdCBlbmZvcmNlZCwgdHJ5IHRvIGZpbmQgdGhlIHJlY2VpdmVkIG1zZyB3aXRoaW4gdGhlIGxpc3Qgb2YgZXhwZWN0ZWQgZXhjaGFuZ2VzXG4gICAgICAgICAgY29uc3QgaSA9IHBhcnNlZEZsb3cuZmluZEluZGV4KChleGNoYW5nZSkgPT4gZXhjaGFuZ2UuZXhwZWN0ZWQgPT09IHJlY2VpdmVkKVxuXG4gICAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lcnJvck9uVW5leHBlY3RlZE1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFVuZXhwZWN0ZWQgV1MgbWVzc2FnZSwgcmVjZWl2ZWQ6ICcke3JlY2VpdmVkfSdgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTWVzc2FnZSByZWNlaXZlZCBtYXRjaGVzIGV4cGVjdGVkIHJlcXVlc3QsIHJlbW92ZSBleGNoYW5nZSBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgZXhjaGFuZ2UgPSBwYXJzZWRGbG93LnNwbGljZShpLCAxKVswXVxuICAgICAgICB9XG5cbiAgICAgICAgc2VuZFJlc3BvbnNlKGV4Y2hhbmdlLnJlc3BvbnNlKVxuXG4gICAgICAgIGlmIChwYXJzZWRGbG93Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuIl19