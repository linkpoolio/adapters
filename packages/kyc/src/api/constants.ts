export enum Provider {
  CIPHERTRACE = 'ciphertrace',
  EVEREST = 'everest',
}

export const providerToBaseUrl: ReadonlyMap<Provider, string> = new Map([
  [Provider.EVEREST, 'https://distributedlab-everest-chainlink.3xm.dev.identitynetwork.io'],
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
