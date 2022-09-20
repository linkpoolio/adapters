import { Config } from '@chainlink/types'

export interface ApiProviderConfig extends Config {
  apiProvider: string
}

export interface CiphertraceApiProviderConfig extends ApiProviderConfig {
  s3Client: {
    accessKey: string
    secretKey: string
  }
}

export type EverestApiProviderConfig = ApiProviderConfig

export type SupportedApiProviderConfig = CiphertraceApiProviderConfig | EverestApiProviderConfig
