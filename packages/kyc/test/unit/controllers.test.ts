import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterContext, AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'

describe('controllers', () => {
  const context: AdapterContext = {}
  const jobID = '1'
  const execute = makeExecute()

  process.env.LOG_LEVEL = 'debug'

  describe('addresses input validation error', () => {
    // NB: set up any data provider
    process.env.API_PROVIDER = 'ciphertrace'
    process.env.CIPHERTRACE_ACCESS_KEY = 'fake-access-key'
    process.env.CIPHERTRACE_SECRET_KEY = 'fake-secret-key'

    const requests = [
      {
        name: 'endpoint is not supplied',
        testData: {
          id: jobID,
          data: {},
        },
        errorMessage: `Endpoint not supplied and no default found`,
      },
      {
        name: 'endpoint is not supported',
        testData: {
          id: jobID,
          data: {
            endpoint: 'unsupported_endpoint',
          },
        },
        errorMessage: `Endpoint unsupported_endpoint not supported`,
      },
      {
        name: 'endpoint method is not supported',
        testData: {
          id: jobID,
          data: {
            endpoint: 'addresses',
            method: 'linkpool',
          },
        },
        errorMessage: `method parameter 'linkpool' is not in the set of available options: get`,
      },
      {
        name: 'address has invalid type',
        testData: {
          id: jobID,
          data: {
            endpoint: 'addresses',
            method: 'get',
            address: 777,
            network: 'eth',
          },
        },
        errorMessage: `lookupAddress parameter must be of type string`,
      },
      {
        name: 'network has invalid type',
        testData: {
          id: jobID,
          data: {
            endpoint: 'addresses',
            method: 'get',
            address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            network: 777,
          },
        },
        errorMessage: `network parameter must be of type string`,
      },
      {
        name: 'parse has invalid type',
        testData: {
          id: jobID,
          data: {
            endpoint: 'addresses',
            method: 'get',
            address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            network: 'eth',
            parse: 777,
          },
        },
        errorMessage: `parse parameter must be of type string`,
      },
    ]

    requests.forEach((req) => {
      it(`${req.name}`, async () => {
        try {
          await execute(req.testData as AdapterRequest, context)
        } catch (error) {
          if (req.errorMessage) {
            expect(error.message.includes(req.errorMessage)).toBe(true)
          }
          const errorResp = Requester.errored(jobID, error)
          assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
        }
      })
    })
  })
})
