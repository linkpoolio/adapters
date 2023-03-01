import nock from 'nock'

import { Provider as ProviderName, providerToBaseUrl } from '../../../src/api/constants'

const baseUrlBitscrunch = providerToBaseUrl.get(ProviderName.BITSCRUNCH) as string

const getValuationsPayloadBitscrunch = {
  metadata: {
    address: '0x67f4732266c7300cca593c814d46bee72e40659f',
    token_id: '13056',
    name: '13056',
    collection_name: 'ZED Horse',
    chain_id: 137,
    token_image_url: null,
    thumbnail_url:
      'https://lh3.googleusercontent.com/tgpgbT3OwxX4REASLdyafzCWQ5EhOtgSiIlhI3am3aZ_mYPS0WbM9Z4F6hOhb0D-AKqhHlFg6BNBquchQy-_bwY=s500',
    thumbnail_palette: ['#5050C4', '#D2D8F9', '#CC6AB5', '#753DC4'],
    verified: false,
  },
  metric_values: {
    price_estimate: {
      value: 18.74631420946881,
      unit: 'ETH',
    },
    price_estimate_upper_bound: {
      value: 154.81112926221925,
      unit: 'ETH',
    },
    price_estimate_lower_bound: {
      value: 1.3447085894908493,
      unit: 'ETH',
    },
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
