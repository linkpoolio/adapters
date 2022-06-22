import { Requester, util } from '@chainlink/ea-bootstrap'
import { Config as ChainlinkConfig } from '@chainlink/types'

export const NAME = 'WAVEBRIDGE'
export const DEFAULT_BASE_URL = 'https://idx-api.wavebridgeindex.com'
export const DEV_BASE_URL = 'https://sandbox-api.wavebridgeindex.com'

export type Config = ChainlinkConfig & {
  apiCorpCode?: string
}

export const makeConfig = (prefix?: string): Config => {
  const config: Config = Requester.getDefaultConfig(prefix)
  config.apiKey = util.getRequiredEnv('API_KEY', prefix)
  config.apiCorpCode = util.getRequiredEnv('API_CORP_CODE', prefix)
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL

  return config
}
