import nock from 'nock'

import { Provider as ProviderName, providerToBaseUrl } from '../../../src/api/constants'

const baseUrlNftperp = providerToBaseUrl.get(ProviderName.NFTPERP) as string

const getTwapsPayloadNftperp = {
  price: '67607924791666666666',
  timestamp: '2022-09-12T13:15:00.000Z',
}

export const mockTwapsGetSingleErrorNftperp = (): nock =>
  nock(baseUrlNftperp, {
    reqheaders: { 'x-api-key': process.env.API_KEY as string },
  })
    .get(`/twap?slug=boredapeyachtclub`)
    .reply(500, {})

export const mockTwapsGetSingleSuccessNftperp = (): nock =>
  nock(baseUrlNftperp, {
    reqheaders: { 'x-api-key': process.env.API_KEY as string },
  })
    .get(`/twap?slug=boredapeyachtclub`)
    .reply(200, getTwapsPayloadNftperp)
