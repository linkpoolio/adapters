import { ethers } from 'ethers'

import { Provider } from '../api/constants'
import { LanceriaJobsGetPayload } from '../api/lanceria/types'

export interface IEmployer {
  address: string
}

export interface IFreelancer {
  address: string
}

export interface IPayment {
  amount: string
  currency: string
  units: string
}

export interface IJob {
  id: number
  employer: IEmployer
  freelancer: IFreelancer
  payment: IPayment
}

const transformer = {
  [Provider.LANCERIA]: (payload: LanceriaJobsGetPayload): IJob => ({
    id: payload.jobId,
    employer: {
      address: ethers.utils.getAddress(payload.employerAddress),
    },
    freelancer: {
      address: payload.freelancerAddress
        ? ethers.utils.getAddress(payload.freelancerAddress)
        : ethers.constants.AddressZero,
    },
    payment: {
      amount: payload.amount,
      currency: 'LANC',
      units: 'wei',
    },
  }),
}

const Single = (payload: LanceriaJobsGetPayload, provider: Provider): IJob =>
  transformer[provider](payload)

export default {
  Single,
}
