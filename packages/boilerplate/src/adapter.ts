import { Builder } from '@chainlink/ea-bootstrap'
import {
  APIEndpoint,
  AdapterRequest,
  Config,
  ExecuteFactory,
  ExecuteWithConfig,
} from '@chainlink/types'

import { makeConfig } from './config'
import * as endpoints from './controllers'

export const execute: ExecuteWithConfig<Config> = async (request, context, config) => {
  return Builder.buildSelector(request, context, config, endpoints)
}

export const endpointSelector = (request: AdapterRequest): APIEndpoint =>
  Builder.selectEndpoint(request, makeConfig(), endpoints)

export const makeExecute: ExecuteFactory<Config> = (config) => {
  return async (request, context) => execute(request, context, config || makeConfig())
}
