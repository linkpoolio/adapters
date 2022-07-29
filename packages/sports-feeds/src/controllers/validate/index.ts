import execute from './controller'
import { inputParameters } from './input'

const supportedEndpoints = ['validate']
const endpointResultPaths = {}
const description = 'This endpoint returns a validation of aggregated data.'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
