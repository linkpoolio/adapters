import { expose } from '@chainlink/ea-bootstrap'

import { endpointSelector, makeExecute } from './adapter'
import { NAME, makeConfig } from './config'
import * as endpoints from './endpoint'

const adapterContext = { name: NAME }

const { server } = expose(adapterContext, makeExecute(), undefined, endpointSelector)
export { NAME, makeExecute, makeConfig, server, endpoints }
