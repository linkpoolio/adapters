import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { SportId } from '../../src/lib/const'

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
          sportId: SportId.NBA,
          market: 'create',
          endpoint: 'schedule',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'date invalid',
      testData: {
        id: jobID,
        data: {
          sportId: SportId.NBA,
          date: 'linkpool',
          market: 'create',
          endpoint: 'schedule',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'sportId not supplied',
      testData: {
        id: jobID,
        data: {
          market: 'create',
          date: 1638297631,
          endpoint: 'schedule',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          hasScoresByPeriod: true,
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
          market: 'create',
          endpoint: 'schedule',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'market not supplied',
      testData: {
        id: jobID,
        data: {
          sportId: 4,
          date: 1638297631,
          endpoint: 'schedule',
          sportIdToBookmakerIds: {
            '4': [11, 3],
          },
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'market invalid',
      testData: {
        id: jobID,
        data: {
          sportId: 4,
          date: 1638297631,
          market: 'linkpool',
          endpoint: 'schedule',
          sportIdToBookmakerIds: {
            '4': [11, 3],
          },
          hasScoresByPeriod: true,
        },
      },
    },

    {
      name: 'sportIdToBookmakerIds not supplied',
      testData: {
        id: jobID,
        data: {
          sportId: SportId.NBA,
          date: 1638297631,
          endpoint: 'odds',
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'sportIdToBookmakerIds invalid (missing sportId entry)',
      testData: {
        id: jobID,
        data: {
          sportId: SportId.NBA,
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakerIds: {
            [SportId.MLB]: [1, 2, 3],
          },
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'sportIdToBookmakerIds invalid (unsupported sportId entry)',
      testData: {
        id: jobID,
        data: {
          sportId: SportId.NBA,
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [1, 2, 3],
            '30': [4, 5, 6],
          },
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'sportIdToBookmakerIds invalid (entry value is not an Array of Integer)',
      testData: {
        id: jobID,
        data: {
          sportId: SportId.NBA,
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakerIds: {
            [SportId.NBA]: 'linkpool',
          },
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'sportIdToBookmakerIds invalid (entry value is an empty Array)',
      testData: {
        id: jobID,
        data: {
          sportId: SportId.NBA,
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [],
          },
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'sportIdToBookmakerIds invalid (entry value has an invalid bookmaker ID)',
      testData: {
        id: jobID,
        data: {
          sportId: SportId.NBA,
          date: 1638297631,
          endpoint: 'odds',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [1, 'linkpool'],
          },
          hasScoresByPeriod: true,
        },
      },
    },
    {
      name: 'scoreFormatId invalid',
      testData: {
        id: jobID,
        data: {
          sportId: SportId.NBA,
          date: 1638297631,
          market: 'create',
          endpoint: 'schedule',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          hasScoresByPeriod: 'tree',
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
