import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('coins validations', () => {
  const jobID = '1'
  const execute = makeExecute()

  process.env.API_KEY = 'fake-api-key'

  describe('validation error', () => {
    const requests = [
      {
        name: 'endpoint is invalid',
        testData: {
          id: jobID,
          data: {
            endpoint: 'coins',
            filter: true,
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
