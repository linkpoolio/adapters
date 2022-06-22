import { Requester, util } from '@chainlink/ea-bootstrap'
import type { Config } from '@chainlink/types'

export const NAME = 'ENETSCORES'
export const DEFAULT_BASE_URL = 'https://eapi.enetpulse.com/'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  const username = util.getRequiredEnv('API_USERNAME', prefix) as string
  const token = util.getRequiredEnv('API_TOKEN', prefix) as string
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL
  config.api.params = {
    token,
    username,
  }
  return config
}
