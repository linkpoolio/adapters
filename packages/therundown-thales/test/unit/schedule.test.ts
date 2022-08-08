import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'

describe('validation error', () => {
  const jobID = '1'
  process.env.API_KEY = 'test_api_key'
  const execute = makeExecute()

  const requests = [
    {
      name: 'date not supplied',
      testData: { id: jobID, data: { sportId: 4, market: 'create', endpoint: 'schedule' } },
    },
    {
      name: 'date invalid',
      testData: {
        id: jobID,
        data: { sportId: 4, date: 'linkpool', market: 'create', endpoint: 'schedule' },
      },
    },
    {
      name: 'sportId not supplied',
      testData: {
        id: jobID,
        data: { market: 'create', date: 1638297631, endpoint: 'schedule' },
      },
    },
    {
      name: 'sportId invalid',
      testData: {
        id: jobID,
        data: { sportId: 'linkpool', date: 1638297631, market: 'create', endpoint: 'schedule' },
      },
    },
    {
      name: 'market not supplied',
      testData: { id: jobID, data: { sportId: 4, date: 1638297631, endpoint: 'schedule' } },
    },
    {
      name: 'market invalid',
      testData: {
        id: jobID,
        data: { sportId: 4, date: 1638297631, market: 'linkpool', endpoint: 'schedule' },
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
