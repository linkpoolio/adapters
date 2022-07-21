import execute from './controller'
import inputParameters from './input'

const supportedEndpoints = ['coins']
const endpointResultPaths = {}
const description = 'This endpoint returns a list of all coins.'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
