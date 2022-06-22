"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ws_message_errors = exports.ws_message_total = exports.ws_subscription_errors = exports.ws_subscription_total = exports.ws_subscription_active = exports.ws_connection_retries = exports.ws_connection_errors = exports.ws_connection_active = void 0;
const tslib_1 = require("tslib");
const client = tslib_1.__importStar(require("prom-client"));
exports.ws_connection_active = new client.Gauge({
    name: 'ws_connection_active',
    help: 'The number of active connections',
    labelNames: ['key', 'url', 'experimental'],
});
exports.ws_connection_errors = new client.Counter({
    name: 'ws_connection_errors',
    help: 'The number of connection errors',
    labelNames: ['key', 'url', 'message', 'experimental'],
});
exports.ws_connection_retries = new client.Counter({
    name: 'ws_connection_retries',
    help: 'The number of connection retries',
    labelNames: ['key', 'url', 'experimental'],
});
exports.ws_subscription_active = new client.Gauge({
    name: 'ws_subscription_active',
    help: 'The number of active subscriptions',
    labelNames: [
        'connection_key',
        'connection_url',
        'feed_id',
        'subscription_key',
        'experimental',
    ],
});
exports.ws_subscription_total = new client.Counter({
    name: 'ws_subscription_total',
    help: 'The number of subscriptions opened in total',
    labelNames: [
        'connection_key',
        'connection_url',
        'feed_id',
        'subscription_key',
        'experimental',
    ],
});
exports.ws_subscription_errors = new client.Counter({
    name: 'ws_subscription_errors',
    help: 'The number of subscriptions errors',
    labelNames: [
        'connection_key',
        'connection_url',
        'feed_id',
        'subscription_key',
        'message',
        'experimental',
    ],
});
exports.ws_message_total = new client.Counter({
    name: 'ws_message_total',
    help: 'The number of messages received in total',
    labelNames: ['feed_id', 'subscription_key', 'experimental'],
});
// TODO: Message error action
exports.ws_message_errors = new client.Counter({
    name: 'ws_message_errors',
    help: 'The number of message errors received in total',
    labelNames: ['connection_key', 'connection_url', 'subscription_key', 'experimental'],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWlkZGxld2FyZS93cy9tZXRyaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0REFBcUM7QUFFeEIsUUFBQSxvQkFBb0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDbkQsSUFBSSxFQUFFLHNCQUFzQjtJQUM1QixJQUFJLEVBQUUsa0NBQWtDO0lBQ3hDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsY0FBYyxDQUFVO0NBQ3BELENBQUMsQ0FBQTtBQUVXLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3JELElBQUksRUFBRSxzQkFBc0I7SUFDNUIsSUFBSSxFQUFFLGlDQUFpQztJQUN2QyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQVU7Q0FDL0QsQ0FBQyxDQUFBO0FBRVcsUUFBQSxxQkFBcUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDdEQsSUFBSSxFQUFFLHVCQUF1QjtJQUM3QixJQUFJLEVBQUUsa0NBQWtDO0lBQ3hDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsY0FBYyxDQUFVO0NBQ3BELENBQUMsQ0FBQTtBQUVXLFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ3JELElBQUksRUFBRSx3QkFBd0I7SUFDOUIsSUFBSSxFQUFFLG9DQUFvQztJQUMxQyxVQUFVLEVBQUU7UUFDVixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLFNBQVM7UUFDVCxrQkFBa0I7UUFDbEIsY0FBYztLQUNOO0NBQ1gsQ0FBQyxDQUFBO0FBRVcsUUFBQSxxQkFBcUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDdEQsSUFBSSxFQUFFLHVCQUF1QjtJQUM3QixJQUFJLEVBQUUsNkNBQTZDO0lBQ25ELFVBQVUsRUFBRTtRQUNWLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsU0FBUztRQUNULGtCQUFrQjtRQUNsQixjQUFjO0tBQ047Q0FDWCxDQUFDLENBQUE7QUFFVyxRQUFBLHNCQUFzQixHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN2RCxJQUFJLEVBQUUsd0JBQXdCO0lBQzlCLElBQUksRUFBRSxvQ0FBb0M7SUFDMUMsVUFBVSxFQUFFO1FBQ1YsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixTQUFTO1FBQ1Qsa0JBQWtCO1FBQ2xCLFNBQVM7UUFDVCxjQUFjO0tBQ047Q0FDWCxDQUFDLENBQUE7QUFFVyxRQUFBLGdCQUFnQixHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqRCxJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLElBQUksRUFBRSwwQ0FBMEM7SUFDaEQsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsQ0FBVTtDQUNyRSxDQUFDLENBQUE7QUFFRiw2QkFBNkI7QUFDaEIsUUFBQSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbEQsSUFBSSxFQUFFLG1CQUFtQjtJQUN6QixJQUFJLEVBQUUsZ0RBQWdEO0lBQ3RELFVBQVUsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLGNBQWMsQ0FBVTtDQUM5RixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjbGllbnQgZnJvbSAncHJvbS1jbGllbnQnXG5cbmV4cG9ydCBjb25zdCB3c19jb25uZWN0aW9uX2FjdGl2ZSA9IG5ldyBjbGllbnQuR2F1Z2Uoe1xuICBuYW1lOiAnd3NfY29ubmVjdGlvbl9hY3RpdmUnLFxuICBoZWxwOiAnVGhlIG51bWJlciBvZiBhY3RpdmUgY29ubmVjdGlvbnMnLFxuICBsYWJlbE5hbWVzOiBbJ2tleScsICd1cmwnLCAnZXhwZXJpbWVudGFsJ10gYXMgY29uc3QsXG59KVxuXG5leHBvcnQgY29uc3Qgd3NfY29ubmVjdGlvbl9lcnJvcnMgPSBuZXcgY2xpZW50LkNvdW50ZXIoe1xuICBuYW1lOiAnd3NfY29ubmVjdGlvbl9lcnJvcnMnLFxuICBoZWxwOiAnVGhlIG51bWJlciBvZiBjb25uZWN0aW9uIGVycm9ycycsXG4gIGxhYmVsTmFtZXM6IFsna2V5JywgJ3VybCcsICdtZXNzYWdlJywgJ2V4cGVyaW1lbnRhbCddIGFzIGNvbnN0LFxufSlcblxuZXhwb3J0IGNvbnN0IHdzX2Nvbm5lY3Rpb25fcmV0cmllcyA9IG5ldyBjbGllbnQuQ291bnRlcih7XG4gIG5hbWU6ICd3c19jb25uZWN0aW9uX3JldHJpZXMnLFxuICBoZWxwOiAnVGhlIG51bWJlciBvZiBjb25uZWN0aW9uIHJldHJpZXMnLFxuICBsYWJlbE5hbWVzOiBbJ2tleScsICd1cmwnLCAnZXhwZXJpbWVudGFsJ10gYXMgY29uc3QsXG59KVxuXG5leHBvcnQgY29uc3Qgd3Nfc3Vic2NyaXB0aW9uX2FjdGl2ZSA9IG5ldyBjbGllbnQuR2F1Z2Uoe1xuICBuYW1lOiAnd3Nfc3Vic2NyaXB0aW9uX2FjdGl2ZScsXG4gIGhlbHA6ICdUaGUgbnVtYmVyIG9mIGFjdGl2ZSBzdWJzY3JpcHRpb25zJyxcbiAgbGFiZWxOYW1lczogW1xuICAgICdjb25uZWN0aW9uX2tleScsXG4gICAgJ2Nvbm5lY3Rpb25fdXJsJyxcbiAgICAnZmVlZF9pZCcsXG4gICAgJ3N1YnNjcmlwdGlvbl9rZXknLFxuICAgICdleHBlcmltZW50YWwnLFxuICBdIGFzIGNvbnN0LFxufSlcblxuZXhwb3J0IGNvbnN0IHdzX3N1YnNjcmlwdGlvbl90b3RhbCA9IG5ldyBjbGllbnQuQ291bnRlcih7XG4gIG5hbWU6ICd3c19zdWJzY3JpcHRpb25fdG90YWwnLFxuICBoZWxwOiAnVGhlIG51bWJlciBvZiBzdWJzY3JpcHRpb25zIG9wZW5lZCBpbiB0b3RhbCcsXG4gIGxhYmVsTmFtZXM6IFtcbiAgICAnY29ubmVjdGlvbl9rZXknLFxuICAgICdjb25uZWN0aW9uX3VybCcsXG4gICAgJ2ZlZWRfaWQnLFxuICAgICdzdWJzY3JpcHRpb25fa2V5JyxcbiAgICAnZXhwZXJpbWVudGFsJyxcbiAgXSBhcyBjb25zdCxcbn0pXG5cbmV4cG9ydCBjb25zdCB3c19zdWJzY3JpcHRpb25fZXJyb3JzID0gbmV3IGNsaWVudC5Db3VudGVyKHtcbiAgbmFtZTogJ3dzX3N1YnNjcmlwdGlvbl9lcnJvcnMnLFxuICBoZWxwOiAnVGhlIG51bWJlciBvZiBzdWJzY3JpcHRpb25zIGVycm9ycycsXG4gIGxhYmVsTmFtZXM6IFtcbiAgICAnY29ubmVjdGlvbl9rZXknLFxuICAgICdjb25uZWN0aW9uX3VybCcsXG4gICAgJ2ZlZWRfaWQnLFxuICAgICdzdWJzY3JpcHRpb25fa2V5JyxcbiAgICAnbWVzc2FnZScsXG4gICAgJ2V4cGVyaW1lbnRhbCcsXG4gIF0gYXMgY29uc3QsXG59KVxuXG5leHBvcnQgY29uc3Qgd3NfbWVzc2FnZV90b3RhbCA9IG5ldyBjbGllbnQuQ291bnRlcih7XG4gIG5hbWU6ICd3c19tZXNzYWdlX3RvdGFsJyxcbiAgaGVscDogJ1RoZSBudW1iZXIgb2YgbWVzc2FnZXMgcmVjZWl2ZWQgaW4gdG90YWwnLFxuICBsYWJlbE5hbWVzOiBbJ2ZlZWRfaWQnLCAnc3Vic2NyaXB0aW9uX2tleScsICdleHBlcmltZW50YWwnXSBhcyBjb25zdCxcbn0pXG5cbi8vIFRPRE86IE1lc3NhZ2UgZXJyb3IgYWN0aW9uXG5leHBvcnQgY29uc3Qgd3NfbWVzc2FnZV9lcnJvcnMgPSBuZXcgY2xpZW50LkNvdW50ZXIoe1xuICBuYW1lOiAnd3NfbWVzc2FnZV9lcnJvcnMnLFxuICBoZWxwOiAnVGhlIG51bWJlciBvZiBtZXNzYWdlIGVycm9ycyByZWNlaXZlZCBpbiB0b3RhbCcsXG4gIGxhYmVsTmFtZXM6IFsnY29ubmVjdGlvbl9rZXknLCAnY29ubmVjdGlvbl91cmwnLCAnc3Vic2NyaXB0aW9uX2tleScsICdleHBlcmltZW50YWwnXSBhcyBjb25zdCxcbn0pXG4iXX0=