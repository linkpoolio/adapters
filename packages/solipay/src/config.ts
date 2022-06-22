import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

export const NAME = 'SOLIPAY'

export const DEFAULT_ENDPOINT = 'contains-most-visited-location'
export const DEFAULT_BASE_URL = 'https://autocloud.solipay.tech/chainlink'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL
  config.defaultEndpoint = DEFAULT_ENDPOINT
  return config
}
