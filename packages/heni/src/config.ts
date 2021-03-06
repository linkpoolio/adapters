import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

export const NAME = 'HENI'

export const DEFAULT_ENDPOINT = 'price'
export const DEFAULT_BASE_URL = 'https://api.nftoracle.heni.com/'

export const makeConfig = (prefix?: string): Config => {
  const requireKey = true
  const config = Requester.getDefaultConfig(prefix, requireKey)
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL
  config.defaultEndpoint = DEFAULT_ENDPOINT
  return config
}
