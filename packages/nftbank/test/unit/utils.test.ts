import { PricingAsset } from '../../src/lib/const'
import { AssetEstimate, AssetFloorPrice } from '../../src/lib/types'
import { getEstimateFor, getFloorPriceFor } from '../../src/lib/utils'

describe('utils', () => {
  describe('getEstimateFor', () => {
    describe('successes', () => {
      const estimates: AssetEstimate[] = [
        {
          currency_symbol: 'ETH',
          estimate_price: 1,
        },
        {
          currency_symbol: 'USD',
          estimate_price: 2,
        },
      ]
      const requests = [
        {
          name: 'ETH value validation',
          testData: {
            pricingAsset: 'ETH',
            estimates,
          },
        },
        {
          name: 'USD value validation',
          testData: {
            pricingAsset: 'USD',
            estimates,
          },
        },
      ]

      requests.forEach(({ name, testData }) => {
        it(`${name}`, () => {
          const result = getEstimateFor(testData.pricingAsset as PricingAsset, estimates)

          let power
          if (testData.pricingAsset === PricingAsset.ETH) {
            power = 10 ** 14
            expect(result / power).toEqual(1)
          } else if (testData.pricingAsset === PricingAsset.USD) {
            power = 10 ** 11
            expect(result / power).toEqual(2)
          }
        })
      })

      describe('failures', () => {
        const estimates: AssetEstimate[] = [
          {
            currency_symbol: 'ETH',
            estimate_price: 1,
          },
          {
            currency_symbol: 'USD',
            estimate_price: 2,
          },
          {
            currency_symbol: 'fake',
            estimate_price: 2,
          },
        ]
        const requests = [
          {
            name: 'Valid currency that is not recognized throws a NaN error',
            testData: {
              pricingAsset: 'fake',
              estimates,
            },
          },
          {
            name: 'Malformed input throws an error',
            testData: {
              pricingAsset: 'USDf',
              estimates,
            },
          },
        ]

        requests.forEach(({ name, testData }) => {
          it(`${name}`, () => {
            expect(() => getEstimateFor(testData.pricingAsset as PricingAsset, estimates))
          })
        })
      })
    })
  })

  describe('getFloorPriceFor', () => {
    describe('successes', () => {
      const floorPrice: AssetFloorPrice[] = [
        {
          currency_symbol: 'ETH',
          floor_price: 17.76,
        },
        {
          currency_symbol: 'USD',
          floor_price: 31944.820617320995,
        },
      ]
      const requests = [
        {
          name: 'ETH value validation',
          testData: {
            pricingAsset: 'ETH',
            floorPrice,
            expectedResult: 1776000000000000,
          },
        },
        {
          name: 'USD value validation',
          testData: {
            pricingAsset: 'USD',
            floorPrice,
            expectedResult: 3194482061732100,
          },
        },
      ]

      requests.forEach(({ name, testData }) => {
        it(`${name}`, () => {
          const result = getFloorPriceFor(
            testData.pricingAsset as PricingAsset,
            testData.floorPrice,
          )
          expect(result).toEqual(testData.expectedResult)
        })
      })

      describe('failures', () => {
        const floorPrice: AssetFloorPrice[] = [
          {
            currency_symbol: 'ETH',
            floor_price: 1,
          },
          {
            currency_symbol: 'USD',
            floor_price: 2,
          },
          {
            currency_symbol: 'fake',
            floor_price: 2,
          },
        ]
        const requests = [
          {
            name: 'Valid currency that is not recognized throws a NaN error',
            testData: {
              pricingAsset: 'fake',
              floorPrice,
            },
          },
          {
            name: 'Malformed input throws an error',
            testData: {
              pricingAsset: 'USDf',
              floorPrice,
            },
          },
        ]

        requests.forEach(({ name, testData }) => {
          it(`${name}`, () => {
            expect(() =>
              getFloorPriceFor(testData.pricingAsset as PricingAsset, testData.floorPrice),
            )
          })
        })
      })
    })
  })
})
