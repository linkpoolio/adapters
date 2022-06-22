"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startChain = void 0;
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const hardhat_1 = require("hardhat");
async function startChain(port = 7545) {
    console.log('Starting hardhat');
    const hostname = 'localhost';
    const provider = await hardhat_1.run(task_names_1.TASK_NODE_GET_PROVIDER);
    // Disable logging
    // if (Boolean(config.VERBOSE) !== true)
    await provider.request({
        method: 'hardhat_setLoggingEnabled',
        params: [false],
    });
    // Start Hardhat network
    const server = await hardhat_1.run(task_names_1.TASK_NODE_CREATE_SERVER, {
        hostname,
        port,
        provider,
    });
    // Wait until server is ready for requests
    await server.listen();
    console.log(`Hardhat listening on localhost:${port}`);
    return server;
}
exports.startChain = startChain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFyZGhhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oYXJkaGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlFQUFrRztBQUNsRyxxQ0FBNkI7QUFFdEIsS0FBSyxVQUFVLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSTtJQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDL0IsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFBO0lBQzVCLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBRyxDQUFDLG1DQUFzQixDQUFDLENBQUE7SUFFbEQsa0JBQWtCO0lBQ2xCLHdDQUF3QztJQUN4QyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDckIsTUFBTSxFQUFFLDJCQUEyQjtRQUNuQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDaEIsQ0FBQyxDQUFBO0lBRUYsd0JBQXdCO0lBQ3hCLE1BQU0sTUFBTSxHQUFrQixNQUFNLGFBQUcsQ0FBQyxvQ0FBdUIsRUFBRTtRQUMvRCxRQUFRO1FBQ1IsSUFBSTtRQUNKLFFBQVE7S0FDVCxDQUFDLENBQUE7SUFFRiwwQ0FBMEM7SUFDMUMsTUFBTSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNyRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUF2QkQsZ0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvblJwY1NlcnZlciB9IGZyb20gJ2hhcmRoYXQvaW50ZXJuYWwvaGFyZGhhdC1uZXR3b3JrL2pzb25ycGMvc2VydmVyJ1xuaW1wb3J0IHsgVEFTS19OT0RFX0dFVF9QUk9WSURFUiwgVEFTS19OT0RFX0NSRUFURV9TRVJWRVIgfSBmcm9tICdoYXJkaGF0L2J1aWx0aW4tdGFza3MvdGFzay1uYW1lcydcbmltcG9ydCB7IHJ1biB9IGZyb20gJ2hhcmRoYXQnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydENoYWluKHBvcnQgPSA3NTQ1KTogUHJvbWlzZTxKc29uUnBjU2VydmVyPiB7XG4gIGNvbnNvbGUubG9nKCdTdGFydGluZyBoYXJkaGF0JylcbiAgY29uc3QgaG9zdG5hbWUgPSAnbG9jYWxob3N0J1xuICBjb25zdCBwcm92aWRlciA9IGF3YWl0IHJ1bihUQVNLX05PREVfR0VUX1BST1ZJREVSKVxuXG4gIC8vIERpc2FibGUgbG9nZ2luZ1xuICAvLyBpZiAoQm9vbGVhbihjb25maWcuVkVSQk9TRSkgIT09IHRydWUpXG4gIGF3YWl0IHByb3ZpZGVyLnJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ2hhcmRoYXRfc2V0TG9nZ2luZ0VuYWJsZWQnLFxuICAgIHBhcmFtczogW2ZhbHNlXSxcbiAgfSlcblxuICAvLyBTdGFydCBIYXJkaGF0IG5ldHdvcmtcbiAgY29uc3Qgc2VydmVyOiBKc29uUnBjU2VydmVyID0gYXdhaXQgcnVuKFRBU0tfTk9ERV9DUkVBVEVfU0VSVkVSLCB7XG4gICAgaG9zdG5hbWUsXG4gICAgcG9ydCxcbiAgICBwcm92aWRlcixcbiAgfSlcblxuICAvLyBXYWl0IHVudGlsIHNlcnZlciBpcyByZWFkeSBmb3IgcmVxdWVzdHNcbiAgYXdhaXQgc2VydmVyLmxpc3RlbigpXG4gIGNvbnNvbGUubG9nKGBIYXJkaGF0IGxpc3RlbmluZyBvbiBsb2NhbGhvc3Q6JHtwb3J0fWApXG4gIHJldHVybiBzZXJ2ZXJcbn1cbiJdfQ==