import { AdapterErrorResponse, Override, IncludePair, InputParameters } from '@chainlink/types';
import { AdapterError } from './error';
export declare type OverrideType = 'overrides' | 'tokenOverrides' | 'includes';
declare type InputType = {
    id?: string;
    data?: any;
};
export interface ValidatorOptions {
    shouldThrowError?: boolean;
    includes?: any[];
    overrides?: any;
}
export declare class Validator {
    input: InputType;
    inputConfigs: InputParameters;
    inputOptions: Record<string, any[]>;
    validatorOptions: ValidatorOptions;
    validated: any;
    error: AdapterError | undefined;
    errored: AdapterErrorResponse | undefined;
    constructor(input?: InputType, inputConfigs?: {}, inputOptions?: {}, validatorOptions?: ValidatorOptions);
    validateInput(): void;
    validateOverrides(path: 'overrides' | 'tokenOverrides', preset: Record<string, any>): void;
    checkDuplicateInputParams(inputConfig: InputParameters): void;
    validateIncludeOverrides(): void;
    parseError(error: Error): void;
    overrideSymbol: (adapter: string, symbol?: string | string[] | undefined) => string | string[];
    overrideToken: (symbol: string, network?: string) => string | undefined;
    overrideIncludes: (from: string, to: string) => IncludePair | undefined;
    overrideReverseLookup: (adapter: string, type: OverrideType, symbol: string) => string;
    formatOverride: (param: any) => Override;
    formatIncludeOverrides: (param: any) => Override;
    throwInvalid: (message: string) => void;
    validateObjectParam(key: string, shouldThrowError?: boolean): void;
    validateOptionalParam(param: any, key: string, options: any[]): void;
    validateRequiredParam(param: any, key: string, options: any[]): void;
    getUsedKey(key: string, keyArray: string[]): string | undefined;
}
export {};
//# sourceMappingURL=validator.d.ts.map