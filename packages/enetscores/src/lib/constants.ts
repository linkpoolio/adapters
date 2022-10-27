export const SUPPORTED_NUMBER_OF_EVENT_PARTICIPANTS = 2

export enum Market {
  CREATE = 0,
  RESOLVE = 1,
}

export enum ResultCode {
  FINAL_RESULT = 'finalresult',
}

export enum StatusType {
  NOT_STARTED = 'notstarted',
}

export const marketResultEncode: Map<Market, string[]> = new Map([
  [Market.CREATE, ['uint32', 'uint40', 'uint8', 'string', 'string']],
  [Market.RESOLVE, ['uint32', 'uint8', 'uint8', 'string']],
])
