import nock from 'nock'

import { Provider as ProviderName, providerToBaseUrl } from '../../../src/api/constants'

const baseUrlRarify = providerToBaseUrl.get(ProviderName.RARIFY) as string

const getFloorpricesPayloadRarify = {
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

export const mockFloorpricesGetSingleErrorRarify = (): nock =>
  nock(baseUrlRarify, {
    encodedQueryParams: true,
    reqheaders: { Authorization: `Bearer ${process.env.RARIFY_API_KEY as string as string}` },
  })
    .get(`/data/contracts/ethereum:0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/smart-floor-price`)
    .reply(500, {})

export const mockFloorpricesGetSingleSuccessRarify = (): nock =>
  nock(baseUrlRarify, {
    encodedQueryParams: true,
    reqheaders: { Authorization: `Bearer ${process.env.RARIFY_API_KEY as string as string}` },
  })
    .get(`/data/contracts/ethereum:0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/smart-floor-price`)
    .reply(200, getFloorpricesPayloadRarify)
