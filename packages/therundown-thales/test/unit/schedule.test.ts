import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'
import {
  getGameCreate,
  getGameResolve,
  encodeGameCreate,
  encodeGameResolve,
} from '../../src/lib/utils'

import { testCase } from '../unit/testCases'

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

describe('getGameCreate()', () => {
  it('returns a gameCreate from an event', () => {
    const gameCreate = getGameCreate(testCase)

    const expectedGameCreate = {
      homeTeam: 'St. Louis Blues',
      awayTeam: 'New York Islanders',
      gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
      homeOdds: -16000,
      awayOdds: 14000,
      drawOdds: 0,
      startTime: 1649548800,
    }
    expect(gameCreate).toEqual(expectedGameCreate)
  })
})

describe('getGameResolve()', () => {
  it('returns a gameResolve from an event', () => {
    const getResolve = getGameResolve(testCase)

    const expectedGameResolve = {
      homeScore: 0,
      awayScore: 0,
      gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
      statusId: 18,
    }
    expect(getResolve).toEqual(expectedGameResolve)
  })
})

describe('encodeGameCreated()', () => {
  it('returns a gameCreate encoded', () => {
    const gameCreate = {
      homeTeam: 'St. Louis Blues',
      awayTeam: 'New York Islanders',
      gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
      homeOdds: 0,
      awayOdds: 0,
      drawOdds: 0,
      startTime: 1649548800,
    }
    const encodedGameCreate = encodeGameCreate(gameCreate)

    const expectedEncodedGameCreate =
      '0x000000000000000000000000000000000000000000000000000000000000002037363136366264366234646539346531316335626432306364663366623139650000000000000000000000000000000000000000000000000000000062521e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000f53742e204c6f75697320426c756573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000124e657720596f726b2049736c616e646572730000000000000000000000000000'

    expect(encodedGameCreate).toEqual(expectedEncodedGameCreate)
  })
})

describe('encodeGameResolved()', () => {
  it('returns a gameResolve encoded', () => {
    const gameResolve = {
      homeScore: 114,
      awayScore: 121,
      gameId: '0x3131656333313439366561303130303038353431323634313062353762366463',
      statusId: 8,
    }
    const encodedGameResolve = encodeGameResolve(gameResolve)

    const expectedEncodedGameResolve =
      '0x3131656333313439366561303130303038353431323634313062353762366463000000000000000000000000000000000000000000000000000000000000007200000000000000000000000000000000000000000000000000000000000000790000000000000000000000000000000000000000000000000000000000000008'

    expect(encodedGameResolve).toEqual(expectedEncodedGameResolve)
  })
})
