import execute from './controller'
import { inputParameters } from './input'

const supportedEndpoints = ['valuations']
const endpointResultPaths = {}
const description = 'This endpoint returns the valuation (price estimate) for a given NFT'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
