import { Config } from '@chainlink/types'

export type CiphertraceAddressesGetPayload = Array<Record>

export interface Record {
  Blockchain: string
  Address: string
}

export interface InputParameters {
  network: number
  lookupAddress: string
}
