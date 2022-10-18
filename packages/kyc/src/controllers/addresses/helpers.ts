import { Provider } from '../../api/constants'

export function validateInputNetwork(provider: Provider, network: string): void {
  if ([provider].includes(Provider.CIPHERTRACE) && !network) {
    throw new Error(`Missing input 'network'. It is required for API provider '${provider}'`)
  }
}
