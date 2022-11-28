export enum Provider {
  CIPHERTRACE = 'ciphertrace',
  EVEREST = 'everest',
}

export const providerToBaseUrl: ReadonlyMap<Provider, string> = new Map([
  [Provider.EVEREST, 'https://everest-chainlink.prod.identitynetwork.io'],
])

export const addressesGetNotFoundResult = {
  isFound: false,
  network: null,
  address: null,
  aml: {
    isSanctioned: null,
  },
  kyc: {
    status: null,
    timestamp: null,
  },
}
