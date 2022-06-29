import { Requester, util } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

export const NAME = 'NFT_METRICS'

export const DEFAULT_ENDPOINT = 'tami'
export const DEFAULT_BASE_URL = 'https://api.market.link'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  const access = util.getRequiredEnv('ACCESS_KEY', prefix) as string
  const secret = util.getRequiredEnv('SECRET_KEY', prefix) as string
  config.api.headers = {
    ...config.api.headers,
    'x-access-key-id': access,
    'x-secret-key': secret,
  }
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL
  config.defaultEndpoint = DEFAULT_ENDPOINT
  return config
}
