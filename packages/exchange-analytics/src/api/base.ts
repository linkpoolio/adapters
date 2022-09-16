import { IFundingRate } from '../models/funding-rate'

export interface IFundingRates {
  get: (props: any) => Promise<IFundingRate>
}

export interface Base {
  fundingRates: IFundingRates
}
