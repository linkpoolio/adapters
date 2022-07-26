import { Requester } from '@chainlink/ea-bootstrap'
import { Config, RequestConfig } from '@chainlink/types'
import { injector } from '@linkpool/shared'

import { Base } from '../base'
import jobs from './jobs'
import { Provider as ProviderName, providerToBaseUrl } from '../constants'

const Fetch = (config: Config) => {
  config.api.baseURL = providerToBaseUrl.get(ProviderName.LANCERIA) as string
  config.api.headers['x-api-key'] = config.apiKey

  return async ({ params, url }: RequestConfig): Promise<any> => {
    const options = {
      ...config.api,
      url,
      params,
    }
    return Requester.request<any>(options)
  }
}

const Provider = (config: Config): Base => {
  const fetch = Fetch(config)
  const endpoints = {
    jobs,
  }

  return injector(endpoints, fetch)
}

export default Provider
