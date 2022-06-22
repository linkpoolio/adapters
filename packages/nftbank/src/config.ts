import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

export const NAME = 'NFTBANK'

export const DEFAULT_ENDPOINT = 'estimate'
export const DEFAULT_BASE_URL = 'https://api.nftbank.ai/'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix, true)
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL
  config.api.headers['x-api-key'] = config.apiKey
  config.defaultEndpoint = DEFAULT_ENDPOINT
  return config
}
