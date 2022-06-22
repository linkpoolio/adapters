import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

export const NAME = 'CRD_NETWORK'
export const DEFAULT_BASE_URL = 'https://api.crdtoken.org'
export const DEV_BASE_URL = 'https://api.crd.my-new-site.com'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL
  config.api.headers['Authorization'] = config.apiKey

  return config
}
