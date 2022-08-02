import { Logger, Requester } from '@chainlink/ea-bootstrap'
import { Config as ChainlinkConfig } from '@chainlink/types'

import { getGenericConfig } from './lib/generic-config'
import type { Config, GenericConfig } from './lib/types'

export const DEFAULT_ENDPOINT = 'generic-request'
export const NAME = 'GENERIC'

export const makeConfig = (prefix?: string): Config => {
  prefix = prefix ?? process.env.GENERIC_PREFIX

  let genericConfig: GenericConfig
  try {
    genericConfig = getGenericConfig(prefix) as GenericConfig
  } catch (error) {
    const message = (error as Error).message
    const stack = (error as Error).stack
    Logger.error('Error in getGenericConfig()', { error, message, stack })

    throw error
  }

  const config: Config = {
    ...(Requester.getDefaultConfig(prefix) as ChainlinkConfig),
    genericConfig,
  }
  config.defaultEndpoint = DEFAULT_ENDPOINT

  return config
}
