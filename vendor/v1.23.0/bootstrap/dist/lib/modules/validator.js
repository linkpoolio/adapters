"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const util_1 = require("../util");
const error_1 = require("./error");
const presetTokens_json_1 = tslib_1.__importDefault(require("../config/overrides/presetTokens.json"));
const requester_1 = require("./requester");
const selector_1 = require("./selector");
class Validator {
    constructor(input = { id: '1', data: {} }, inputConfigs = {}, inputOptions = {}, validatorOptions = {}) {
        this.overrideSymbol = (adapter, symbol) => {
            const defaultSymbol = symbol || this.validated.data.base;
            if (!defaultSymbol)
                this.throwInvalid(`Required parameter not supplied: base`);
            // TODO: Will never be reached, because the presetSymbols are used as default overrides
            if (!this.validated.overrides)
                return defaultSymbol;
            if (!Array.isArray(defaultSymbol))
                return (this.validated.overrides.get(adapter.toLowerCase())?.get(defaultSymbol.toLowerCase()) ||
                    defaultSymbol);
            const multiple = [];
            for (const sym of defaultSymbol) {
                const overrided = this.validated.overrides.get(adapter.toLowerCase())?.get(sym.toLowerCase());
                if (!overrided)
                    multiple.push(sym);
                else
                    multiple.push(overrided);
            }
            return multiple;
        };
        this.overrideToken = (symbol, network = 'ethereum') => {
            return this.validated.tokenOverrides?.get(network.toLowerCase())?.get(symbol.toLowerCase());
        };
        this.overrideIncludes = (from, to) => {
            // Search through `presetIncludes` to find matching override for adapter and to/from pairing.
            const pairs = this.validated.includes?.filter((val) => typeof val !== 'string').filter((pair) => pair.from.toLowerCase() === from.toLowerCase() &&
                pair.to.toLowerCase() === to.toLowerCase());
            if (!pairs || !pairs[0] || !pairs[0].includes || !pairs[0].includes[0]) {
                return;
            }
            return pairs[0].includes[0];
        };
        this.overrideReverseLookup = (adapter, type, symbol) => {
            const overrides = this.validated?.[type]?.get(adapter.toLowerCase());
            if (!overrides)
                return symbol;
            let originalSymbol;
            overrides.forEach((overridden, original) => {
                if (overridden.toLowerCase() === symbol.toLowerCase())
                    originalSymbol = original;
            });
            return originalSymbol || symbol;
        };
        this.formatOverride = (param) => {
            const _throwInvalid = () => this.throwInvalid(`Parameter supplied with wrong format: "override"`);
            if (!util_1.isObject(param))
                _throwInvalid();
            const _isValid = Object.values(param).every(util_1.isObject);
            if (!_isValid)
                _throwInvalid();
            const _keyToLowerCase = (entry) => {
                return [entry[0].toLowerCase(), entry[1]];
            };
            return new Map(Object.entries(param)
                .map(_keyToLowerCase)
                .map(([key, value]) => [key, new Map(Object.entries(value).map(_keyToLowerCase))]));
        };
        this.formatIncludeOverrides = (param) => {
            const _throwInvalid = () => this.throwInvalid(`Parameter supplied with wrong format: "includes"`);
            if (!util_1.isArray(param))
                _throwInvalid();
            const _isValid = Object.values(param).every((val) => util_1.isObject(val) || typeof val === 'string');
            if (!_isValid)
                _throwInvalid();
            return param;
        };
        this.throwInvalid = (message) => {
            throw new error_1.AdapterError({ jobRunID: this.validated.id, statusCode: 400, message });
        };
        this.input = { ...input };
        if (!this.input.id)
            this.input.id = '1'; //TODO Please remove these once "no any" strict typing is enabled
        if (!this.input.data)
            this.input.data = {};
        this.inputConfigs = { ...selector_1.baseInputParameters, ...inputConfigs };
        this.inputOptions = { ...inputOptions };
        this.validatorOptions = {
            shouldThrowError: true,
            includes: [],
            overrides: {},
            ...validatorOptions,
        };
        this.validated = { id: this.input.id, data: {} };
        this.validateInput();
        this.validateOverrides('overrides', this.validatorOptions.overrides);
        this.validateOverrides('tokenOverrides', presetTokens_json_1.default);
        this.validateIncludeOverrides();
        this.checkDuplicateInputParams(inputConfigs);
    }
    validateInput() {
        try {
            for (const key in this.inputConfigs) {
                const options = this.inputOptions[key];
                const inputConfig = this.inputConfigs[key];
                if (Array.isArray(inputConfig)) {
                    // TODO move away from alias arrays in favor of InputParameter config type
                    const usedKey = this.getUsedKey(key, inputConfig);
                    if (!usedKey)
                        this.throwInvalid(`None of aliases used for required key ${key}`);
                    this.validateRequiredParam(this.input.data[usedKey], key, options);
                }
                else if (typeof inputConfig === 'boolean') {
                    // TODO move away from required T/F in favor of InputParameter config type
                    inputConfig
                        ? this.validateRequiredParam(this.input.data[key], key, options)
                        : this.validateOptionalParam(this.input.data[key], key, options);
                }
                else {
                    this.validateObjectParam(key, this.validatorOptions.shouldThrowError);
                }
            }
        }
        catch (e) {
            this.parseError(e);
        }
    }
    validateOverrides(path, preset) {
        try {
            if (!this.input.data?.[path]) {
                this.validated[path] = this.formatOverride(preset);
                return;
            }
            this.validated[path] = this.formatOverride(lodash_1.merge({ ...preset }, this.input.data[path]));
        }
        catch (e) {
            this.parseError(e);
        }
    }
    checkDuplicateInputParams(inputConfig) {
        let aliases = [];
        for (const key in inputConfig) {
            const param = inputConfig[key];
            if (Array.isArray(param)) {
                aliases = aliases.concat(param);
            }
            else if (typeof inputConfig === 'boolean') {
                return;
            }
            else {
                aliases.push(key);
                if (typeof param === 'object' && 'aliases' in param && Array.isArray(param.aliases)) {
                    aliases = aliases.concat(param.aliases);
                }
            }
        }
        if (aliases.length != new Set(aliases).size) {
            this.throwInvalid('Duplicate Input Aliases');
        }
    }
    validateIncludeOverrides() {
        try {
            this.validated.includes = this.formatIncludeOverrides([
                ...(Array.isArray(this.input.data?.includes) ? this.input.data.includes : []),
                ...(this.validatorOptions.includes || []),
            ]);
        }
        catch (e) {
            this.parseError(e);
        }
    }
    parseError(error) {
        const message = 'Error validating input.';
        if (error instanceof error_1.AdapterError)
            this.error = error;
        else
            this.error = new error_1.AdapterError({
                jobRunID: this.validated.id,
                statusCode: 400,
                message,
                cause: error,
            });
        this.errored = requester_1.Requester.errored(this.validated.id, this.error);
        if (this.validatorOptions.shouldThrowError) {
            throw this.error;
        }
    }
    validateObjectParam(key, shouldThrowError = true) {
        const inputConfig = this.inputConfigs[key];
        const usedKey = this.getUsedKey(key, inputConfig.aliases ?? []);
        const param = usedKey
            ? this.input.data[usedKey] ?? inputConfig.default
            : inputConfig.default;
        if (shouldThrowError) {
            const paramIsDefined = !(param === undefined || param === null || param === '');
            if (inputConfig.required && !paramIsDefined)
                this.throwInvalid(`Required parameter ${key} must be non-null and non-empty`);
            if (paramIsDefined) {
                if (inputConfig.type) {
                    const primitiveTypes = ['boolean', 'number', 'bigint', 'string'];
                    if (![...primitiveTypes, 'array', 'object'].includes(inputConfig.type))
                        this.throwInvalid(`${key} parameter has unrecognized type ${inputConfig.type}`);
                    if (primitiveTypes.includes(inputConfig.type) && typeof param !== inputConfig.type)
                        this.throwInvalid(`${key} parameter must be of type ${inputConfig.type}`);
                    if (inputConfig.type === 'array' && (!Array.isArray(param) || param.length === 0))
                        this.throwInvalid(`${key} parameter must be a non-empty array`);
                    if (inputConfig.type === 'object' &&
                        (!param ||
                            Array.isArray(param) ||
                            typeof param !== inputConfig.type ||
                            Object.keys(param).length === 0))
                        this.throwInvalid(`${key} parameter must be an object with at least one property`);
                }
                if (inputConfig.options) {
                    const tolcase = (o) => (typeof o === 'string' ? o.toLowerCase() : o);
                    const formattedOptions = inputConfig.options.map(tolcase);
                    const formattedParam = tolcase(param);
                    if (!formattedOptions.includes(formattedParam))
                        this.throwInvalid(`${key} parameter '${formattedParam}' is not in the set of available options: ${formattedOptions.join(',')}`);
                }
                for (const dependency of inputConfig.dependsOn ?? []) {
                    const usedDependencyKey = this.getUsedKey(dependency, this.inputConfigs[dependency].aliases ?? []);
                    if (!usedDependencyKey)
                        this.throwInvalid(`${key} dependency ${dependency} not supplied`);
                }
                for (const exclusive of inputConfig.exclusive ?? []) {
                    const usedExclusiveKey = this.getUsedKey(exclusive, this.inputConfigs[exclusive].aliases ?? []);
                    if (usedExclusiveKey)
                        this.throwInvalid(`${key} cannot be supplied concurrently with ${exclusive}`);
                }
            }
        }
        this.validated.data[key] = param;
    }
    validateOptionalParam(param, key, options) {
        if (param && options) {
            if (!Array.isArray(options))
                this.throwInvalid(`Parameter options for ${key} must be of an Array type`);
            if (!options.includes(param))
                this.throwInvalid(`${param} is not a supported ${key} option. Must be one of ${options}`);
        }
        this.validated.data[key] = param;
    }
    validateRequiredParam(param, key, options) {
        if (typeof param === 'undefined' || param === '')
            this.throwInvalid(`Required parameter not supplied: ${key}`);
        if (options) {
            if (!Array.isArray(options))
                this.throwInvalid(`Parameter options for ${key} must be of an Array type`);
            if (!options.includes(param))
                this.throwInvalid(`${param} is not a supported ${key} option. Must be one of ${options.join(' || ')}`);
        }
        this.validated.data[key] = param;
    }
    getUsedKey(key, keyArray) {
        const comparisonArray = [...keyArray];
        if (!comparisonArray.includes(key))
            comparisonArray.push(key);
        const inputParamKeys = Object.keys(this.input.data);
        return inputParamKeys.find((k) => comparisonArray.includes(k));
    }
}
exports.Validator = Validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tb2R1bGVzL3ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBUUEsbUNBQThCO0FBQzlCLGtDQUEyQztBQUMzQyxtQ0FBc0M7QUFDdEMsc0dBQWdFO0FBQ2hFLDJDQUF1QztBQUN2Qyx5Q0FBZ0Q7QUFhaEQsTUFBYSxTQUFTO0lBUXBCLFlBQ0UsUUFBbUIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFDeEMsWUFBWSxHQUFHLEVBQUUsRUFDakIsWUFBWSxHQUFHLEVBQUUsRUFDakIsbUJBQXFDLEVBQUU7UUF3R3pDLG1CQUFjLEdBQUcsQ0FBQyxPQUFlLEVBQUUsTUFBMEIsRUFBcUIsRUFBRTtZQUNsRixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1lBQ3hELElBQUksQ0FBQyxhQUFhO2dCQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtZQUU5RSx1RkFBdUY7WUFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztnQkFBRSxPQUFPLGFBQWEsQ0FBQTtZQUVuRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Z0JBQy9CLE9BQU8sQ0FDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDckYsYUFBYSxDQUNkLENBQUE7WUFDSCxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUE7WUFDN0IsS0FBSyxNQUFNLEdBQUcsSUFBSSxhQUFhLEVBQUU7Z0JBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENB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RyxDQUFDLENBQUE7UUFFN0QsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25ELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7Q0FDRjtBQXBURCw4QkFvVEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZGFwdGVyRXJyb3JSZXNwb25zZSxcbiAgT3ZlcnJpZGUsXG4gIEluY2x1ZGVzLFxuICBJbmNsdWRlUGFpcixcbiAgSW5wdXRQYXJhbWV0ZXIsXG4gIElucHV0UGFyYW1ldGVycyxcbn0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgaXNBcnJheSwgaXNPYmplY3QgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IHsgQWRhcHRlckVycm9yIH0gZnJvbSAnLi9lcnJvcidcbmltcG9ydCBwcmVzZXRUb2tlbnMgZnJvbSAnLi4vY29uZmlnL292ZXJyaWRlcy9wcmVzZXRUb2tlbnMuanNvbidcbmltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJy4vcmVxdWVzdGVyJ1xuaW1wb3J0IHsgYmFzZUlucHV0UGFyYW1ldGVycyB9IGZyb20gJy4vc2VsZWN0b3InXG5cbmV4cG9ydCB0eXBlIE92ZXJyaWRlVHlwZSA9ICdvdmVycmlkZXMnIHwgJ3Rva2VuT3ZlcnJpZGVzJyB8ICdpbmNsdWRlcydcblxudHlwZSBJbnB1dFR5cGUgPSB7XG4gIGlkPzogc3RyaW5nXG4gIGRhdGE/OiBhbnlcbn1cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdG9yT3B0aW9ucyB7XG4gIHNob3VsZFRocm93RXJyb3I/OiBib29sZWFuXG4gIGluY2x1ZGVzPzogYW55W11cbiAgb3ZlcnJpZGVzPzogYW55XG59XG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yIHtcbiAgaW5wdXQ6IElucHV0VHlwZVxuICBpbnB1dENvbmZpZ3M6IElucHV0UGFyYW1ldGVyc1xuICBpbnB1dE9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueVtdPlxuICB2YWxpZGF0b3JPcHRpb25zOiBWYWxpZGF0b3JPcHRpb25zXG4gIHZhbGlkYXRlZDogYW55XG4gIGVycm9yOiBBZGFwdGVyRXJyb3IgfCB1bmRlZmluZWRcbiAgZXJyb3JlZDogQWRhcHRlckVycm9yUmVzcG9uc2UgfCB1bmRlZmluZWRcbiAgY29uc3RydWN0b3IoXG4gICAgaW5wdXQ6IElucHV0VHlwZSA9IHsgaWQ6ICcxJywgZGF0YToge30gfSxcbiAgICBpbnB1dENvbmZpZ3MgPSB7fSxcbiAgICBpbnB1dE9wdGlvbnMgPSB7fSxcbiAgICB2YWxpZGF0b3JPcHRpb25zOiBWYWxpZGF0b3JPcHRpb25zID0ge30sXG4gICkge1xuICAgIHRoaXMuaW5wdXQgPSB7IC4uLmlucHV0IH1cbiAgICBpZiAoIXRoaXMuaW5wdXQuaWQpIHRoaXMuaW5wdXQuaWQgPSAnMScgLy9UT0RPIFBsZWFzZSByZW1vdmUgdGhlc2Ugb25jZSBcIm5vIGFueVwiIHN0cmljdCB0eXBpbmcgaXMgZW5hYmxlZFxuICAgIGlmICghdGhpcy5pbnB1dC5kYXRhKSB0aGlzLmlucHV0LmRhdGEgPSB7fVxuICAgIHRoaXMuaW5wdXRDb25maWdzID0geyAuLi5iYXNlSW5wdXRQYXJhbWV0ZXJzLCAuLi5pbnB1dENvbmZpZ3MgfVxuICAgIHRoaXMuaW5wdXRPcHRpb25zID0geyAuLi5pbnB1dE9wdGlvbnMgfVxuICAgIHRoaXMudmFsaWRhdG9yT3B0aW9ucyA9IHtcbiAgICAgIHNob3VsZFRocm93RXJyb3I6IHRydWUsXG4gICAgICBpbmNsdWRlczogW10sXG4gICAgICBvdmVycmlkZXM6IHt9LFxuICAgICAgLi4udmFsaWRhdG9yT3B0aW9ucyxcbiAgICB9XG4gICAgdGhpcy52YWxpZGF0ZWQgPSB7IGlkOiB0aGlzLmlucHV0LmlkLCBkYXRhOiB7fSB9XG4gICAgdGhpcy52YWxpZGF0ZUlucHV0KClcbiAgICB0aGlzLnZhbGlkYXRlT3ZlcnJpZGVzKCdvdmVycmlkZXMnLCB0aGlzLnZhbGlkYXRvck9wdGlvbnMub3ZlcnJpZGVzKVxuICAgIHRoaXMudmFsaWRhdGVPdmVycmlkZXMoJ3Rva2VuT3ZlcnJpZGVzJywgcHJlc2V0VG9rZW5zKVxuICAgIHRoaXMudmFsaWRhdGVJbmNsdWRlT3ZlcnJpZGVzKClcbiAgICB0aGlzLmNoZWNrRHVwbGljYXRlSW5wdXRQYXJhbXMoaW5wdXRDb25maWdzKVxuICB9XG5cbiAgdmFsaWRhdGVJbnB1dCgpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5pbnB1dENvbmZpZ3MpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuaW5wdXRPcHRpb25zW2tleV1cbiAgICAgICAgY29uc3QgaW5wdXRDb25maWcgPSB0aGlzLmlucHV0Q29uZmlnc1trZXldXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0Q29uZmlnKSkge1xuICAgICAgICAgIC8vIFRPRE8gbW92ZSBhd2F5IGZyb20gYWxpYXMgYXJyYXlzIGluIGZhdm9yIG9mIElucHV0UGFyYW1ldGVyIGNvbmZpZyB0eXBlXG4gICAgICAgICAgY29uc3QgdXNlZEtleSA9IHRoaXMuZ2V0VXNlZEtleShrZXksIGlucHV0Q29uZmlnKVxuICAgICAgICAgIGlmICghdXNlZEtleSkgdGhpcy50aHJvd0ludmFsaWQoYE5vbmUgb2YgYWxpYXNlcyB1c2VkIGZvciByZXF1aXJlZCBrZXkgJHtrZXl9YClcbiAgICAgICAgICB0aGlzLnZhbGlkYXRlUmVxdWlyZWRQYXJhbSh0aGlzLmlucHV0LmRhdGFbdXNlZEtleSBhcyBzdHJpbmddLCBrZXksIG9wdGlvbnMpXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0Q29uZmlnID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAvLyBUT0RPIG1vdmUgYXdheSBmcm9tIHJlcXVpcmVkIFQvRiBpbiBmYXZvciBvZiBJbnB1dFBhcmFtZXRlciBjb25maWcgdHlwZVxuICAgICAgICAgIGlucHV0Q29uZmlnXG4gICAgICAgICAgICA/IHRoaXMudmFsaWRhdGVSZXF1aXJlZFBhcmFtKHRoaXMuaW5wdXQuZGF0YVtrZXldLCBrZXksIG9wdGlvbnMpXG4gICAgICAgICAgICA6IHRoaXMudmFsaWRhdGVPcHRpb25hbFBhcmFtKHRoaXMuaW5wdXQuZGF0YVtrZXldLCBrZXksIG9wdGlvbnMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52YWxpZGF0ZU9iamVjdFBhcmFtKGtleSwgdGhpcy52YWxpZGF0b3JPcHRpb25zLnNob3VsZFRocm93RXJyb3IpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnBhcnNlRXJyb3IoZSlcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZU92ZXJyaWRlcyhwYXRoOiAnb3ZlcnJpZGVzJyB8ICd0b2tlbk92ZXJyaWRlcycsIHByZXNldDogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXRoaXMuaW5wdXQuZGF0YT8uW3BhdGhdKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVkW3BhdGhdID0gdGhpcy5mb3JtYXRPdmVycmlkZShwcmVzZXQpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy52YWxpZGF0ZWRbcGF0aF0gPSB0aGlzLmZvcm1hdE92ZXJyaWRlKG1lcmdlKHsgLi4ucHJlc2V0IH0sIHRoaXMuaW5wdXQuZGF0YVtwYXRoXSkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5wYXJzZUVycm9yKGUpXG4gICAgfVxuICB9XG5cbiAgY2hlY2tEdXBsaWNhdGVJbnB1dFBhcmFtcyhpbnB1dENvbmZpZzogSW5wdXRQYXJhbWV0ZXJzKTogdm9pZCB7XG4gICAgbGV0IGFsaWFzZXM6IHN0cmluZ1tdID0gW11cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBpbnB1dENvbmZpZykge1xuICAgICAgY29uc3QgcGFyYW0gPSBpbnB1dENvbmZpZ1trZXldXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbSkpIHtcbiAgICAgICAgYWxpYXNlcyA9IGFsaWFzZXMuY29uY2F0KHBhcmFtKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXRDb25maWcgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsaWFzZXMucHVzaChrZXkpXG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICdvYmplY3QnICYmICdhbGlhc2VzJyBpbiBwYXJhbSAmJiBBcnJheS5pc0FycmF5KHBhcmFtLmFsaWFzZXMpKSB7XG4gICAgICAgICAgYWxpYXNlcyA9IGFsaWFzZXMuY29uY2F0KHBhcmFtLmFsaWFzZXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFsaWFzZXMubGVuZ3RoICE9IG5ldyBTZXQoYWxpYXNlcykuc2l6ZSkge1xuICAgICAgdGhpcy50aHJvd0ludmFsaWQoJ0R1cGxpY2F0ZSBJbnB1dCBBbGlhc2VzJylcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUluY2x1ZGVPdmVycmlkZXMoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMudmFsaWRhdGVkLmluY2x1ZGVzID0gdGhpcy5mb3JtYXRJbmNsdWRlT3ZlcnJpZGVzKFtcbiAgICAgICAgLi4uKEFycmF5LmlzQXJyYXkodGhpcy5pbnB1dC5kYXRhPy5pbmNsdWRlcykgPyB0aGlzLmlucHV0LmRhdGEuaW5jbHVkZXMgOiBbXSksXG4gICAgICAgIC4uLih0aGlzLnZhbGlkYXRvck9wdGlvbnMuaW5jbHVkZXMgfHwgW10pLFxuICAgICAgXSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnBhcnNlRXJyb3IoZSlcbiAgICB9XG4gIH1cblxuICBwYXJzZUVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSAnRXJyb3IgdmFsaWRhdGluZyBpbnB1dC4nXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQWRhcHRlckVycm9yKSB0aGlzLmVycm9yID0gZXJyb3JcbiAgICBlbHNlXG4gICAgICB0aGlzLmVycm9yID0gbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICAgIGpvYlJ1bklEOiB0aGlzLnZhbGlkYXRlZC5pZCxcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBjYXVzZTogZXJyb3IsXG4gICAgICB9KVxuICAgIHRoaXMuZXJyb3JlZCA9IFJlcXVlc3Rlci5lcnJvcmVkKHRoaXMudmFsaWRhdGVkLmlkLCB0aGlzLmVycm9yKVxuICAgIGlmICh0aGlzLnZhbGlkYXRvck9wdGlvbnMuc2hvdWxkVGhyb3dFcnJvcikge1xuICAgICAgdGhyb3cgdGhpcy5lcnJvclxuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlU3ltYm9sID0gKGFkYXB0ZXI6IHN0cmluZywgc3ltYm9sPzogc3RyaW5nIHwgc3RyaW5nW10pOiBzdHJpbmcgfCBzdHJpbmdbXSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFN5bWJvbCA9IHN5bWJvbCB8fCB0aGlzLnZhbGlkYXRlZC5kYXRhLmJhc2VcbiAgICBpZiAoIWRlZmF1bHRTeW1ib2wpIHRoaXMudGhyb3dJbnZhbGlkKGBSZXF1aXJlZCBwYXJhbWV0ZXIgbm90IHN1cHBsaWVkOiBiYXNlYClcblxuICAgIC8vIFRPRE86IFdpbGwgbmV2ZXIgYmUgcmVhY2hlZCwgYmVjYXVzZSB0aGUgcHJlc2V0U3ltYm9scyBhcmUgdXNlZCBhcyBkZWZhdWx0IG92ZXJyaWRlc1xuICAgIGlmICghdGhpcy52YWxpZGF0ZWQub3ZlcnJpZGVzKSByZXR1cm4gZGVmYXVsdFN5bWJvbFxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRlZmF1bHRTeW1ib2wpKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy52YWxpZGF0ZWQub3ZlcnJpZGVzLmdldChhZGFwdGVyLnRvTG93ZXJDYXNlKCkpPy5nZXQoZGVmYXVsdFN5bWJvbC50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICBkZWZhdWx0U3ltYm9sXG4gICAgICApXG4gICAgY29uc3QgbXVsdGlwbGU6IHN0cmluZ1tdID0gW11cbiAgICBmb3IgKGNvbnN0IHN5bSBvZiBkZWZhdWx0U3ltYm9sKSB7XG4gICAgICBjb25zdCBvdmVycmlkZWQgPSB0aGlzLnZhbGlkYXRlZC5vdmVycmlkZXMuZ2V0KGFkYXB0ZXIudG9Mb3dlckNhc2UoKSk/LmdldChzeW0udG9Mb3dlckNhc2UoKSlcbiAgICAgIGlmICghb3ZlcnJpZGVkKSBtdWx0aXBsZS5wdXNoKHN5bSlcbiAgICAgIGVsc2UgbXVsdGlwbGUucHVzaChvdmVycmlkZWQpXG4gICAgfVxuICAgIHJldHVybiBtdWx0aXBsZVxuICB9XG5cbiAgb3ZlcnJpZGVUb2tlbiA9IChzeW1ib2w6IHN0cmluZywgbmV0d29yayA9ICdldGhlcmV1bScpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICAgIHJldHVybiB0aGlzLnZhbGlkYXRlZC50b2tlbk92ZXJyaWRlcz8uZ2V0KG5ldHdvcmsudG9Mb3dlckNhc2UoKSk/LmdldChzeW1ib2wudG9Mb3dlckNhc2UoKSlcbiAgfVxuXG4gIG92ZXJyaWRlSW5jbHVkZXMgPSAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogSW5jbHVkZVBhaXIgfCB1bmRlZmluZWQgPT4ge1xuICAgIC8vIFNlYXJjaCB0aHJvdWdoIGBwcmVzZXRJbmNsdWRlc2AgdG8gZmluZCBtYXRjaGluZyBvdmVycmlkZSBmb3IgYWRhcHRlciBhbmQgdG8vZnJvbSBwYWlyaW5nLlxuICAgIGNvbnN0IHBhaXJzID0gKFxuICAgICAgdGhpcy52YWxpZGF0ZWQuaW5jbHVkZXM/LmZpbHRlcihcbiAgICAgICAgKHZhbDogc3RyaW5nIHwgSW5jbHVkZXMpID0+IHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnLFxuICAgICAgKSBhcyBJbmNsdWRlc1tdXG4gICAgKS5maWx0ZXIoXG4gICAgICAocGFpcikgPT5cbiAgICAgICAgcGFpci5mcm9tLnRvTG93ZXJDYXNlKCkgPT09IGZyb20udG9Mb3dlckNhc2UoKSAmJlxuICAgICAgICBwYWlyLnRvLnRvTG93ZXJDYXNlKCkgPT09IHRvLnRvTG93ZXJDYXNlKCksXG4gICAgKVxuICAgIGlmICghcGFpcnMgfHwgIXBhaXJzWzBdIHx8ICFwYWlyc1swXS5pbmNsdWRlcyB8fCAhcGFpcnNbMF0uaW5jbHVkZXNbMF0pIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICByZXR1cm4gcGFpcnNbMF0uaW5jbHVkZXNbMF1cbiAgfVxuXG4gIG92ZXJyaWRlUmV2ZXJzZUxvb2t1cCA9IChhZGFwdGVyOiBzdHJpbmcsIHR5cGU6IE92ZXJyaWRlVHlwZSwgc3ltYm9sOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IG92ZXJyaWRlczogTWFwPHN0cmluZywgc3RyaW5nPiB8IHVuZGVmaW5lZCA9IHRoaXMudmFsaWRhdGVkPy5bdHlwZV0/LmdldChcbiAgICAgIGFkYXB0ZXIudG9Mb3dlckNhc2UoKSxcbiAgICApXG4gICAgaWYgKCFvdmVycmlkZXMpIHJldHVybiBzeW1ib2xcbiAgICBsZXQgb3JpZ2luYWxTeW1ib2w6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgIG92ZXJyaWRlcy5mb3JFYWNoKChvdmVycmlkZGVuLCBvcmlnaW5hbCkgPT4ge1xuICAgICAgaWYgKG92ZXJyaWRkZW4udG9Mb3dlckNhc2UoKSA9PT0gc3ltYm9sLnRvTG93ZXJDYXNlKCkpIG9yaWdpbmFsU3ltYm9sID0gb3JpZ2luYWxcbiAgICB9KVxuICAgIHJldHVybiBvcmlnaW5hbFN5bWJvbCB8fCBzeW1ib2xcbiAgfVxuXG4gIGZvcm1hdE92ZXJyaWRlID0gKHBhcmFtOiBhbnkpOiBPdmVycmlkZSA9PiB7XG4gICAgY29uc3QgX3Rocm93SW52YWxpZCA9ICgpID0+XG4gICAgICB0aGlzLnRocm93SW52YWxpZChgUGFyYW1ldGVyIHN1cHBsaWVkIHdpdGggd3JvbmcgZm9ybWF0OiBcIm92ZXJyaWRlXCJgKVxuXG4gICAgaWYgKCFpc09iamVjdChwYXJhbSkpIF90aHJvd0ludmFsaWQoKVxuXG4gICAgY29uc3QgX2lzVmFsaWQgPSBPYmplY3QudmFsdWVzKHBhcmFtKS5ldmVyeShpc09iamVjdClcbiAgICBpZiAoIV9pc1ZhbGlkKSBfdGhyb3dJbnZhbGlkKClcblxuICAgIGNvbnN0IF9rZXlUb0xvd2VyQ2FzZSA9IChlbnRyeTogW3N0cmluZywgYW55XSk6IFtzdHJpbmcsIGFueV0gPT4ge1xuICAgICAgcmV0dXJuIFtlbnRyeVswXS50b0xvd2VyQ2FzZSgpLCBlbnRyeVsxXV1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBPYmplY3QuZW50cmllcyhwYXJhbSlcbiAgICAgICAgLm1hcChfa2V5VG9Mb3dlckNhc2UpXG4gICAgICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4gW2tleSwgbmV3IE1hcChPYmplY3QuZW50cmllcyh2YWx1ZSkubWFwKF9rZXlUb0xvd2VyQ2FzZSkpXSksXG4gICAgKVxuICB9XG5cbiAgZm9ybWF0SW5jbHVkZU92ZXJyaWRlcyA9IChwYXJhbTogYW55KTogT3ZlcnJpZGUgPT4ge1xuICAgIGNvbnN0IF90aHJvd0ludmFsaWQgPSAoKSA9PlxuICAgICAgdGhpcy50aHJvd0ludmFsaWQoYFBhcmFtZXRlciBzdXBwbGllZCB3aXRoIHdyb25nIGZvcm1hdDogXCJpbmNsdWRlc1wiYClcbiAgICBpZiAoIWlzQXJyYXkocGFyYW0pKSBfdGhyb3dJbnZhbGlkKClcblxuICAgIGNvbnN0IF9pc1ZhbGlkID0gT2JqZWN0LnZhbHVlcyhwYXJhbSkuZXZlcnkoKHZhbCkgPT4gaXNPYmplY3QodmFsKSB8fCB0eXBlb2YgdmFsID09PSAnc3RyaW5nJylcbiAgICBpZiAoIV9pc1ZhbGlkKSBfdGhyb3dJbnZhbGlkKClcblxuICAgIHJldHVybiBwYXJhbVxuICB9XG5cbiAgdGhyb3dJbnZhbGlkID0gKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3IoeyBqb2JSdW5JRDogdGhpcy52YWxpZGF0ZWQuaWQsIHN0YXR1c0NvZGU6IDQwMCwgbWVzc2FnZSB9KVxuICB9XG5cbiAgdmFsaWRhdGVPYmplY3RQYXJhbShrZXk6IHN0cmluZywgc2hvdWxkVGhyb3dFcnJvciA9IHRydWUpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dENvbmZpZyA9IHRoaXMuaW5wdXRDb25maWdzW2tleV0gYXMgSW5wdXRQYXJhbWV0ZXJcbiAgICBjb25zdCB1c2VkS2V5ID0gdGhpcy5nZXRVc2VkS2V5KGtleSwgaW5wdXRDb25maWcuYWxpYXNlcyA/PyBbXSlcblxuICAgIGNvbnN0IHBhcmFtID0gdXNlZEtleVxuICAgICAgPyB0aGlzLmlucHV0LmRhdGFbdXNlZEtleSBhcyBzdHJpbmddID8/IGlucHV0Q29uZmlnLmRlZmF1bHRcbiAgICAgIDogaW5wdXRDb25maWcuZGVmYXVsdFxuXG4gICAgaWYgKHNob3VsZFRocm93RXJyb3IpIHtcbiAgICAgIGNvbnN0IHBhcmFtSXNEZWZpbmVkID0gIShwYXJhbSA9PT0gdW5kZWZpbmVkIHx8IHBhcmFtID09PSBudWxsIHx8IHBhcmFtID09PSAnJylcblxuICAgICAgaWYgKGlucHV0Q29uZmlnLnJlcXVpcmVkICYmICFwYXJhbUlzRGVmaW5lZClcbiAgICAgICAgdGhpcy50aHJvd0ludmFsaWQoYFJlcXVpcmVkIHBhcmFtZXRlciAke2tleX0gbXVzdCBiZSBub24tbnVsbCBhbmQgbm9uLWVtcHR5YClcblxuICAgICAgaWYgKHBhcmFtSXNEZWZpbmVkKSB7XG4gICAgICAgIGlmIChpbnB1dENvbmZpZy50eXBlKSB7XG4gICAgICAgICAgY29uc3QgcHJpbWl0aXZlVHlwZXMgPSBbJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2JpZ2ludCcsICdzdHJpbmcnXVxuXG4gICAgICAgICAgaWYgKCFbLi4ucHJpbWl0aXZlVHlwZXMsICdhcnJheScsICdvYmplY3QnXS5pbmNsdWRlcyhpbnB1dENvbmZpZy50eXBlKSlcbiAgICAgICAgICAgIHRoaXMudGhyb3dJbnZhbGlkKGAke2tleX0gcGFyYW1ldGVyIGhhcyB1bnJlY29nbml6ZWQgdHlwZSAke2lucHV0Q29uZmlnLnR5cGV9YClcblxuICAgICAgICAgIGlmIChwcmltaXRpdmVUeXBlcy5pbmNsdWRlcyhpbnB1dENvbmZpZy50eXBlKSAmJiB0eXBlb2YgcGFyYW0gIT09IGlucHV0Q29uZmlnLnR5cGUpXG4gICAgICAgICAgICB0aGlzLnRocm93SW52YWxpZChgJHtrZXl9IHBhcmFtZXRlciBtdXN0IGJlIG9mIHR5cGUgJHtpbnB1dENvbmZpZy50eXBlfWApXG5cbiAgICAgICAgICBpZiAoaW5wdXRDb25maWcudHlwZSA9PT0gJ2FycmF5JyAmJiAoIUFycmF5LmlzQXJyYXkocGFyYW0pIHx8IHBhcmFtLmxlbmd0aCA9PT0gMCkpXG4gICAgICAgICAgICB0aGlzLnRocm93SW52YWxpZChgJHtrZXl9IHBhcmFtZXRlciBtdXN0IGJlIGEgbm9uLWVtcHR5IGFycmF5YClcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGlucHV0Q29uZmlnLnR5cGUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAoIXBhcmFtIHx8XG4gICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocGFyYW0pIHx8XG4gICAgICAgICAgICAgIHR5cGVvZiBwYXJhbSAhPT0gaW5wdXRDb25maWcudHlwZSB8fFxuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhwYXJhbSkubGVuZ3RoID09PSAwKVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHRoaXMudGhyb3dJbnZhbGlkKGAke2tleX0gcGFyYW1ldGVyIG11c3QgYmUgYW4gb2JqZWN0IHdpdGggYXQgbGVhc3Qgb25lIHByb3BlcnR5YClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dENvbmZpZy5vcHRpb25zKSB7XG4gICAgICAgICAgY29uc3QgdG9sY2FzZSA9IChvOiBhbnkpID0+ICh0eXBlb2YgbyA9PT0gJ3N0cmluZycgPyBvLnRvTG93ZXJDYXNlKCkgOiBvKVxuXG4gICAgICAgICAgY29uc3QgZm9ybWF0dGVkT3B0aW9ucyA9IGlucHV0Q29uZmlnLm9wdGlvbnMubWFwKHRvbGNhc2UpXG4gICAgICAgICAgY29uc3QgZm9ybWF0dGVkUGFyYW0gPSB0b2xjYXNlKHBhcmFtKVxuXG4gICAgICAgICAgaWYgKCFmb3JtYXR0ZWRPcHRpb25zLmluY2x1ZGVzKGZvcm1hdHRlZFBhcmFtKSlcbiAgICAgICAgICAgIHRoaXMudGhyb3dJbnZhbGlkKFxuICAgICAgICAgICAgICBgJHtrZXl9IHBhcmFtZXRlciAnJHtmb3JtYXR0ZWRQYXJhbX0nIGlzIG5vdCBpbiB0aGUgc2V0IG9mIGF2YWlsYWJsZSBvcHRpb25zOiAke2Zvcm1hdHRlZE9wdGlvbnMuam9pbihcbiAgICAgICAgICAgICAgICAnLCcsXG4gICAgICAgICAgICAgICl9YCxcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeSBvZiBpbnB1dENvbmZpZy5kZXBlbmRzT24gPz8gW10pIHtcbiAgICAgICAgICBjb25zdCB1c2VkRGVwZW5kZW5jeUtleSA9IHRoaXMuZ2V0VXNlZEtleShcbiAgICAgICAgICAgIGRlcGVuZGVuY3ksXG4gICAgICAgICAgICAodGhpcy5pbnB1dENvbmZpZ3NbZGVwZW5kZW5jeV0gYXMgSW5wdXRQYXJhbWV0ZXIpLmFsaWFzZXMgPz8gW10sXG4gICAgICAgICAgKVxuICAgICAgICAgIGlmICghdXNlZERlcGVuZGVuY3lLZXkpIHRoaXMudGhyb3dJbnZhbGlkKGAke2tleX0gZGVwZW5kZW5jeSAke2RlcGVuZGVuY3l9IG5vdCBzdXBwbGllZGApXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGV4Y2x1c2l2ZSBvZiBpbnB1dENvbmZpZy5leGNsdXNpdmUgPz8gW10pIHtcbiAgICAgICAgICBjb25zdCB1c2VkRXhjbHVzaXZlS2V5ID0gdGhpcy5nZXRVc2VkS2V5KFxuICAgICAgICAgICAgZXhjbHVzaXZlLFxuICAgICAgICAgICAgKHRoaXMuaW5wdXRDb25maWdzW2V4Y2x1c2l2ZV0gYXMgSW5wdXRQYXJhbWV0ZXIpLmFsaWFzZXMgPz8gW10sXG4gICAgICAgICAgKVxuICAgICAgICAgIGlmICh1c2VkRXhjbHVzaXZlS2V5KVxuICAgICAgICAgICAgdGhpcy50aHJvd0ludmFsaWQoYCR7a2V5fSBjYW5ub3QgYmUgc3VwcGxpZWQgY29uY3VycmVudGx5IHdpdGggJHtleGNsdXNpdmV9YClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudmFsaWRhdGVkLmRhdGFba2V5XSA9IHBhcmFtXG4gIH1cblxuICB2YWxpZGF0ZU9wdGlvbmFsUGFyYW0ocGFyYW06IGFueSwga2V5OiBzdHJpbmcsIG9wdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKHBhcmFtICYmIG9wdGlvbnMpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zKSlcbiAgICAgICAgdGhpcy50aHJvd0ludmFsaWQoYFBhcmFtZXRlciBvcHRpb25zIGZvciAke2tleX0gbXVzdCBiZSBvZiBhbiBBcnJheSB0eXBlYClcbiAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhwYXJhbSkpXG4gICAgICAgIHRoaXMudGhyb3dJbnZhbGlkKGAke3BhcmFtfSBpcyBub3QgYSBzdXBwb3J0ZWQgJHtrZXl9IG9wdGlvbi4gTXVzdCBiZSBvbmUgb2YgJHtvcHRpb25zfWApXG4gICAgfVxuICAgIHRoaXMudmFsaWRhdGVkLmRhdGFba2V5XSA9IHBhcmFtXG4gIH1cblxuICB2YWxpZGF0ZVJlcXVpcmVkUGFyYW0ocGFyYW06IGFueSwga2V5OiBzdHJpbmcsIG9wdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbSA9PT0gJ3VuZGVmaW5lZCcgfHwgcGFyYW0gPT09ICcnKVxuICAgICAgdGhpcy50aHJvd0ludmFsaWQoYFJlcXVpcmVkIHBhcmFtZXRlciBub3Qgc3VwcGxpZWQ6ICR7a2V5fWApXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zKSlcbiAgICAgICAgdGhpcy50aHJvd0ludmFsaWQoYFBhcmFtZXRlciBvcHRpb25zIGZvciAke2tleX0gbXVzdCBiZSBvZiBhbiBBcnJheSB0eXBlYClcbiAgICAgIGlmICghb3B0aW9ucy5pbmNsdWRlcyhwYXJhbSkpXG4gICAgICAgIHRoaXMudGhyb3dJbnZhbGlkKFxuICAgICAgICAgIGAke3BhcmFtfSBpcyBub3QgYSBzdXBwb3J0ZWQgJHtrZXl9IG9wdGlvbi4gTXVzdCBiZSBvbmUgb2YgJHtvcHRpb25zLmpvaW4oJyB8fCAnKX1gLFxuICAgICAgICApXG4gICAgfVxuICAgIHRoaXMudmFsaWRhdGVkLmRhdGFba2V5XSA9IHBhcmFtXG4gIH1cblxuICBnZXRVc2VkS2V5KGtleTogc3RyaW5nLCBrZXlBcnJheTogc3RyaW5nW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvbXBhcmlzb25BcnJheSA9IFsuLi5rZXlBcnJheV1cbiAgICBpZiAoIWNvbXBhcmlzb25BcnJheS5pbmNsdWRlcyhrZXkpKSBjb21wYXJpc29uQXJyYXkucHVzaChrZXkpXG5cbiAgICBjb25zdCBpbnB1dFBhcmFtS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuaW5wdXQuZGF0YSlcbiAgICByZXR1cm4gaW5wdXRQYXJhbUtleXMuZmluZCgoaykgPT4gY29tcGFyaXNvbkFycmF5LmluY2x1ZGVzKGspKVxuICB9XG59XG4iXX0=