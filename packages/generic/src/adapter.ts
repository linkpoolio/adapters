import { Builder } from '@chainlink/ea-bootstrap'
import type {
  APIEndpoint,
  AdapterRequest,
  ExecuteFactory,
  ExecuteWithConfig,
} from '@chainlink/types'

import { makeConfig } from './config'
import * as endpoints from './endpoint'
import type { Config } from './lib/types'

export const execute: ExecuteWithConfig<Config> = async (request, context, config) => {
  return Builder.buildSelector(request, context, config, endpoints)
}

export const endpointSelector = (request: AdapterRequest): APIEndpoint =>
  Builder.selectEndpoint(request, makeConfig() as Config, endpoints)

export const makeExecute: ExecuteFactory<Config> = (config) => {
  return async (request, context) => execute(request, context, config || makeConfig())
}
