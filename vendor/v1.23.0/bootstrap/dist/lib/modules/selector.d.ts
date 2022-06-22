import { AdapterRequest, Config, APIEndpoint, AdapterResponse, InputParameters, AdapterContext, UpstreamEndpointsGroup } from '@chainlink/types';
export declare const baseInputParameters: InputParameters;
export declare const baseInputParameterKeys: string[];
export declare const Builder: {
    selectEndpoint: <C extends Config>(request: AdapterRequest, config: C, apiEndpoints: Record<string, APIEndpoint<C>>, customParams?: InputParameters | undefined) => APIEndpoint<C>;
    selectCompositeEndpoint: <ConfigDownstream extends Config, ConfigUpstream extends Config>(request: AdapterRequest, downstreamConfig: ConfigDownstream, downstreamEndpoints: Record<string, APIEndpoint<ConfigDownstream>>, upstreamEndpointsGroups: UpstreamEndpointsGroup[], upstreamConfig: ConfigUpstream, ignoreRequired?: boolean, customParams?: InputParameters | undefined) => APIEndpoint<ConfigDownstream>;
    buildSelector: <C_1 extends Config>(request: AdapterRequest, context: AdapterContext, config: C_1, apiEndpoints: Record<string, APIEndpoint<C_1>>, customParams?: InputParameters | undefined) => Promise<AdapterResponse>;
};
//# sourceMappingURL=selector.d.ts.map