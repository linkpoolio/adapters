import { Requester } from '@chainlink/ea-bootstrap'
import { Config, RequestConfig } from '@chainlink/types'
import { injector } from '@linkpool/shared'

import { Base } from '../base'
import schedules from './schedules'

const Fetch =
  (config: Config) =>
  async ({ url, params }: RequestConfig): Promise<any> => {
    const options = {
      ...config.api,
      baseURL: 'https://therundown-therundown-v1.p.rapidapi.com/',
      url,
      params: {
        ...params,
      },
      headers: {
        ...config.api.headers,
        'x-rapidapi-host': 'therundown-therundown-v1.p.rapidapi.com',
      },
    }

    const response = await Requester.request<any>(options)
    return response
  }

const Provider = (config: Config): Base => {
  const fetch = Fetch(config)
  const endpoints = {
    schedules,
  }

  return injector(endpoints, fetch)
}

export default Provider
