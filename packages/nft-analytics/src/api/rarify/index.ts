import { Requester } from '@chainlink/ea-bootstrap'
import { Config, RequestConfig } from '@chainlink/types'
import { injector } from '@linkpool/shared'

import { Base } from '../base'
import { Provider as ProviderName, providerToBaseUrl } from '../constants'
import floorprices from './floorprices'

const Fetch = (config: Config) => {
  config.api.baseURL = providerToBaseUrl.get(ProviderName.RARIFY) as string
  config.api.headers['Authorization'] = `Bearer ${config.apiKey}`

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
    floorprices,
  }

  return injector(endpoints, fetch)
}

export default Provider
