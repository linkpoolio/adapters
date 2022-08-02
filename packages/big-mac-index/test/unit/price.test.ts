import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { encodePrices, formatPrices } from '../../src/lib/utils'
import { pricesTestCase1, pricesTestCase2, pricesTestCase3 } from './testCases'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()

  process.env.API_KEY = 'test_api_key'

  describe('validating inputParameters', () => {
    const testCases = [
      {
        name: "'country' is not supplied",
        testData: {
          data: {
            endpoint: 'price',
            year: 2020,
          },
        },
      },
      {
        name: "'coutry' is not valid",
        testData: {
          data: {
            endpoint: 'price',
            country: 777,
            year: 2020,
          },
        },
      },
      {
        name: "'year' is not supplied",
        testData: {
          data: {
            endpoint: 'price',
            country: 'LBN',
          },
        },
      },
      {
        name: "'year' is not valid",
        testData: {
          data: {
            endpoint: 'price',
            country: 'LBN',
            year: '3030',
          },
        },
      },
    ]
    it.each(testCases)('errors if $name:', async ({ testData }) => {
      try {
        await execute(testData as AdapterRequest)
      } catch (error) {
        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })

  describe('formatPrices()', () => {
    it('returns the formatted prices when 2 or more prices are reported for the year', () => {
      const formattedPrices = formatPrices(pricesTestCase1)

      const expectedPrices = {
        firstHalfPrice: 43132050431320000,
        secondHalfPrice: 32558139534883700,
      }
      expect(formattedPrices).toEqual(expectedPrices)
    })

    it('returns the formatted prices when 1 price is reported for the year', () => {
      const formattedPrices = formatPrices(pricesTestCase2)

      const expectedPrices = {
        firstHalfPrice: 0,
        secondHalfPrice: 32558139534883700,
      }
      expect(formattedPrices).toEqual(expectedPrices)
    })

    it('returns the formatted prices when 0 prices are reported for the year', () => {
      const formattedPrices = formatPrices(pricesTestCase3)

      const expectedPrices = {
        firstHalfPrice: 0,
        secondHalfPrice: 0,
      }
      expect(formattedPrices).toEqual(expectedPrices)
    })
  })

  describe('encodePrices()', () => {
    it('returns the encoded prices', () => {
      const formattedPrices = {
        firstHalfPrice: 114,
        secondHalfPrice: 121,
      }
      const encodedPrices = encodePrices(formattedPrices)

      const expectedEncodedPrices =
        '0x0000000000000000000000000000007200000000000000000000000000000079'

      expect(encodedPrices).toEqual(expectedEncodedPrices)
    })
  })
})
