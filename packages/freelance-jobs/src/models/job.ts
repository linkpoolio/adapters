import { Provider } from '../api/constants'

export interface JobRequest {
  jobId: number
  amount: string
  employerAddress: string
  freelancerAddress: string
}

export interface IEmployer {
  address: string
}

export interface IFreelancer {
  address: string
}

export interface IPayment {
  amount: string
  currency: string
}

export interface IJob {
  id: number
  employer: IEmployer
  freelancer: IFreelancer
  payment: IPayment
}

const transformer = {
  lanceria: (jobRequest: JobRequest): IJob => ({
    id: jobRequest.jobId,
    employer: {
      address: jobRequest.employerAddress,
    },
    freelancer: {
      address: jobRequest.freelancerAddress,
    },
    payment: {
      amount: jobRequest.amount,
      currency: 'LANC',
    },
  }),
}

const Single = (jobRequest: JobRequest, provider: Provider): IJob =>
  transformer[provider](jobRequest)

export default {
  Single,
}
