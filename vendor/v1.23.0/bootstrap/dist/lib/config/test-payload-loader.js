"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTestPayload = void 0;
const tslib_1 = require("tslib");
const ajv_1 = tslib_1.__importDefault(require("ajv"));
const modules_1 = require("../modules");
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * Load in a JSON file containing a test payload for the current adapter,
 * used in healthchecks to make sample requests
 */
function loadTestPayload() {
    const ajv = new ajv_1.default();
    const schema = {
        type: 'object',
        required: ['requests'],
        properties: {
            requests: {
                type: 'array',
                items: {
                    type: 'object',
                    required: [],
                },
            },
        },
    };
    const validate = ajv.compile(schema);
    try {
        let payload;
        const payloadString = resolveDynamicPayload();
        if (payloadString)
            payload = JSON.parse(payloadString);
        else
            payload = resolveStaticPayload();
        if (!validate(payload)) {
            throw Error(JSON.stringify(validate?.errors || 'Could not validate schema for test payload'));
        }
        return { ...payload, isDefault: false };
    }
    catch (e) {
        modules_1.logger.warn(`Could not load payload: ${e.message}`);
        modules_1.logger.warn('Falling back to default empty payload');
        return { isDefault: true };
    }
}
exports.loadTestPayload = loadTestPayload;
function resolveDynamicPayload() {
    /* eslint-disable @typescript-eslint/no-var-requires */
    try {
        // Absolute path for JS file
        return require(path_1.default.resolve('.', 'test-payload.js'));
    }
    catch {
        try {
            // Relative path for JS file
            return require('./test-payload.js');
        }
        catch {
            return null;
        }
    }
}
function resolveStaticPayload() {
    try {
        // Absolute path for JSON file
        return require(path_1.default.join(process.cwd(), 'test-payload.json'));
    }
    catch {
        try {
            // Relative path for JSON file
            return require('./test-payload.json');
        }
        catch {
            return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1wYXlsb2FkLWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29uZmlnL3Rlc3QtcGF5bG9hZC1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHNEQUF5QztBQUN6Qyx3Q0FBbUM7QUFDbkMsd0RBQXVCO0FBZ0J2Qjs7O0dBR0c7QUFDSCxTQUFnQixlQUFlO0lBQzdCLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUE7SUFDckIsTUFBTSxNQUFNLEdBQTRCO1FBQ3RDLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ3RCLFVBQVUsRUFBRTtZQUNWLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7YUFDRjtTQUNGO0tBQ0YsQ0FBQTtJQUNELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFcEMsSUFBSTtRQUNGLElBQUksT0FBTyxDQUFBO1FBRVgsTUFBTSxhQUFhLEdBQUcscUJBQXFCLEVBQUUsQ0FBQTtRQUM3QyxJQUFJLGFBQWE7WUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTs7WUFDakQsT0FBTyxHQUFHLG9CQUFvQixFQUFFLENBQUE7UUFFckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN0QixNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLElBQUksNENBQTRDLENBQUMsQ0FBQyxDQUFBO1NBQzlGO1FBRUQsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQTtLQUN4QztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTRCLENBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQzlELGdCQUFNLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUE7UUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQTtLQUMzQjtBQUNILENBQUM7QUFsQ0QsMENBa0NDO0FBRUQsU0FBUyxxQkFBcUI7SUFDNUIsdURBQXVEO0lBQ3ZELElBQUk7UUFDRiw0QkFBNEI7UUFDNUIsT0FBTyxPQUFPLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0tBQ3JEO0lBQUMsTUFBTTtRQUNOLElBQUk7WUFDRiw0QkFBNEI7WUFDNUIsT0FBTyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtTQUNwQztRQUFDLE1BQU07WUFDTixPQUFPLElBQUksQ0FBQTtTQUNaO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsU0FBUyxvQkFBb0I7SUFDM0IsSUFBSTtRQUNGLDhCQUE4QjtRQUM5QixPQUFPLE9BQU8sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUE7S0FDOUQ7SUFBQyxNQUFNO1FBQ04sSUFBSTtZQUNGLDhCQUE4QjtZQUM5QixPQUFPLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1NBQ3RDO1FBQUMsTUFBTTtZQUNOLE9BQU8sSUFBSSxDQUFBO1NBQ1o7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWp2LCB7IEpTT05TY2hlbWFUeXBlIH0gZnJvbSAnYWp2J1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vbW9kdWxlcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBBZGFwdGVyUmVxdWVzdERhdGEgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuXG4vKipcbiAqIFRoZSB0ZXN0IHBheWxvYWQgcmVhZCBpbiBmcm9tIGZpbGVzeXN0ZW1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYXlsb2FkIHtcbiAgcmVxdWVzdHM6IEFkYXB0ZXJSZXF1ZXN0RGF0YVtdXG59XG5cbi8qKlxuICogVGVzdCBwYXlsb2FkIHdpdGggZGlzY3JpbWluYXRlZCB1bmlvbiBzbyB3ZSBjYW4gdGVsbCB3aGVuIHdlIHNob3VsZCBqdXN0IGRvXG4gKiBhIHNpbXBsZSBsaXZlbmVzcyBjaGVjayByYXRoZXIgdGhhbiBhIHNhbXBsZSByZXF1ZXN0XG4gKi9cbnR5cGUgVGVzdFBheWxvYWQgPSAoUGF5bG9hZCAmIHsgaXNEZWZhdWx0OiBmYWxzZSB9KSB8IHsgaXNEZWZhdWx0OiB0cnVlIH1cblxuLyoqXG4gKiBMb2FkIGluIGEgSlNPTiBmaWxlIGNvbnRhaW5pbmcgYSB0ZXN0IHBheWxvYWQgZm9yIHRoZSBjdXJyZW50IGFkYXB0ZXIsXG4gKiB1c2VkIGluIGhlYWx0aGNoZWNrcyB0byBtYWtlIHNhbXBsZSByZXF1ZXN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRlc3RQYXlsb2FkKCk6IFRlc3RQYXlsb2FkIHtcbiAgY29uc3QgYWp2ID0gbmV3IEFqdigpXG4gIGNvbnN0IHNjaGVtYTogSlNPTlNjaGVtYVR5cGU8UGF5bG9hZD4gPSB7XG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgcmVxdWlyZWQ6IFsncmVxdWVzdHMnXSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICByZXF1ZXN0czoge1xuICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICBpdGVtczoge1xuICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgIHJlcXVpcmVkOiBbXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxuICBjb25zdCB2YWxpZGF0ZSA9IGFqdi5jb21waWxlKHNjaGVtYSlcblxuICB0cnkge1xuICAgIGxldCBwYXlsb2FkXG5cbiAgICBjb25zdCBwYXlsb2FkU3RyaW5nID0gcmVzb2x2ZUR5bmFtaWNQYXlsb2FkKClcbiAgICBpZiAocGF5bG9hZFN0cmluZykgcGF5bG9hZCA9IEpTT04ucGFyc2UocGF5bG9hZFN0cmluZylcbiAgICBlbHNlIHBheWxvYWQgPSByZXNvbHZlU3RhdGljUGF5bG9hZCgpXG5cbiAgICBpZiAoIXZhbGlkYXRlKHBheWxvYWQpKSB7XG4gICAgICB0aHJvdyBFcnJvcihKU09OLnN0cmluZ2lmeSh2YWxpZGF0ZT8uZXJyb3JzIHx8ICdDb3VsZCBub3QgdmFsaWRhdGUgc2NoZW1hIGZvciB0ZXN0IHBheWxvYWQnKSlcbiAgICB9XG5cbiAgICByZXR1cm4geyAuLi5wYXlsb2FkLCBpc0RlZmF1bHQ6IGZhbHNlIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci53YXJuKGBDb3VsZCBub3QgbG9hZCBwYXlsb2FkOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWApXG4gICAgbG9nZ2VyLndhcm4oJ0ZhbGxpbmcgYmFjayB0byBkZWZhdWx0IGVtcHR5IHBheWxvYWQnKVxuICAgIHJldHVybiB7IGlzRGVmYXVsdDogdHJ1ZSB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUR5bmFtaWNQYXlsb2FkKCk6IHN0cmluZyB8IG51bGwge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzICovXG4gIHRyeSB7XG4gICAgLy8gQWJzb2x1dGUgcGF0aCBmb3IgSlMgZmlsZVxuICAgIHJldHVybiByZXF1aXJlKHBhdGgucmVzb2x2ZSgnLicsICd0ZXN0LXBheWxvYWQuanMnKSlcbiAgfSBjYXRjaCB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFJlbGF0aXZlIHBhdGggZm9yIEpTIGZpbGVcbiAgICAgIHJldHVybiByZXF1aXJlKCcuL3Rlc3QtcGF5bG9hZC5qcycpXG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlU3RhdGljUGF5bG9hZCgpOiBQYXlsb2FkIHwgbnVsbCB7XG4gIHRyeSB7XG4gICAgLy8gQWJzb2x1dGUgcGF0aCBmb3IgSlNPTiBmaWxlXG4gICAgcmV0dXJuIHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICd0ZXN0LXBheWxvYWQuanNvbicpKVxuICB9IGNhdGNoIHtcbiAgICB0cnkge1xuICAgICAgLy8gUmVsYXRpdmUgcGF0aCBmb3IgSlNPTiBmaWxlXG4gICAgICByZXR1cm4gcmVxdWlyZSgnLi90ZXN0LXBheWxvYWQuanNvbicpXG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxufVxuIl19