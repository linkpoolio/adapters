import { Config } from '@chainlink/types'

export interface ApiProviderConfig extends Config {
  apiProvider: string
}

export type BinanceApiProviderConfig = ApiProviderConfig
export type BybitApiProviderConfig = ApiProviderConfig
export type FtxApiProviderConfig = ApiProviderConfig

export type SupportedApiProviderConfig =
  | BinanceApiProviderConfig
  | BybitApiProviderConfig
  | FtxApiProviderConfig
