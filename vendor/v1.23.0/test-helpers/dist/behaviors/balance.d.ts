import { Execute } from '@chainlink/types';
declare type Network = 'bitcoin_mainnet' | 'bitcoin_testnet' | 'ethereum_mainnet' | 'ethereum_testnet' | 'bitcoin_cash_mainnet' | 'bitcoin_cash_testnet' | 'bitcoin_sv_mainnet' | 'bitcoin_sv_testnet' | 'ethereum_classic_mainnet' | 'ethereum_classic_testnet' | 'litecoin_mainnet' | 'litecoin_testnet' | 'zcash_mainnet' | 'zcash_testnet' | 'zilliqa_mainnet' | 'zilliqa_testnet' | 'doge_mainnet' | 'doge_testnet' | 'dash_mainnet' | 'dash_testnet' | 'groestlcoin_mainnet';
export declare function shouldBehaveLikeBalanceAdapter(execute: Execute, networks: Network[]): void;
export {};
//# sourceMappingURL=balance.d.ts.map