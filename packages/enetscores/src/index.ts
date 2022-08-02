import { expose } from '@chainlink/ea-bootstrap'

import { endpointSelector, makeExecute } from './adapter'
import { NAME, makeConfig } from './config'
import * as rateLimit from './config/limits.json'
import * as endpoints from './endpoint'
import type * as types from './lib/types'

const adapterContext = { name: NAME, rateLimit }

const { server } = expose(adapterContext, makeExecute(), undefined, endpointSelector)
export { NAME, makeExecute, makeConfig, server, types, endpoints }
