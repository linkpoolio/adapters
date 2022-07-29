export enum Provider {
  RARIFY = 'rarify',
}

export const providerToBaseUrl: ReadonlyMap<Provider, string> = new Map([
  [Provider.RARIFY, 'https://api.rarify.tech'],
])
