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
      testData: {
        id: jobID,
        data: {
          sportId: 4,
          endpoint: 'odds',
          sportIdToBookmakers: {
            '4': [11, 3],
          },
        },
      },
    },
    {
      name: 'date invalid',
      testData: {
        id: jobID,
        data: {
          sportId: 4,
          date: 'linkpool',
          endpoint: 'odds',
          sportIdToBookmakers: {
            '4': [11, 3],
          },
        },
      },
    },
    {
      name: 'sportId not supplied',
      testData: {
        id: jobID,
        data: {
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakers: {
            '4': [11, 3],
          },
        },
      },
    },
    {
      name: 'sportId invalid',
      testData: {
        id: jobID,
        data: {
          sportId: 'linkpool',
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakers: {
            '4': [11, 3],
          },
        },
      },
    },
    {
      name: 'sportIdToBookmakers not supplied',
      testData: {
        id: jobID,
        data: {
          sportId: 4,
          date: 1638297631,
          endpoint: 'odds',
        },
      },
    },
    {
      name: 'sportIdToBookmakers invalid (value is not an array of numbers)',
      testData: {
        id: jobID,
        data: {
          sportId: 4,
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakers: {
            '4': 'linkpool',
          },
        },
      },
    },
    {
      name: "sportIdToBookmakers invalid ('sportId' does not match any keys in 'sportIdToBookmakers')",
      testData: {
        id: jobID,
        data: {
          sportId: 5,
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakers: {
            '4': [1, 2, 3],
          },
        },
      },
    },
    {
      name: "sportIdToBookmakers invalid (one of the keys in the object are not a supported 'sportId')",
      testData: {
        id: jobID,
        data: {
          sportId: 5,
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakers: {
            '30': [1, 2, 3],
          },
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
