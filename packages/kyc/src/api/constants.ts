export enum Provider {
  CIPHERTRACE = 'ciphertrace',
}

export const providerToBaseUrl: ReadonlyMap<Provider, string> = new Map([
  [Provider.CIPHERTRACE, 'https://api.rarify.tech'],
])

export const addressesGetNotFoundResult = {
  network: null,
  address: null,
  isMalicious: false,
}
