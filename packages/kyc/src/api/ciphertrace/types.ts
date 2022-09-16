export interface CiphertraceAddressesGetInput {
  address: string
  network: string
}

export type CiphertraceAddressesGetPayload = Array<Record>

export interface Record {
  Blockchain: string
  Address: string
}
