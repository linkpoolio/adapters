import { Requester } from '@chainlink/ea-bootstrap'
import type { Config } from '@chainlink/types'

export const NAME = 'AP_SPORTS'
export const DEFAULT_BASE_URL = 'https://api.sportradar.us/'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix, true)
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL
  return config
}
