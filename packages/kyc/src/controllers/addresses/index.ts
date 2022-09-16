import execute from './controller'
import { inputParameters } from './input'

const supportedEndpoints = ['addresses']
const endpointResultPaths = {}
const description = 'This endpoint returns the KYC status of an address'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
