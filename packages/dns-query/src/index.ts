import { expose } from '@chainlink/ea-bootstrap'

import { makeExecute } from './adapter'
import { NAME, makeConfig } from './config'
import rateLimit from './config/limits.json'

const adapterContext = { name: NAME, rateLimit }

const { server } = expose(adapterContext, makeExecute())
export { NAME, makeConfig, makeExecute, server }
