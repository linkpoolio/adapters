export enum Market {
  CREATE = 0,
  RESOLVE = 1,
}

export const sportIdToSport: Map<number, string> = new Map([[1, 'mlb']])

export const statusIdToStatus: Map<number, string> = new Map([
  [1, 'scheduled'],
  [2, 'inprogress'],
  [3, 'complete'],
  [4, 'closed'],
  [5, 'wdelay'],
  [6, 'fdelay'],
  [7, 'odelay'],
  [8, 'canceled'],
  [9, 'unnecessary'],
  [10, 'if-necessary'],
  [11, 'postponed'],
  [12, 'suspended'],
  [13, 'maintenance'],
])

export const statusToStatusId = new Map(
  Array.from(statusIdToStatus, (a) => a.reverse() as [string, number]),
)

export const marketResultEncode: Map<Market, string[]> = new Map([
  [Market.CREATE, ['string', 'uint40', 'uint8', 'string', 'string']],
  [Market.RESOLVE, ['string', 'uint8', 'uint8', 'uint8']],
])
