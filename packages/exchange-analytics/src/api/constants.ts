export enum Provider {
  BINANCE = 'binance',
  BYBIT = 'bybit',
  FTX = 'ftx',
}

export const providerToBaseUrl: ReadonlyMap<Provider, string> = new Map([
  [Provider.BINANCE, 'https://fapi.binance.com/fapi/v1'],
  [Provider.BYBIT, 'https://api.bybit.com/v2'],
  [Provider.FTX, 'https://ftx.com/api'],
])
