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
        name: 'address invalid',
        testData: {
          id: jobID,
          data: {
            endpoint: 'category',
            address: 777,
            chainId: 1,
          },
        },
      },
      {
        name: 'address not supplied',
        testData: {
          id: jobID,
          data: {
            endpoint: 'category',
            chainId: 1,
          },
        },
      },
      {
        name: 'chainId invalid',
        testData: {
          id: jobID,
          data: {
            endpoint: 'category',
            address: '0xed5af388653567af2f388e6224dc7c4b3241c544',
            chainId: 999,
          },
        },
      },
      {
        name: 'chainId not supplied',
        testData: {
          id: jobID,
          data: {
            endpoint: 'category',
            address: '0xed5af388653567af2f388e6224dc7c4b3241c544',
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
