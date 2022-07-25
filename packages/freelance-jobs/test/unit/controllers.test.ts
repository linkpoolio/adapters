import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest, AdapterContext } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('controllers', () => {
  const context: AdapterContext = {}
  const jobID = '1'
  const execute = makeExecute()

  process.env.API_KEY = 'fake-api-key'
  process.env.LOG_LEVEL = 'debug'
  process.env.API_PROVIDER = 'lanceria'

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
        name: 'jobId has invalid type',
        testData: {
          id: jobID,
          data: {
            endpoint: 'jobs',
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
