"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashOpts = exports.hash = exports.getKeyData = exports.excludableInternalAdapterRequestProperties = exports.includableAdapterRequestProperties = exports.excludableAdapterRequestProperties = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const object_hash_1 = tslib_1.__importDefault(require("object-hash"));
/** Common keys within adapter requests that should be ignored to generate a stable key*/
exports.excludableAdapterRequestProperties = [
    'id',
    'maxAge',
    'meta',
    'debug',
    'rateLimitMaxAge',
    'metricsMeta',
]
    .concat((process.env.CACHE_KEY_IGNORED_PROPS || '').split(',').filter((k) => k))
    .reduce((prev, next) => {
    prev[next] = true;
    return prev;
}, {});
/** Common keys within adapter requests that should be used to generate a stable key*/
exports.includableAdapterRequestProperties = ['data'].concat((process.env.CACHE_KEY_INCLUDED_PROPS || '').split(',').filter((k) => k));
/** Common keys within adapter requests that should be ignored within "data" to create a stable key*/
exports.excludableInternalAdapterRequestProperties = [
    'resultPath',
    'overrides',
    'tokenOverrides',
    'includes',
];
const getKeyData = (data) => lodash_1.omit(lodash_1.pick(data, exports.includableAdapterRequestProperties), exports.excludableInternalAdapterRequestProperties.map((property) => `data.${property}`));
exports.getKeyData = getKeyData;
/**
 * Generates a key by hashing input data
 *
 * @param data Adapter request input data
 * @param hashOptions Additional configuration for the objectHash package
 * @param mode Which behavior to use:
 *    include (default) - hash only selected properties throwing out everything else
 *    exclude           - hash the entire data object after excluding certain properties
 *
 * @returns string
 */
