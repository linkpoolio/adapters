import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()

  process.env.API_KEY = 'test_api_key'

  describe('validation error', () => {
    const requests = [
      // Reason: required inputs
      {
        name: 'address not supplied',
        testData: {
          id: jobID,
          data: { endpoint: 'contains-most-visited-location', countryCodes: 'ES-US' },
        },
      },
      {
        name: 'countryCodes not supplied',
        id: jobID,
        testData: {
          data: {
            endpoint: 'contains-most-visited-location',
            address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
          },
        },
      },
      // Reason: validation failed
      {
        name: 'invalid wallet address',
        testData: {
          id: jobID,
          data: {
            endpoint: 'contains-most-visited-location',
            address: 'craig_wright',
            countryCodes: 'ES-US',
          },
        },
      },
      {
        name: 'invalid countryCode format (longer than 2 characters)',
        testData: {
          id: jobID,
          data: {
            endpoint: 'contains-most-visited-location',
            address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
            countryCodes: 'ES-US-LINK',
          },
        },
      },
      {
        name: 'invalid days (not an integer)',
        testData: {
          id: jobID,
          data: {
            endpoint: 'contains-most-visited-location',
            address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
            countryCodes: 'ES-US',
            days: 1.1,
          },
        },
      },
      {
        name: 'invalid days (greater than 21)',
        testData: {
          id: jobID,
          data: {
            endpoint: 'contains-most-visited-location',
            address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
            countryCodes: 'ES-US',
            days: 22,
          },
        },
      },
    ]

    requests.forEach((req) => {
      it(`${req.name}`, async () => {
        try {
          await execute(req.testData as AdapterRequest)
        } catch (error) {
          const errorResp = Requester.errored(jobID, error)
          assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
        }
      })
    })
  })
})
