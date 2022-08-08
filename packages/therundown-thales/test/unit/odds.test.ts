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
      testData: { id: jobID, data: { sportId: 4, endpoint: 'odds' } },
    },
    {
      name: 'date invalid',
      testData: {
        id: jobID,
        data: { sportId: 4, date: 'linkpool', endpoint: 'odds' },
      },
    },
    {
      name: 'sportId not supplied',
      testData: {
        id: jobID,
        data: { date: 1638297631, endpoint: 'odds' },
      },
    },
    {
      name: 'sportId invalid',
      testData: {
        id: jobID,
        data: { sportId: 'linkpool', date: 1638297631, endpoint: 'odds' },
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
