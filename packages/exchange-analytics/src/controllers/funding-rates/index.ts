import execute from './controller'
import { inputParameters } from './input'

const supportedEndpoints = ['funding-rates']
const endpointResultPaths = {}
const description = 'This endpoint returns the funding rates for ETH or BTC paired with USD.'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
