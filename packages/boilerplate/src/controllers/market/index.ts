import execute from './controller'
import inputParameters from './input'

const supportedEndpoints = ['market']
const endpointResultPaths = {}
const description = 'This endpoint returns the price for one symbol against another symbol.'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
