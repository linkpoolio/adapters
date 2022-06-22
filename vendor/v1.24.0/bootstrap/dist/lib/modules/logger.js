"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.censor = exports.paths = void 0;
const tslib_1 = require("tslib");
const util_1 = require("../util");
const pino_1 = tslib_1.__importDefault(require("pino"));
const config_1 = require("../middleware/ws/config");
const lodash_1 = require("lodash");
exports.paths = [...config_1.wsRedactPaths];
const sensitiveKeys = [
    /cookie/i,
    /passw(or)?d/i,
    /^pw$/,
    /^pass$/i,
    /secret/i,
    /token/i,
    /api[-._]?key/i,
];
const censor = (v) => {
    try {
        const url = new URL(v);
        url.searchParams.forEach((_, name) => {
            if (sensitiveKeys.some((rx) => rx.test(name))) {
                url.searchParams.set(name, 'REDACTED');
            }
        });
        return url.toString();
    }
    catch {
        // if not a URL
        return '[REDACTED]';
    }
};
exports.censor = censor;
exports.logger = pino_1.default({
    level: process.env.LOG_LEVEL ?? 'info',
    prettyPrint: process.env.NODE_ENV === 'development',
    prettifier: require('pino-pretty'),
    formatters: {
        level(label) {
            return { level: label };
        },
    },
    hooks: {
        logMethod(inputArgs, method) {
            // flipping the order of inputs (switching from winston to pino)
            const length = inputArgs.length;
            const arg1 = inputArgs.shift();
            if (length >= 2) {
                // if input includes message string + data object
                const arg2 = lodash_1.cloneDeep(inputArgs.shift());
                // add instanceId if not present
                if (typeof arg2 === 'object' && !arg2.instanceId)
                    arg2.instanceId = util_1.uuid();
                return method.apply(this, [arg2, arg1, ...inputArgs]);
            }
            return method.apply(this, [arg1, ...inputArgs]);
        },
    },
    redact: {
        paths: exports.paths,
        censor: exports.censor,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tb2R1bGVzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsa0NBQThCO0FBQzlCLHdEQUF1QjtBQUN2QixvREFBdUQ7QUFDdkQsbUNBQWtDO0FBRXJCLFFBQUEsS0FBSyxHQUFHLENBQUMsR0FBRyxzQkFBYSxDQUFDLENBQUE7QUFFdkMsTUFBTSxhQUFhLEdBQUc7SUFDcEIsU0FBUztJQUNULGNBQWM7SUFDZCxNQUFNO0lBQ04sU0FBUztJQUNULFNBQVM7SUFDVCxRQUFRO0lBQ1IsZUFBZTtDQUNoQixDQUFBO0FBRU0sTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtJQUNsQyxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQzdDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQTthQUN2QztRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUE7S0FDdEI7SUFBQyxNQUFNO1FBQ04sZUFBZTtRQUNmLE9BQU8sWUFBWSxDQUFBO0tBQ3BCO0FBQ0gsQ0FBQyxDQUFBO0FBYlksUUFBQSxNQUFNLFVBYWxCO0FBRVksUUFBQSxNQUFNLEdBQUcsY0FBSSxDQUFDO0lBQ3pCLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxNQUFNO0lBQ3RDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxhQUFhO0lBQ25ELFVBQVUsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ2xDLFVBQVUsRUFBRTtRQUNWLEtBQUssQ0FBQyxLQUFLO1lBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQTtRQUN6QixDQUFDO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxTQUFTLENBQUMsU0FBUyxFQUFFLE1BQU07WUFDekIsZ0VBQWdFO1lBQ2hFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7WUFDL0IsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQzlCLElBQUksTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDZixpREFBaUQ7Z0JBQ2pELE1BQU0sSUFBSSxHQUFHLGtCQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7Z0JBRXpDLGdDQUFnQztnQkFDaEMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtvQkFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQUksRUFBRSxDQUFBO2dCQUUxRSxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUE7YUFDdEQ7WUFDRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUNqRCxDQUFDO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUwsYUFBSztRQUNMLE1BQU0sRUFBTixjQUFNO0tBQ1A7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dWlkIH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCBwaW5vIGZyb20gJ3Bpbm8nXG5pbXBvcnQgeyB3c1JlZGFjdFBhdGhzIH0gZnJvbSAnLi4vbWlkZGxld2FyZS93cy9jb25maWcnXG5pbXBvcnQgeyBjbG9uZURlZXAgfSBmcm9tICdsb2Rhc2gnXG5cbmV4cG9ydCBjb25zdCBwYXRocyA9IFsuLi53c1JlZGFjdFBhdGhzXVxuXG5jb25zdCBzZW5zaXRpdmVLZXlzID0gW1xuICAvY29va2llL2ksXG4gIC9wYXNzdyhvcik/ZC9pLFxuICAvXnB3JC8sXG4gIC9ecGFzcyQvaSxcbiAgL3NlY3JldC9pLFxuICAvdG9rZW4vaSxcbiAgL2FwaVstLl9dP2tleS9pLFxuXVxuXG5leHBvcnQgY29uc3QgY2Vuc29yID0gKHY6IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwodilcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmZvckVhY2goKF8sIG5hbWUpID0+IHtcbiAgICAgIGlmIChzZW5zaXRpdmVLZXlzLnNvbWUoKHJ4KSA9PiByeC50ZXN0KG5hbWUpKSkge1xuICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChuYW1lLCAnUkVEQUNURUQnKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHVybC50b1N0cmluZygpXG4gIH0gY2F0Y2gge1xuICAgIC8vIGlmIG5vdCBhIFVSTFxuICAgIHJldHVybiAnW1JFREFDVEVEXSdcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gcGlubyh7XG4gIGxldmVsOiBwcm9jZXNzLmVudi5MT0dfTEVWRUwgPz8gJ2luZm8nLFxuICBwcmV0dHlQcmludDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcsXG4gIHByZXR0aWZpZXI6IHJlcXVpcmUoJ3Bpbm8tcHJldHR5JyksXG4gIGZvcm1hdHRlcnM6IHtcbiAgICBsZXZlbChsYWJlbCkge1xuICAgICAgcmV0dXJuIHsgbGV2ZWw6IGxhYmVsIH1cbiAgICB9LFxuICB9LFxuICBob29rczoge1xuICAgIGxvZ01ldGhvZChpbnB1dEFyZ3MsIG1ldGhvZCkge1xuICAgICAgLy8gZmxpcHBpbmcgdGhlIG9yZGVyIG9mIGlucHV0cyAoc3dpdGNoaW5nIGZyb20gd2luc3RvbiB0byBwaW5vKVxuICAgICAgY29uc3QgbGVuZ3RoID0gaW5wdXRBcmdzLmxlbmd0aFxuICAgICAgY29uc3QgYXJnMSA9IGlucHV0QXJncy5zaGlmdCgpXG4gICAgICBpZiAobGVuZ3RoID49IDIpIHtcbiAgICAgICAgLy8gaWYgaW5wdXQgaW5jbHVkZXMgbWVzc2FnZSBzdHJpbmcgKyBkYXRhIG9iamVjdFxuICAgICAgICBjb25zdCBhcmcyID0gY2xvbmVEZWVwKGlucHV0QXJncy5zaGlmdCgpKVxuXG4gICAgICAgIC8vIGFkZCBpbnN0YW5jZUlkIGlmIG5vdCBwcmVzZW50XG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgIWFyZzIuaW5zdGFuY2VJZCkgYXJnMi5pbnN0YW5jZUlkID0gdXVpZCgpXG5cbiAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGlzLCBbYXJnMiwgYXJnMSwgLi4uaW5wdXRBcmdzXSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhpcywgW2FyZzEsIC4uLmlucHV0QXJnc10pXG4gICAgfSxcbiAgfSxcbiAgcmVkYWN0OiB7XG4gICAgcGF0aHMsXG4gICAgY2Vuc29yLFxuICB9LFxufSlcbiJdfQ==