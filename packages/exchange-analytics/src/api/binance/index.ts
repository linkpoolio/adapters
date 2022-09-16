import { Requester } from '@chainlink/ea-bootstrap'
import { Config, RequestConfig } from '@chainlink/types'
import { injector } from '@linkpool/shared'

import { Base } from '../base'
import { Provider as ProviderName, providerToBaseUrl } from '../constants'
import fundingRates from './funding-rates'

const Fetch = (config: Config) => {
  config.api.baseURL = providerToBaseUrl.get(ProviderName.BINANCE) as string

  return async ({ url }: RequestConfig): Promise<any> => {
    const options = {
      ...config.api,
      url,
    }
    const response = await Requester.request<any>(options)

    return response
  }
}
const Provider = (config: Config): Base => {
  const fetch = Fetch(config)
  const endpoints = {
    fundingRates,
  }

  return injector(endpoints, fetch)
}

export default Provider
