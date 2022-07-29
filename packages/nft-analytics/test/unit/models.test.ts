import IFloorPrice from '../../src/models/floorprice'
import { Provider } from '../../src/api/constants'

describe('models', () => {
  describe('rarify transformer', () => {
    it('hydrates an IFloorPrice object', async () => {
      const getFloorPricePayload = {
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
      const expectedFloorPrice = {
        collection: {
          contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
          name: null,
          symbol: null,
          imageUrl: 'https://rarify-public.s3.amazonaws.com/eth_logo.svg',
        },
        floorPrice: {
          currency: 'ETH',
          amount: '77157500000000000000',
          units: 'wei',
        },
        network: 'ethereum',
        timestamp: 1659003693,
      }

      expect(IFloorPrice.Single(getFloorPricePayload, Provider.RARIFY)).toEqual(expectedFloorPrice)
    })
  })
})
