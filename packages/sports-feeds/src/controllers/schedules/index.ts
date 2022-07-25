import execute from './controller'
import inputParameters from './input'

const supportedEndpoints = ['schedules']
const endpointResultPaths = {}
const description = 'This endpoint returns a list of all schedules.'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
