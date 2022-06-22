import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()

  process.env.API_CORP_CODE = 'test_corp_code'
  process.env.API_KEY = 'test_api_key'

  describe('validation error', () => {
    const requests = [
      {
        name: "'date' does not have YYYY-MM-DD format",
        testData: {
          data: {
            endpoint: 'cmx-daily',
            date: 20220201,
          },
        },
      },
      {
        name: "'date' does not represent a valid date",
        testData: {
          data: {
            endpoint: 'cmx-daily',
            date: '2021-00-00',
          },
        },
      },
      {
        name: "'date' is not human-readable",
        testData: {
          data: {
            endpoint: 'cmx-daily',
            date: '2021-02-31',
          },
        },
      },
      {
        name: "'date' is greater or equal than today",
        testData: {
          data: {
            endpoint: 'cmx-daily',
            date: new Date().toISOString().split('T')[0], // today date as YYYY-MM-DD
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
