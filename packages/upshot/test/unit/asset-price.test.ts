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
          data: {
            endpoint: 'asset-price',
            assetAddress: 777,
            tokenId: 11,
          },
        },
      },
      {
        name: 'assetAddress not supplied',
        testData: {
          id: jobID,
          data: {
            endpoint: 'asset-price',
            tokenId: 11,
          },
        },
      },
      {
        name: 'tokenId invalid',
        testData: {
          id: jobID,
          data: {
            endpoint: 'asset-price',
            assetAddress: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
            tokenId: 'linkpool',
          },
        },
      },
      {
        name: 'tokenId not supplied',
        testData: {
          id: jobID,
          data: {
            endpoint: 'asset-price',
            assetAddress: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
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
