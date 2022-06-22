import { Config } from '@chainlink/types';
export declare const constants: {
    ENV_API_KEY: string;
    ENV_API_ENDPOINT: string;
    ENV_API_TIMEOUT: string;
    DEFAULT_API_TIMEOUT: number;
    ENV_API_VERBOSE: string;
};
export declare function getDefaultConfig(prefix?: string, requireKey?: boolean, requireWsKey?: boolean): Config;
export declare function logConfig(config: Config): void;
//# sourceMappingURL=index.d.ts.map