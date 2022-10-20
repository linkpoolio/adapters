import nock from 'nock'

import { Provider as ProviderName, providerToBaseUrl } from '../../../src/api/constants'

const baseUrlBitscrunch = providerToBaseUrl.get(ProviderName.BITSCRUNCH) as string

const getValuationsPayloadBitscrunch = {
  price_estimate: {
    value: 26.798414565161245,
    unit: 'ETH',
  },
  price_estimate_upper_bound: {
    value: 110.16598605692911,
    unit: 'ETH',
  },
  price_estimate_lower_bound: {
    value: 10.930285452745508,
    unit: 'ETH',
  },
}

export const mockValuationsGetSingleErrorBitscrunch = (): nock =>
  nock(baseUrlBitscrunch, {
    reqheaders: { 'x-api-key': process.env.BITSCRUNCH_API_KEY as string },
  })
    .get(`/api/v1/nft/137/0x67f4732266c7300cca593c814d46bee72e40659f/13056/price-estimate`)
    .reply(500, {})

export const mockValuationsGetSingleSuccessBitscrunch = (): nock =>
  nock(baseUrlBitscrunch, {
    reqheaders: { 'x-api-key': process.env.BITSCRUNCH_API_KEY as string },
  })
    .get(`/api/v1/nft/137/0x67f4732266c7300cca593c814d46bee72e40659f/13056/price-estimate`)
    .reply(200, getValuationsPayloadBitscrunch)
