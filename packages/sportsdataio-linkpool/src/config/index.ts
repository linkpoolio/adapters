import { Requester } from '@chainlink/ea-bootstrap'
import type { Config } from '@chainlink/types'

export const NAME = 'SPORTSDATAIO_LINKPOOL'

export const DEFAULT_BASE_URL = 'https://api.sportsdata.io/v3'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL
  return config
}
