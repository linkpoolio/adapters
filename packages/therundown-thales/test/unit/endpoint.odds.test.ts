import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { Endpoint, GAME_ID_NUMBER_OF_CHARACTERS, MIN_LIMIT, SportId } from '../../src/lib/const'

describe('validation error', () => {
  const jobID = '1'
  process.env.API_KEY = 'test_api_key'
  const execute = makeExecute()

  const requests = [
    // sportId
    {
      name: 'sportId not supplied',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.ODDS,
          date: 1638297631,
          bookmakerIds: [11, 3],
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
          endpoint: Endpoint.ODDS,
          sportId: 'linkpool',
          date: 1638297631,
          bookmakerIds: [11, 3],
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
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          bookmakerIds: [11, 3],
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
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 'linkpool',
          bookmakerIds: [11, 3],
          limit: 1,
        },
      },
      errorMessage: `date parameter must be of type number`,
    },
    // bookmakerIds
    {
      name: 'bookmakerIds not supplied',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          limit: 1,
        },
      },
      errorMessage: `Invalid 'bookmakerIDs': []. Expected formats is an Array of integers with at least one item`,
    },
    {
      name: 'bookmakerIds invalid (entry value is an empty Array)',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          bookmakerIds: [],
          limit: 1,
        },
      },
      errorMessage: `Invalid 'bookmakerIDs': []. Expected formats is an Array of integers with at least one item`,
    },
    {
      name: 'bookmakerIds invalid (is not an Array of integers)',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          bookmakerIds: [11, 'linkpool'],
          limit: 1,
        },
      },
      errorMessage: `Invalid 'bookmakerIDs': [11,"linkpool"]. Expected formats is an Array of integers with at least one item`,
    },
    // limit
    {
      name: 'limit not supplied',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          bookmakerIds: [11, 3],
        },
      },
      errorMessage: `Required parameter limit must be non-null and non-empty`,
    },
    {
      name: 'limit invalid',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          bookmakerIds: [11, 3],
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
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          bookmakerIds: [11, 3],
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
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          bookmakerIds: [11, 3],
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
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          bookmakerIds: [11, 3],
          limit: 10,
          startAfterGameId: 'LinkPool',
        },
      },
      errorMessage: `Invalid 'startAfterGameId': LinkPool. Expected format is ${GAME_ID_NUMBER_OF_CHARACTERS} hex digits`,
    },
    // gameIds
    {
      name: 'gameIds is invalid',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          bookmakerIds: [11, 3],
          gameIds: 'linkpool',
          limit: 1,
        },
      },
      errorMessage: `Invalid 'gameIds': "linkpool". Expected format is an Array of ${GAME_ID_NUMBER_OF_CHARACTERS} hex digits items`,
    },
    {
      name: 'gameIds is invalid',
      testData: {
        id: jobID,
        data: {
          endpoint: Endpoint.ODDS,
          sportId: SportId.NBA,
          date: 1638297631,
          bookmakerIds: [11, 3],
          gameIds: ['010f30bc9a1c9bff08de504cf1648031', 'linkpool'],
          limit: 1,
        },
      },
      errorMessage: `Invalid item in 'gameIds': linkpool. Expected format is ${GAME_ID_NUMBER_OF_CHARACTERS} hex digits`,
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
