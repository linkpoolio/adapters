import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterContext, AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { Provider } from '../../src/api/constants'

describe('controllers', () => {
  const context: AdapterContext = {}
  const jobID = '1'
  const execute = makeExecute()

  process.env.API_KEY = 'fake-api-key'
  process.env.LOG_LEVEL = 'debug'
  process.env.API_PROVIDER = Provider.LANCERIA

  describe('jobs input validation error', () => {
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
            endpoint: 'jobs',
            method: 'linkpool',
          },
        },
        errorMessage: `method parameter 'linkpool' is not in the set of available options: get`,
      },
      {
        name: 'jobId has invalid type',
        testData: {
          id: jobID,
          data: {
            endpoint: 'jobs',
            method: 'get',
            jobId: 'NaN',
          },
        },
        errorMessage: `jobId parameter must be of type number`,
      },
      {
        name: 'parse has invalid type',
        testData: {
          id: jobID,
          data: {
            endpoint: 'jobs',
            method: 'get',
            jobId: 1,
            parse: 3,
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
