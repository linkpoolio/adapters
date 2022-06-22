import type { CoinsResponse } from '@chainlink/types';
export declare class Overrider {
    adapterName: string;
    adapterOverrides: AdapterOverrides;
    internalOverrides: OverrideObj;
    inputOverrides: OverrideObj;
    constructor(internalOverrides: unknown, inputOverrides: unknown, adapterName: string, jobRunID: string);
    performOverrides: (requestedSymbols: RequestedSymbols) => [OverriddenCoins, RemainingSymbols];
    static convertRemainingSymbolsToIds: (overriddenCoins: OverriddenCoins | undefined, remainingSyms: RequestedSymbols, coinsResponse: CoinsResponse[]) => RequestedCoins;
    /** Creates an object that maps from the overridden symbol/id
        to the symbol that was originally requested */
    static invertRequestedCoinsObject: (requestedCoins: RequestedCoins) => OverrideToOriginalSymbol;
    static isOverrideObj: (obj: unknown) => obj is OverrideObj;
    private combineOverrides;
}
declare type AdapterOverrides = {
    [symbol: string]: string;
};
export declare type OverrideObj = {
    [adapterName: string]: AdapterOverrides;
};
declare type OverriddenCoins = {
    [symbol: string]: string;
};
declare type RequestedCoins = {
    [symbol: string]: string;
};
export declare type OverrideToOriginalSymbol = {
    [id: string]: string;
};
declare type RequestedSymbols = string | string[];
declare type RemainingSymbols = string[];
export {};
//# sourceMappingURL=overrider.d.ts.map