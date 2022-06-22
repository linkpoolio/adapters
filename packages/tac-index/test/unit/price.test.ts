import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()

  process.env.API_USERNAME = 'test_api_username'
  process.env.API_PASSWORD = 'test_api_password'

  describe('validation error', () => {
    const requests = [
      {
        name: 'currency invalid',
        testData: {
          id: jobID,
          data: { currency: 'wagmi', route: 'HKG-FRA', endpoint: 'price' },
        },
      },
      {
        name: 'route not supplied',
        testData: {
          id: jobID,
          data: { currency: 'usd', endpoint: 'price' },
        },
      },
      {
        name: 'route invalid',
        testData: {
          id: jobID,
          data: { currency: 'usd', route: 7, endpoint: 'price' },
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
