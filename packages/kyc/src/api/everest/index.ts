import { Requester } from '@chainlink/ea-bootstrap'
import { Config, RequestConfig } from '@chainlink/types'
import { injector } from '@linkpool/shared'

import { Provider as ProviderName, providerToBaseUrl } from '../constants'
import { Base } from '../types'
import addresses from './addresses'

const Fetch = (config: Config) => {
  config.api.baseURL = providerToBaseUrl.get(ProviderName.EVEREST) as string
  config.api.headers['x-api-key'] = config.apiKey

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
    addresses,
  }

  return injector(endpoints, fetch)
}

export default Provider
