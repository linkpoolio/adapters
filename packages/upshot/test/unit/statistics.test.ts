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
      {
        name: 'assetAddress invalid',
        testData: {
          id: jobID,
          data: { endpoint: 'floor-price', assetAddress: 777 },
        },
      },
      {
        name: 'assetAddress not supplied',
        testData: {
          id: jobID,
          data: { endpoint: 'floor-price' },
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
