import nock from 'nock'

import { Provider as ProviderName, providerToBaseUrl } from '../../../src/api/constants'

const baseUrl = providerToBaseUrl.get(ProviderName.RARIFY) as string

const getFloorpricesPayload = {
  data: {
    id: 'ethereum:bc4ca0eda7647a8ab7c2061c2e118a18a936f13d:1659003693',
    type: 'floor-price',
    attributes: {
      payment_asset: {
        code: 'ETH',
        image_url: 'https://rarify-public.s3.amazonaws.com/eth_logo.svg',
      },
      price: '77157500000000000000',
    },
  },
  included: [],
}

export const mockFloorpricesGetSingleError = (): nock =>
  nock(baseUrl, {
    encodedQueryParams: true,
    reqheaders: { Authorization: `Bearer ${process.env.API_KEY as string}` },
  })
    .get(`/data/contracts/ethereum:0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/smart-floor-price`)
    .reply(500, {})

export const mockFloorpricesGetSingleSuccess = (): nock =>
  nock(baseUrl, {
    encodedQueryParams: true,
    reqheaders: { Authorization: `Bearer ${process.env.API_KEY as string}` },
  })
    .get(`/data/contracts/ethereum:0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/smart-floor-price`)
    .reply(200, getFloorpricesPayload)
