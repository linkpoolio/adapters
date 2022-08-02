import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'

describe('market validations', () => {
  const jobID = '1'
  const execute = makeExecute()

  process.env.API_KEY = 'fake-api-key'

  describe('validation error', () => {
    const requests = [
      {
        name: 'endpoint is invalid (id, currency)',
        testData: {
          id: jobID,
          data: {
            endpoint: 'market',
          },
        },
      },
      {
        name: 'endpoint is invalid (currency)',
        testData: {
          id: jobID,
          data: {
            endpoint: 'market',
            id: 'bitcoin',
          },
        },
      },
      {
        name: 'endpoint is invalid (id)',
        testData: {
          id: jobID,
          data: {
            endpoint: 'market',
            currency: 'usd',
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
