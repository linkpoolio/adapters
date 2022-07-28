import execute from './controller'
import { inputParameters } from './input'

const supportedEndpoints = ['floorprices']
const endpointResultPaths = {}
const description = 'This endpoint returns the floor price for a given NFT collection'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
