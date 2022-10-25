import { Config } from '@chainlink/types'

export interface ApiProviderConfig extends Config {
  apiProvider: string
}

export type BitscrunchApiProviderConfig = ApiProviderConfig

export type NftperpApiProviderConfig = ApiProviderConfig

export type RarifyApiProviderConfig = ApiProviderConfig

export type SupportedApiProviderConfig =
  | BitscrunchApiProviderConfig
  | NftperpApiProviderConfig
  | RarifyApiProviderConfig
