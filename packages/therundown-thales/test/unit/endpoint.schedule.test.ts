import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import {
  Endpoint,
  GAME_ID_NUMBER_OF_CHARACTERS,
  MIN_LIMIT,
  Market,
  SportId,
} from '../../src/lib/const'

describe('validation error', () => {
  const jobID = '1'
  process.env.API_KEY = 'test_api_key'
  const execute = makeExecute()

  const requests = [
    // market
    {
      name: 'market not supplied',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 1,
        },
      },
      errorMessage: `Required parameter market must be non-null and non-empty`,
    },
    {
      name: 'market invalid',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          sportId: SportId.NBA,
          date: 1638297631,
          market: 'linkpool',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 1,
        },
      },
      errorMessage: `market parameter 'linkpool' is not in the set of available options: create,resolve`,
    },
    // sportId
    {
      name: 'sportId not supplied',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 1,
        },
      },
      errorMessage: `Required parameter sportId must be non-null and non-empty`,
    },
    {
      name: 'sportId invalid',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: 'linkpool',
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 1,
        },
      },
      errorMessage: `sportId parameter must be of type number`,
    },
    // date
    {
      name: 'date not supplied',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 1,
        },
      },
      errorMessage: `Required parameter date must be non-null and non-empty`,
    },
    {
      name: 'date invalid',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 'linkpool',
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 1,
        },
      },
      errorMessage: `date parameter must be of type number`,
    },
    // sportIdToBookmakerIds
    {
      name: 'sportIdToBookmakerIds not supplied',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          limit: 1,
        },
      },
      errorMessage: `Missing 'sportIdToBookmakerIds' entry for 'sportId': 4. Expected formats is an object with sportId as key and an Array of bookmaker IDs (Integer) as value. 'sportIdToBookmakerIds' {}`,
    },
    {
      name: 'sportIdToBookmakerIds invalid (missing sportId entry)',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.MLB]: [1, 2, 3],
          },
          limit: 1,
        },
      },
      errorMessage: `Missing 'sportIdToBookmakerIds' entry for 'sportId': 4. Expected formats is an object with sportId as key and an Array of bookmaker IDs (Integer) as value. 'sportIdToBookmakerIds' {"3":[1,2,3]}`,
    },
    {
      name: 'sportIdToBookmakerIds invalid (unsupported sportId entry)',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [1, 2, 3],
            '30': [4, 5, 6],
          },
          limit: 1,
        },
      },
      errorMessage: `Unsupported 'sportId': 30. 'sportIdToBookmakerIds': {"4":[1,2,3],"30":[4,5,6]}`,
    },
    {
      name: 'sportIdToBookmakerIds invalid (entry value is not an Array of Integer)',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: 'linkpool',
          },
          limit: 1,
        },
      },
      errorMessage: `Invalid bookmaker IDs by 'sportId' 4: "linkpool". Expected formats is an Array of Integer with at least one item. 'sportIdToBookmakerIds': {"4":"linkpool"}`,
    },
    {
      name: 'sportIdToBookmakerIds invalid (entry value is an empty Array)',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [],
          },
          limit: 1,
        },
      },
      errorMessage: `Invalid bookmaker IDs by 'sportId' 4: []. Expected formats is an Array of Integer with at least one item. 'sportIdToBookmakerIds': {"4":[]}`,
    },
    {
      name: 'sportIdToBookmakerIds invalid (entry value has an invalid bookmaker ID)',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [1, 'linkpool'],
          },
          limit: 1,
        },
      },
      errorMessage: `Invalid bookmaker IDs by 'sportId' 4: [1,"linkpool"]. Expected formats is an Array of Integer with at least one item. 'sportIdToBookmakerIds': {"4":[1,"linkpool"]}`,
    },
    // scoreFormatId
    {
      name: 'scoreFormatId invalid',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          hasScoresByPeriod: 'tree',
          limit: 1,
        },
      },
      errorMessage: `hasScoresByPeriod parameter must be of type boolean`,
    },
    // limit
    {
      name: 'limit not supplied',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
        },
      },
      errorMessage: `Required parameter limit must be non-null and non-empty`,
    },
    {
      name: 'limit invalid',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 'linkpool',
        },
      },
      errorMessage: `limit parameter must be of type number`,
    },
    {
      name: 'limit is less than MIN_LIMIT',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 0,
        },
      },
      errorMessage: `Invalid 'limit': 0. It has to be greater or equal than ${MIN_LIMIT}`,
    },
    // startAfterGameId
    {
      name: 'startAfterGameId is invalid',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 10,
          startAfterGameId: 777,
        },
      },
      errorMessage: `startAfterGameId parameter must be of type string`,
    },
    {
      name: 'startAfterGameId is an invalid string',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.SCHEDULE,
          market: Market.CREATE,
          sportId: SportId.NBA,
          date: 1638297631,
          sportIdToBookmakerIds: {
            [SportId.NBA]: [11, 3],
          },
          limit: 10,
          startAfterGameId: 'LinkPool',
        },
      },
      errorMessage: `Invalid 'startAfterGameId': LinkPool. Expected format is ${GAME_ID_NUMBER_OF_CHARACTERS} hex digits`,
    },
  ]

  requests.forEach((req) => {
    it(`${req.name}`, async () => {
      try {
        await execute(req.testData as AdapterRequest)
      } catch (error) {
        if (req.errorMessage) {
          expect(error.message.includes(req.errorMessage)).toBe(true)
        }
        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })
})
