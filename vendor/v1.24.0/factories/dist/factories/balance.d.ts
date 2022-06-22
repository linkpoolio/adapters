import { Account, Config, DataResponse, ExecuteFactory, InputParameters } from '@chainlink/types';
export declare type IsSupported = (coin: string, chain: string) => boolean;
export declare type BalancesResponse = DataResponse<Account[], any>;
export declare type GetBalance = (account: Account, config: BalanceConfig) => Promise<BalancesResponse>;
export declare type GetBalances = (accounts: Account[], config: BalanceConfig) => Promise<BalancesResponse>;
declare type BaseBalanceConfig = Config & {
    confirmations?: number;
    isSupported: IsSupported;
    getBalance?: GetBalance;
    getBalances?: GetBalances;
};
declare type SingleBalanceConfig = BaseBalanceConfig & {
    getBalance: GetBalance;
    getBalances?: never;
};
declare type BatchBalanceConfig = BaseBalanceConfig & {
    getBalance?: never;
    getBalances: GetBalances;
};
export declare type BalanceConfig = SingleBalanceConfig | BatchBalanceConfig;
export declare const inputParameters: InputParameters;
export declare const make: ExecuteFactory<BalanceConfig>;
export {};
//# sourceMappingURL=balance.d.ts.map