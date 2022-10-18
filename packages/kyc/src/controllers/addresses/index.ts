import execute from './controller'
import { inputParameters } from './input'

const supportedEndpoints = ['addresses']
const endpointResultPaths = {}
const description = 'This endpoint returns the address details, e.g. KYC, AML'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
