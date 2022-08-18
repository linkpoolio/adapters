import nock from 'nock'

// TODO: declare api baseUrls for all providers in easily exportable object
const url = 'https://pro-api.coingecko.com/api/v3'

const address = [
  {
    id: 1,
    name: 'fake-address-1',
  },
  {
    id: 2,
    name: 'fake-address-2',
  },
  {
    id: 3,
    name: 'fake-address-3',
  },
]

export const mockAddressSuccess = (): nock => {
  return nock(url).get(`/address/list?x_cg_pro_api_key=${process.env.API_KEY}`).reply(200, {
    data: address,
  })
}
