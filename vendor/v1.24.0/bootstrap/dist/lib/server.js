"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHandler = exports.CONTENT_TYPE_TEXT_PLAIN = exports.CONTENT_TYPE_APPLICATION_JSON = exports.HEADER_CONTENT_TYPE = void 0;
const tslib_1 = require("tslib");
const fastify_1 = tslib_1.__importDefault(require("fastify"));
const path_1 = require("path");
const client = tslib_1.__importStar(require("prom-client"));
const index_1 = require("../index");
const cache_1 = require("./middleware/cache");
const test_payload_loader_1 = require("./config/test-payload-loader");
const modules_1 = require("./modules");
const metrics_1 = require("./metrics");
const config_1 = require("./middleware/rate-limit/config");
const util_1 = require("./util");
const actions_1 = require("./middleware/cache-warmer/actions");
const actions_2 = require("./middleware/error-backoff/actions");
const actions_3 = require("./middleware/ws/actions");
const version = util_1.getEnv('npm_package_version');
const port = parseInt(util_1.getEnv('EA_PORT'));
const baseUrl = util_1.getEnv('BASE_URL');
const eaHost = util_1.getEnv('EA_HOST');
exports.HEADER_CONTENT_TYPE = 'Content-Type';
exports.CONTENT_TYPE_APPLICATION_JSON = 'application/json';
exports.CONTENT_TYPE_TEXT_PLAIN = 'text/plain';
const initHandler = (adapterContext, execute, middleware) => async () => {
    const app = fastify_1.default({
        logger: false,
    });
    const name = adapterContext.name || '';
    const envDefaultOverrides = adapterContext.envDefaultOverrides;
    const context = {
        name,
        envDefaultOverrides,
        cache: null,
        rateLimit: config_1.get({
            limits: adapterContext.rateLimit || { http: {}, ws: {} },
            name,
        }, adapterContext),
    };
    const cacheOptions = cache_1.defaultOptions(undefined, context);
    if (cacheOptions.enabled) {
        cacheOptions.instance = await cacheOptions.cacheBuilder(cacheOptions.cacheImplOptions);
        context.cache = cacheOptions;
    }
    if (metrics_1.METRICS_ENABLED) {
        setupMetricsServer(name);
    }
    const executeWithMiddleware = await index_1.withMiddleware(execute, context, middleware);
    app.post(baseUrl, async (req, res) => {
        req.body.data = {
            ...(req.body.data || {}),
            ...util_1.toObjectWithNumbers(req.query),
        };
        return index_1.executeSync(req.body, executeWithMiddleware, context, (status, result) => {
            res.code(status).send(result);
        });
    });
    app.get(path_1.join(baseUrl, 'health'), async (_, res) => {
        // TODO https://app.shortcut.com/chainlinklabs/story/23810/update-redis-server-healthcheck
        // if (cacheOptions.enabled && cacheOptions.cacheImplOptions.type === 'redis') {
        //   logger.debug('Checking if redis connection initialized')
        //   const cache = context.cache.instance as redis.RedisCache
        //   if (!cache.client.connected) {
        //     res.status(500).send({ message: 'Redis not connected', version })
        //     return
        //   }
        // }
        res.status(200).send({ message: 'OK', version });
    });
    const testPayload = test_payload_loader_1.loadTestPayload();
    app.get(path_1.join(baseUrl, 'smoke'), async (_, res) => {
        if (testPayload.isDefault) {
            return res.status(200).send('OK');
        }
        const errors = [];
        for (const index in testPayload.requests) {
            try {
                await index_1.executeSync({ data: testPayload.requests[index], id: index }, executeWithMiddleware, context, (status, result) => {
                    if (status === 400)
                        errors.push(result);
                });
            }
            catch (e) {
                errors.push(e);
            }
        }
        if (errors.length > 0)
            return res.status(500).send(errors);
        return res.status(200).send('OK');
    });
    process.on('SIGINT', () => {
        context.cache?.instance?.close();
        process.exit();
    });
    app.addHook('onClose', async () => {
        index_1.storeSlice('cacheWarmer').dispatch(actions_1.warmupShutdown());
        index_1.storeSlice('errorBackoff').dispatch(actions_2.shutdown());
        index_1.storeSlice('ws').dispatch(actions_3.WSReset());
        context.cache?.instance?.close();
    });
    return new Promise((resolve) => {
        app.listen(port, eaHost, (_, address) => {
            modules_1.logger.info(`Server listening on ${address}!`);
            resolve(app);
        });
    });
};
exports.initHandler = initHandler;
function setupMetricsServer(name) {
    const metricsApp = fastify_1.default({
        logger: false,
    });
    const metricsPort = parseInt(util_1.getEnv('METRICS_PORT'));
    const endpoint = util_1.getEnv('METRICS_USE_BASE_URL') ? path_1.join(baseUrl, 'metrics') : '/metrics';
    metrics_1.setupMetrics(name);
    metricsApp.get(endpoint, async (_, res) => {
        res.type('txt');
        res.send(await client.register.metrics());
    });
    metricsApp.listen(metricsPort, eaHost, () => modules_1.logger.info(`Monitoring listening on port ${metricsPort}!`));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDhEQUFrRDtBQUNsRCwrQkFBMkI7QUFDM0IsNERBQXFDO0FBQ3JDLG9DQUFrRTtBQUNsRSw4Q0FBbUQ7QUFDbkQsc0VBQThEO0FBQzlELHVDQUFrQztBQUNsQyx1Q0FBeUQ7QUFDekQsMkRBQTBFO0FBQzFFLGlDQUFvRDtBQUNwRCwrREFBa0U7QUFDbEUsZ0VBQTZEO0FBQzdELHFEQUFpRDtBQUVqRCxNQUFNLE9BQU8sR0FBRyxhQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUM3QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBTSxDQUFDLFNBQVMsQ0FBVyxDQUFDLENBQUE7QUFDbEQsTUFBTSxPQUFPLEdBQUcsYUFBTSxDQUFDLFVBQVUsQ0FBVyxDQUFBO0FBQzVDLE1BQU0sTUFBTSxHQUFHLGFBQU0sQ0FBQyxTQUFTLENBQVcsQ0FBQTtBQUU3QixRQUFBLG1CQUFtQixHQUFHLGNBQWMsQ0FBQTtBQUNwQyxRQUFBLDZCQUE2QixHQUFHLGtCQUFrQixDQUFBO0FBQ2xELFFBQUEsdUJBQXVCLEdBQUcsWUFBWSxDQUFBO0FBRTVDLE1BQU0sV0FBVyxHQUN0QixDQUFDLGNBQThCLEVBQUUsT0FBZ0IsRUFBRSxVQUF3QixFQUFFLEVBQUUsQ0FDL0UsS0FBSyxJQUE4QixFQUFFO0lBQ25DLE1BQU0sR0FBRyxHQUFHLGlCQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLEtBQUs7S0FDZCxDQUFDLENBQUE7SUFDRixNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQTtJQUN0QyxNQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQTtJQUM5RCxNQUFNLE9BQU8sR0FBbUI7UUFDOUIsSUFBSTtRQUNKLG1CQUFtQjtRQUNuQixLQUFLLEVBQUUsSUFBSTtR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QzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNkLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUF2R1UsUUFBQSxXQUFXLGVBdUdyQjtBQUVILFNBQVMsa0JBQWtCLENBQUMsSUFBWTtJQUN0QyxNQUFNLFVBQVUsR0FBRyxpQkFBTyxDQUFDO1FBQ3pCLE1BQU0sRUFBRSxLQUFLO0tBQ2QsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQU0sQ0FBQyxjQUFjLENBQVcsQ0FBQyxDQUFBO0lBQzlELE1BQU0sUUFBUSxHQUFHLGFBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7SUFFdkYsc0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUVsQixVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLENBQUMsQ0FBQyxDQUFBO0lBRUYsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUMxQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsV0FBVyxHQUFHLENBQUMsQ0FDNUQsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGFwdGVyQ29udGV4dCwgRXhlY3V0ZSwgTWlkZGxld2FyZSwgQWRhcHRlclJlcXVlc3QgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IEZhc3RpZnksIHsgRmFzdGlmeUluc3RhbmNlIH0gZnJvbSAnZmFzdGlmeSdcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJ1xuaW1wb3J0ICogYXMgY2xpZW50IGZyb20gJ3Byb20tY2xpZW50J1xuaW1wb3J0IHsgZXhlY3V0ZVN5bmMsIHN0b3JlU2xpY2UsIHdpdGhNaWRkbGV3YXJlIH0gZnJvbSAnLi4vaW5kZXgnXG5pbXBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vbWlkZGxld2FyZS9jYWNoZSdcbmltcG9ydCB7IGxvYWRUZXN0UGF5bG9hZCB9IGZyb20gJy4vY29uZmlnL3Rlc3QtcGF5bG9hZC1sb2FkZXInXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL21vZHVsZXMnXG5pbXBvcnQgeyBNRVRSSUNTX0VOQUJMRUQsIHNldHVwTWV0cmljcyB9IGZyb20gJy4vbWV0cmljcydcbmltcG9ydCB7IGdldCBhcyBnZXRSYXRlTGltaXRDb25maWcgfSBmcm9tICcuL21pZGRsZXdhcmUvcmF0ZS1saW1pdC9jb25maWcnXG5pbXBvcnQgeyBnZXRFbnYsIHRvT2JqZWN0V2l0aE51bWJlcnMgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyB3YXJtdXBTaHV0ZG93biB9IGZyb20gJy4vbWlkZGxld2FyZS9jYWNoZS13YXJtZXIvYWN0aW9ucydcbmltcG9ydCB7IHNodXRkb3duIH0gZnJvbSAnLi9taWRkbGV3YXJlL2Vycm9yLWJhY2tvZmYvYWN0aW9ucydcbmltcG9ydCB7IFdTUmVzZXQgfSBmcm9tICcuL21pZGRsZXdhcmUvd3MvYWN0aW9ucydcblxuY29uc3QgdmVyc2lvbiA9IGdldEVudignbnBtX3BhY2thZ2VfdmVyc2lvbicpXG5jb25zdCBwb3J0ID0gcGFyc2VJbnQoZ2V0RW52KCdFQV9QT1JUJykgYXMgc3RyaW5nKVxuY29uc3QgYmFzZVVybCA9IGdldEVudignQkFTRV9VUkwnKSBhcyBzdHJpbmdcbmNvbnN0IGVhSG9zdCA9IGdldEVudignRUFfSE9TVCcpIGFzIHN0cmluZ1xuXG5leHBvcnQgY29uc3QgSEVBREVSX0NPTlRFTlRfVFlQRSA9ICdDb250ZW50LVR5cGUnXG5leHBvcnQgY29uc3QgQ09OVEVOVF9UWVBFX0FQUExJQ0FUSU9OX0pTT04gPSAnYXBwbGljYXRpb24vanNvbidcbmV4cG9ydCBjb25zdCBDT05URU5UX1RZUEVfVEVYVF9QTEFJTiA9ICd0ZXh0L3BsYWluJ1xuXG5leHBvcnQgY29uc3QgaW5pdEhhbmRsZXIgPVxuICAoYWRhcHRlckNvbnRleHQ6IEFkYXB0ZXJDb250ZXh0LCBleGVjdXRlOiBFeGVjdXRlLCBtaWRkbGV3YXJlOiBNaWRkbGV3YXJlW10pID0+XG4gIGFzeW5jICgpOiBQcm9taXNlPEZhc3RpZnlJbnN0YW5jZT4gPT4ge1xuICAgIGNvbnN0IGFwcCA9IEZhc3RpZnkoe1xuICAgICAgbG9nZ2VyOiBmYWxzZSxcbiAgICB9KVxuICAgIGNvbnN0IG5hbWUgPSBhZGFwdGVyQ29udGV4dC5uYW1lIHx8ICcnXG4gICAgY29uc3QgZW52RGVmYXVsdE92ZXJyaWRlcyA9IGFkYXB0ZXJDb250ZXh0LmVudkRlZmF1bHRPdmVycmlkZXNcbiAgICBjb25zdCBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBlbnZEZWZhdWx0T3ZlcnJpZGVzLFxuICAgICAgY2FjaGU6IG51bGwsXG4gICAgICByYXRlTGltaXQ6IGdldFJhdGVMaW1pdENvbmZpZyhcbiAgICAgICAge1xuICAgICAgICAgIGxpbWl0czogYWRhcHRlckNvbnRleHQucmF0ZUxpbWl0IHx8IHsgaHR0cDoge30sIHdzOiB7fSB9LFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgIH0sXG4gICAgICAgIGFkYXB0ZXJDb250ZXh0LFxuICAgICAgKSxcbiAgICB9XG4gICAgY29uc3QgY2FjaGVPcHRpb25zID0gZGVmYXVsdE9wdGlvbnModW5kZWZpbmVkLCBjb250ZXh0KVxuICAgIGlmIChjYWNoZU9wdGlvbnMuZW5hYmxlZCkge1xuICAgICAgY2FjaGVPcHRpb25zLmluc3RhbmNlID0gYXdhaXQgY2FjaGVPcHRpb25zLmNhY2hlQnVpbGRlcihjYWNoZU9wdGlvbnMuY2FjaGVJbXBsT3B0aW9ucylcbiAgICAgIGNvbnRleHQuY2FjaGUgPSBjYWNoZU9wdGlvbnNcbiAgICB9XG5cbiAgICBpZiAoTUVUUklDU19FTkFCTEVEKSB7XG4gICAgICBzZXR1cE1ldHJpY3NTZXJ2ZXIobmFtZSlcbiAgICB9XG5cbiAgICBjb25zdCBleGVjdXRlV2l0aE1pZGRsZXdhcmUgPSBhd2FpdCB3aXRoTWlkZGxld2FyZShleGVjdXRlLCBjb250ZXh0LCBtaWRkbGV3YXJlKVxuXG4gICAgYXBwLnBvc3Q8e1xuICAgICAgQm9keTogQWRhcHRlclJlcXVlc3RcbiAgICB9PihiYXNlVXJsLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICAgIHJlcS5ib2R5LmRhdGEgPSB7XG4gICAgICAgIC4uLihyZXEuYm9keS5kYXRhIHx8IHt9KSxcbiAgICAgICAgLi4udG9PYmplY3RXaXRoTnVtYmVycyhyZXEucXVlcnkpLFxuICAgICAgfVxuICAgICAgcmV0dXJuIGV4ZWN1dGVTeW5jKHJlcS5ib2R5LCBleGVjdXRlV2l0aE1pZGRsZXdhcmUsIGNvbnRleHQsIChzdGF0dXMsIHJlc3VsdCkgPT4ge1xuICAgICAgICByZXMuY29kZShzdGF0dXMpLnNlbmQocmVzdWx0KVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgYXBwLmdldChqb2luKGJhc2VVcmwsICdoZWFsdGgnKSwgYXN5bmMgKF8sIHJlcykgPT4ge1xuICAgICAgLy8gVE9ETyBodHRwczovL2FwcC5zaG9ydGN1dC5jb20vY2hhaW5saW5rbGFicy9zdG9yeS8yMzgxMC91cGRhdGUtcmVkaXMtc2VydmVyLWhlYWx0aGNoZWNrXG4gICAgICAvLyBpZiAoY2FjaGVPcHRpb25zLmVuYWJsZWQgJiYgY2FjaGVPcHRpb25zLmNhY2hlSW1wbE9wdGlvbnMudHlwZSA9PT0gJ3JlZGlzJykge1xuICAgICAgLy8gICBsb2dnZXIuZGVidWcoJ0NoZWNraW5nIGlmIHJlZGlzIGNvbm5lY3Rpb24gaW5pdGlhbGl6ZWQnKVxuICAgICAgLy8gICBjb25zdCBjYWNoZSA9IGNvbnRleHQuY2FjaGUuaW5zdGFuY2UgYXMgcmVkaXMuUmVkaXNDYWNoZVxuICAgICAgLy8gICBpZiAoIWNhY2hlLmNsaWVudC5jb25uZWN0ZWQpIHtcbiAgICAgIC8vICAgICByZXMuc3RhdHVzKDUwMCkuc2VuZCh7IG1lc3NhZ2U6ICdSZWRpcyBub3QgY29ubmVjdGVkJywgdmVyc2lvbiB9KVxuICAgICAgLy8gICAgIHJldHVyblxuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG5cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgbWVzc2FnZTogJ09LJywgdmVyc2lvbiB9KVxuICAgIH0pXG5cbiAgICBjb25zdCB0ZXN0UGF5bG9hZCA9IGxvYWRUZXN0UGF5bG9hZCgpXG4gICAgYXBwLmdldChqb2luKGJhc2VVcmwsICdzbW9rZScpLCBhc3luYyAoXywgcmVzKSA9PiB7XG4gICAgICBpZiAodGVzdFBheWxvYWQuaXNEZWZhdWx0KSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCgnT0snKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBlcnJvcnMgPSBbXVxuXG4gICAgICBmb3IgKGNvbnN0IGluZGV4IGluIHRlc3RQYXlsb2FkLnJlcXVlc3RzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgZXhlY3V0ZVN5bmMoXG4gICAgICAgICAgICB7IGRhdGE6IHRlc3RQYXlsb2FkLnJlcXVlc3RzW2luZGV4XSwgaWQ6IGluZGV4IH0sXG4gICAgICAgICAgICBleGVjdXRlV2l0aE1pZGRsZXdhcmUsXG4gICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgKHN0YXR1cywgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDQwMCkgZXJyb3JzLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICApXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaChlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChlcnJvcnMpXG5cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCgnT0snKVxuICAgIH0pXG5cbiAgICBwcm9jZXNzLm9uKCdTSUdJTlQnLCAoKSA9PiB7XG4gICAgICBjb250ZXh0LmNhY2hlPy5pbnN0YW5jZT8uY2xvc2UoKVxuICAgICAgcHJvY2Vzcy5leGl0KClcbiAgICB9KVxuXG4gICAgYXBwLmFkZEhvb2soJ29uQ2xvc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBzdG9yZVNsaWNlKCdjYWNoZVdhcm1lcicpLmRpc3BhdGNoKHdhcm11cFNodXRkb3duKCkpXG4gICAgICBzdG9yZVNsaWNlKCdlcnJvckJhY2tvZmYnKS5kaXNwYXRjaChzaHV0ZG93bigpKVxuICAgICAgc3RvcmVTbGljZSgnd3MnKS5kaXNwYXRjaChXU1Jlc2V0KCkpXG4gICAgICBjb250ZXh0LmNhY2hlPy5pbnN0YW5jZT8uY2xvc2UoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGFwcC5saXN0ZW4ocG9ydCwgZWFIb3N0LCAoXywgYWRkcmVzcykgPT4ge1xuICAgICAgICBsb2dnZXIuaW5mbyhgU2VydmVyIGxpc3RlbmluZyBvbiAke2FkZHJlc3N9IWApXG4gICAgICAgIHJlc29sdmUoYXBwKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbmZ1bmN0aW9uIHNldHVwTWV0cmljc1NlcnZlcihuYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgbWV0cmljc0FwcCA9IEZhc3RpZnkoe1xuICAgIGxvZ2dlcjogZmFsc2UsXG4gIH0pXG4gIGNvbnN0IG1ldHJpY3NQb3J0ID0gcGFyc2VJbnQoZ2V0RW52KCdNRVRSSUNTX1BPUlQnKSBhcyBzdHJpbmcpXG4gIGNvbnN0IGVuZHBvaW50ID0gZ2V0RW52KCdNRVRSSUNTX1VTRV9CQVNFX1VSTCcpID8gam9pbihiYXNlVXJsLCAnbWV0cmljcycpIDogJy9tZXRyaWNzJ1xuXG4gIHNldHVwTWV0cmljcyhuYW1lKVxuXG4gIG1ldHJpY3NBcHAuZ2V0KGVuZHBvaW50LCBhc3luYyAoXywgcmVzKSA9PiB7XG4gICAgcmVzLnR5cGUoJ3R4dCcpXG4gICAgcmVzLnNlbmQoYXdhaXQgY2xpZW50LnJlZ2lzdGVyLm1ldHJpY3MoKSlcbiAgfSlcblxuICBtZXRyaWNzQXBwLmxpc3RlbihtZXRyaWNzUG9ydCwgZWFIb3N0LCAoKSA9PlxuICAgIGxvZ2dlci5pbmZvKGBNb25pdG9yaW5nIGxpc3RlbmluZyBvbiBwb3J0ICR7bWV0cmljc1BvcnR9IWApLFxuICApXG59XG4iXX0=