import { AdapterError } from '@chainlink/ea-bootstrap'
import { datetime } from '@linkpool/shared'

import type { Record } from '../api/ciphertrace/types'
import { Provider } from '../api/constants'
import type { EverestAddressesGetPayload, KYCData } from '../api/everest/types'
import type { AddressesGetPayloadList, AddressesGetPayloadSingle } from '../api/types'

export interface IAddress {
  isFound: boolean
  network: string | null
  address: string | null
  aml: {
    // NB: potentially extend with 'source' (e.g. OFAC)
    isSanctioned: boolean | null
  }
  kyc: {
    status: number | string | null
    timestamp: number | null
  }
}

export enum EverestKYCStatus {
  NOT_FOUND = 0,
  KYC_USER = 1,
  HUMAN_UNIQUE = 2,
}

export function getKycStatusEverest(kycData: KYCData): number {
  if (!kycData.isHumanAndUniqueUser) return EverestKYCStatus.NOT_FOUND // NotFound
  if (!kycData.isKYCUser) return EverestKYCStatus.HUMAN_UNIQUE // HumanUnique
  return EverestKYCStatus.KYC_USER // KYCUser
}

const transformer = {
  [Provider.CIPHERTRACE]: (record: Record): IAddress => ({
    isFound: !!record.Address,
    network: record.Blockchain ? record.Blockchain.toUpperCase() : null,
    address: record.Address ? record.Address.toLowerCase() : null, // NB: equivalent to isFound
    aml: {
      isSanctioned: !!record.Address, // NB: equivalent to isFound
    },
    kyc: {
      status: null,
      timestamp: null,
    },
  }),
  [Provider.EVEREST]: (payloadSingle: EverestAddressesGetPayload): IAddress => ({
    isFound: !!payloadSingle.data.isHumanAndUniqueUser,
    network: null,
    address: null,
    aml: {
      isSanctioned: null,
    },
    kyc: {
      status: getKycStatusEverest(payloadSingle.data),
      timestamp: payloadSingle.data.KYCDate
        ? datetime.iso8061ToTimestamp(payloadSingle.data.KYCDate)
        : 0,
    },
  }),
}

const Single = (payloadSingle: AddressesGetPayloadSingle, provider: Provider): IAddress => {
  let address: IAddress
  try {
    switch (provider) {
      case Provider.CIPHERTRACE:
        address = transformer[provider](payloadSingle as Record)
        break
      case Provider.EVEREST:
        address = transformer[provider](payloadSingle as EverestAddressesGetPayload)
        break
      default: {
        throw new Error(`Unsupported provider: ${provider}`)
      }
    }
  } catch (error) {
    throw new AdapterError({
      cause: error,
      message: `Unexpected error transforming the '${provider}' payload (Single): ${JSON.stringify(
        payloadSingle,
      )}. Reason: ${error}`,
      statusCode: 500,
    })
  }
  return address
}

const List = (payload: AddressesGetPayloadList, provider: Provider): IAddress[] => {
  let addresses: IAddress[] = []
  try {
    switch (provider) {
      case Provider.CIPHERTRACE:
        addresses = payload.map((payloadSingle: AddressesGetPayloadSingle) =>
          Single(payloadSingle, provider),
        )
        break
      default: {
        throw new Error(`Unsupported provider: ${provider}`)
      }
    }
  } catch (error) {
    throw new AdapterError({
      cause: error,
      message: `Unexpected error transforming the '${provider}' payload (List). ${JSON.stringify(
        payload,
      )} Reason: ${error}`,
      statusCode: 500,
    })
  }
  return addresses
}

export default {
  List,
  Single,
}
