export interface EverestAddressesGetInput {
  address: string
  network: string
}

export interface KYCData {
  isHumanAndUniqueUser: boolean
  isKYCUser: boolean
  KYCDate: string | null
}

export interface EverestAddressesGetPayload {
  success: boolean
  data: KYCData
  error: string | null
}
