import { Config } from '@chainlink/types'

export interface ApiProviderConfig extends Config {
  apiProvider: string
}

export interface ApiProviderConfigCiphertrace extends ApiProviderConfig {
  s3Client: {
    accessKey: string
    secretKey: string
  }
}

export type SupportedApiProviderConfig = ApiProviderConfigCiphertrace
