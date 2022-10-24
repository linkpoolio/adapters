import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterContext, AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'

describe('controllers', () => {
  const context: AdapterContext = {}
  const jobID = '1'
  const execute = makeExecute()

  process.env.LOG_LEVEL = 'debug'
  process.env.API_PROVIDER = 'FTX'

  describe('funding-rates input validation error', () => {
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
            endpoint: 'funding-rates',
            method: 'linkpool',
          },
        },
        errorMessage: `method parameter 'linkpool' is not in the set of available options: get`,
      },
      {
        name: 'asset has invalid type',
        testData: {
          id: jobID,
          data: {
            endpoint: 'funding-rates',
            method: 'get',
            asset: 777,
          },
        },
        errorMessage: `asset parameter must be of type string`,
      },
      {
        name: 'asset is invalid',
        testData: {
          id: jobID,
          data: {
            endpoint: 'funding-rates',
            method: 'get',
            asset: 'XRP',
          },
        },
        errorMessage: `asset parameter must be of type string`,
      },
      {
        name: 'parse has invalid type',
        testData: {
          id: jobID,
          data: {
            endpoint: 'funding-rates',
            method: 'get',
            asset: 'ETH',
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
          const errorResp = Requester.errored(jobID, error)
          assertError({ expected: 500, actual: errorResp.statusCode }, errorResp, jobID)
        }
      })
    })
  })
})
