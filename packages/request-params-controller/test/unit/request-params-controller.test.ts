import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()

  describe('validation error', () => {
    const requests = [
      { name: 'empty body', testData: {} },
      { name: 'empty data', testData: { data: {} } },
      // 'params'
      {
        name: "'params' not supplied",
        testData: { id: jobID, data: { optionalParams: ['endpoint'] } },
      },
      {
        name: "'params' is not type 'object'",
        testData: { id: jobID, data: { params: ['ETH', 'USD'], optionalParams: ['endpoint'] } },
      },
      // 'optionalParams'
      {
        name: "'optionalParams' not supplied",
        testData: { id: jobID, data: { params: { base: 'ETH', quote: 'USD' } } },
      },
      {
        name: "'optionalParams' is not type 'array')",
        testData: {
          id: jobID,
          data: {
            params: { base: 'ETH', quote: 'USD' },
            optionalParams: { endpoint: null },
          },
        },
      },
      {
        name: "'optionalParams' array has an item that is not type 'string'",
        testData: {
          id: jobID,
          data: {
            params: { base: 'ETH', quote: 'USD' },
            optionalParams: ['endpoint', 777],
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
