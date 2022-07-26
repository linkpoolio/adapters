import execute from './controller'
import { inputParameters } from './input'

const supportedEndpoints = ['jobs']
const endpointResultPaths = {}
const description = 'This endpoint returns a single job.'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
