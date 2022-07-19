import { Requester } from '@chainlink/ea-bootstrap'
import { Config, RequestConfig } from '@chainlink/types'
import { injector } from '@linkpool/shared'

import { Base } from '../base'
import coins from './coins'

const Fetch =
  (config: Config) =>
  async ({ url, params }: RequestConfig): Promise<any> => {
    const options = {
      ...config.api,
      baseURL: 'https://pro-api.coingecko.com/api/v3',
      url,
      params: {
        ...params,
        x_cg_pro_api_key: config.apiKey,
      },
    }

    const response = await Requester.request<any>(options)
    return response
  }

const Provider = (config: Config): Base => {
  const fetch = Fetch(config)
  const endpoints = {
    coins,
  }

  return injector(endpoints, fetch)
}

export default Provider
