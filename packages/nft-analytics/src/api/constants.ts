export enum Provider {
  NFTPERP = 'nftperp',
  RARIFY = 'rarify',
}

export const providerToBaseUrl: ReadonlyMap<Provider, string> = new Map([
  [Provider.NFTPERP, 'https://vdj0xvxta8.execute-api.eu-central-1.amazonaws.com'],
  [Provider.RARIFY, 'https://api.rarify.tech'],
])
