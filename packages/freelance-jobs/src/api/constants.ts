export enum Provider {
  LANCERIA = 'lanceria',
}

export const providerToBaseUrl: ReadonlyMap<Provider, string> = new Map([
  [Provider.LANCERIA, 'https://api-testnet.lanceria.com'],
])
