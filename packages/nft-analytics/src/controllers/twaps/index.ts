import execute from './controller'
import { inputParameters } from './input'

const supportedEndpoints = ['twaps']
const endpointResultPaths = {}
const description = 'This endpoint returns the TWAP for a given NFT collection'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
