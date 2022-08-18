import execute from './controller'
import { inputParameters } from './input'

const supportedEndpoints = ['address']
const endpointResultPaths = {}
const description = 'This endpoint checks if an Ethereum or Bitcoin address is sanctioned.'

export { supportedEndpoints, endpointResultPaths, description, inputParameters, execute }