const hash = (data, hashOptions, mode = 'include') => {
    return mode === 'include' || !data
        ? object_hash_1.default(exports.getKeyData(data), hashOptions)
        : object_hash_1.default(data, exports.getHashOpts());
};
exports.hash = hash;
const getHashOpts = () => ({
    algorithm: 'sha1',
    encoding: 'hex',
    unorderedSets: false,
    respectType: false,
    respectFunctionProperties: false,
    respectFunctionNames: false,
    excludeKeys: (props) => exports.excludableAdapterRequestProperties[props],
});
exports.getHashOpts = getHashOpts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWlkZGxld2FyZS9jYWNoZS1rZXkvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsbUNBQW1DO0FBQ25DLHNFQUFvQztBQUVwQyx5RkFBeUY7QUFDNUUsUUFBQSxrQ0FBa0MsR0FBeUI7SUFDdEUsSUFBSTtJQUNKLFFBQVE7SUFDUixNQUFNO0lBQ04sT0FBTztJQUNQLGlCQUFpQjtJQUNqQixhQUFhO0NBQ2Q7S0FDRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9FLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFBO0lBQ2pCLE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxFQUFFLEVBQTBCLENBQUMsQ0FBQTtBQUVoQyxzRkFBc0Y7QUFDekUsUUFBQSxrQ0FBa0MsR0FBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FDekUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUN6RSxDQUFBO0FBRUQscUdBQXFHO0FBQ3hGLFFBQUEsMENBQTBDLEdBQUc7SUFDeEQsWUFBWTtJQUNaLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsVUFBVTtDQUNYLENBQUE7QUFFTSxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQW9CLEVBQUUsRUFBRSxDQUNqRCxhQUFJLENBQ0YsYUFBSSxDQUFDLElBQUksRUFBRSwwQ0FBa0MsQ0FBQyxFQUM5QyxrREFBMEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsUUFBUSxFQUFFLENBQUMsQ0FDakYsQ0FBQTtBQUpVLFFBQUEsVUFBVSxjQUlwQjtBQUdIOzs7Ozs7Ozs7O0dBVUc7QUFDSSxNQUFNLElBQUksR0FBRyxDQUNsQixJQUFvQixFQUNwQixXQUF5RCxFQUN6RCxPQUFpQixTQUFTLEVBQ2xCLEVBQUU7SUFDVixPQUFPLElBQUksS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJO1FBQ2hDLENBQUMsQ0FBQyxxQkFBVSxDQUFDLGtCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxtQkFBVyxFQUFFLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQUE7QUFSWSxRQUFBLElBQUksUUFRaEI7QUFFTSxNQUFNLFdBQVcsR0FBRyxHQUFpRCxFQUFFLENBQUMsQ0FBQztJQUM5RSxTQUFTLEVBQUUsTUFBTTtJQUNqQixRQUFRLEVBQUUsS0FBSztJQUNmLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLHlCQUF5QixFQUFFLEtBQUs7SUFDaEMsb0JBQW9CLEVBQUUsS0FBSztJQUMzQixXQUFXLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLDBDQUFrQyxDQUFDLEtBQUssQ0FBQztDQUMxRSxDQUFDLENBQUE7QUFSVyxRQUFBLFdBQVcsZUFRdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGFwdGVyUmVxdWVzdCB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBwaWNrLCBvbWl0IH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IG9iamVjdEhhc2ggZnJvbSAnb2JqZWN0LWhhc2gnXG5cbi8qKiBDb21tb24ga2V5cyB3aXRoaW4gYWRhcHRlciByZXF1ZXN0cyB0aGF0IHNob3VsZCBiZSBpZ25vcmVkIHRvIGdlbmVyYXRlIGEgc3RhYmxlIGtleSovXG5leHBvcnQgY29uc3QgZXhjbHVkYWJsZUFkYXB0ZXJSZXF1ZXN0UHJvcGVydGllczogUmVjb3JkPHN0cmluZywgdHJ1ZT4gPSBbXG4gICdpZCcsXG4gICdtYXhBZ2UnLFxuICAnbWV0YScsXG4gICdkZWJ1ZycsXG4gICdyYXRlTGltaXRNYXhBZ2UnLFxuICAnbWV0cmljc01ldGEnLFxuXVxuICAuY29uY2F0KChwcm9jZXNzLmVudi5DQUNIRV9LRVlfSUdOT1JFRF9QUk9QUyB8fCAnJykuc3BsaXQoJywnKS5maWx0ZXIoKGspID0+IGspKVxuICAucmVkdWNlKChwcmV2LCBuZXh0KSA9PiB7XG4gICAgcHJldltuZXh0XSA9IHRydWVcbiAgICByZXR1cm4gcHJldlxuICB9LCB7fSBhcyBSZWNvcmQ8c3RyaW5nLCB0cnVlPilcblxuLyoqIENvbW1vbiBrZXlzIHdpdGhpbiBhZGFwdGVyIHJlcXVlc3RzIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gZ2VuZXJhdGUgYSBzdGFibGUga2V5Ki9cbmV4cG9ydCBjb25zdCBpbmNsdWRhYmxlQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IFsnZGF0YSddLmNvbmNhdChcbiAgKHByb2Nlc3MuZW52LkNBQ0hFX0tFWV9JTkNMVURFRF9QUk9QUyB8fCAnJykuc3BsaXQoJywnKS5maWx0ZXIoKGspID0+IGspLFxuKVxuXG4vKiogQ29tbW9uIGtleXMgd2l0aGluIGFkYXB0ZXIgcmVxdWVzdHMgdGhhdCBzaG91bGQgYmUgaWdub3JlZCB3aXRoaW4gXCJkYXRhXCIgdG8gY3JlYXRlIGEgc3RhYmxlIGtleSovXG5leHBvcnQgY29uc3QgZXhjbHVkYWJsZUludGVybmFsQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzID0gW1xuICAncmVzdWx0UGF0aCcsIC8vIFRPRE86IHRoaXMgdG9vP1xuICAnb3ZlcnJpZGVzJyxcbiAgJ3Rva2VuT3ZlcnJpZGVzJyxcbiAgJ2luY2x1ZGVzJyxcbl1cblxuZXhwb3J0IGNvbnN0IGdldEtleURhdGEgPSAoZGF0YTogQWRhcHRlclJlcXVlc3QpID0+XG4gIG9taXQoXG4gICAgcGljayhkYXRhLCBpbmNsdWRhYmxlQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzKSxcbiAgICBleGNsdWRhYmxlSW50ZXJuYWxBZGFwdGVyUmVxdWVzdFByb3BlcnRpZXMubWFwKChwcm9wZXJ0eSkgPT4gYGRhdGEuJHtwcm9wZXJ0eX1gKSxcbiAgKVxuXG5leHBvcnQgdHlwZSBIYXNoTW9kZSA9ICdpbmNsdWRlJyB8ICdleGNsdWRlJ1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSBrZXkgYnkgaGFzaGluZyBpbnB1dCBkYXRhXG4gKlxuICogQHBhcmFtIGRhdGEgQWRhcHRlciByZXF1ZXN0IGlucHV0IGRhdGFcbiAqIEBwYXJhbSBoYXNoT3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBvYmplY3RIYXNoIHBhY2thZ2VcbiAqIEBwYXJhbSBtb2RlIFdoaWNoIGJlaGF2aW9yIHRvIHVzZTpcbiAqICAgIGluY2x1ZGUgKGRlZmF1bHQpIC0gaGFzaCBvbmx5IHNlbGVjdGVkIHByb3BlcnRpZXMgdGhyb3dpbmcgb3V0IGV2ZXJ5dGhpbmcgZWxzZVxuICogICAgZXhjbHVkZSAgICAgICAgICAgLSBoYXNoIHRoZSBlbnRpcmUgZGF0YSBvYmplY3QgYWZ0ZXIgZXhjbHVkaW5nIGNlcnRhaW4gcHJvcGVydGllc1xuICpcbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5leHBvcnQgY29uc3QgaGFzaCA9IChcbiAgZGF0YTogQWRhcHRlclJlcXVlc3QsXG4gIGhhc2hPcHRpb25zOiBSZXF1aXJlZDxQYXJhbWV0ZXJzPHR5cGVvZiBvYmplY3RIYXNoPj5bJzEnXSxcbiAgbW9kZTogSGFzaE1vZGUgPSAnaW5jbHVkZScsXG4pOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gbW9kZSA9PT0gJ2luY2x1ZGUnIHx8ICFkYXRhXG4gICAgPyBvYmplY3RIYXNoKGdldEtleURhdGEoZGF0YSksIGhhc2hPcHRpb25zKVxuICAgIDogb2JqZWN0SGFzaChkYXRhLCBnZXRIYXNoT3B0cygpKVxufVxuXG5leHBvcnQgY29uc3QgZ2V0SGFzaE9wdHMgPSAoKTogUmVxdWlyZWQ8UGFyYW1ldGVyczx0eXBlb2Ygb2JqZWN0SGFzaD4+WycxJ10gPT4gKHtcbiAgYWxnb3JpdGhtOiAnc2hhMScsXG4gIGVuY29kaW5nOiAnaGV4JyxcbiAgdW5vcmRlcmVkU2V0czogZmFsc2UsXG4gIHJlc3BlY3RUeXBlOiBmYWxzZSxcbiAgcmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllczogZmFsc2UsXG4gIHJlc3BlY3RGdW5jdGlvbk5hbWVzOiBmYWxzZSxcbiAgZXhjbHVkZUtleXM6IChwcm9wczogc3RyaW5nKSA9PiBleGNsdWRhYmxlQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzW3Byb3BzXSxcbn0pXG4iXX0=