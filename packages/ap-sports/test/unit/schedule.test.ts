import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { Market } from '../../src/lib/constants'
import { getGameCreate, getGameResolve } from '../../src/lib/schedule'
import { Game } from '../../src/lib/types'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()

  process.env.API_TOKEN = 'test_api_token'
  process.env.API_USERNAME = 'test_api_username'

  describe('validating inputParameters', () => {
    const testCases = [
      {
        name: "'market' is not supplied",
        testData: {
          data: {
            endpoint: 'schedule',
            sportId: 777,
            date: 1650346477,
          },
        },
      },
      {
        name: "'leagueId' is not supplied",
        testData: {
          data: {
            endpoint: 'schedule',
            sportId: Market.CREATE,
            date: 1650346477,
          },
        },
      },
      {
        name: "'date' is not supplied",
        testData: {
          data: {
            endpoint: 'schedule',
            market: Market.CREATE,
            sportId: 777,
          },
        },
      },
      {
        name: "'gameIds' is not an array of numbers",
        testData: {
          data: {
            endpoint: 'schedule',
            market: Market.CREATE,
            leagueId: 777,
            date: 1650346477,
            gameIds: [1, 2, 'linkpool'],
          },
        },
      },
    ]
    it.each(testCases)('errors if $name:', async ({ testData }) => {
      try {
        await execute(testData as AdapterRequest)
      } catch (error) {
        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 500, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })
})

describe('getGameCreate', () => {
  it('returns the expected GameCreate', () => {
    const event = {
      id: '414040ab-1e79-4637-a7be-8147dcb92533',
      status: 'scheduled',
      scheduled: '2022-10-01T17:05:00+00:00',
      home: {
        name: 'White Sox',
        market: 'Chicago',
      },
      away: {
        name: 'Blue Jays',
        market: 'Toronto',
      },
    }

    const gameCreate = getGameCreate(event as Game)

    const expectedGameCreate = {
      gameId: '0x3431343034306162316537393436333761376265383134376463623932353333',
      startTime: 1664643900,
      homeTeam: 'Chicago White Sox',
      awayTeam: 'Toronto Blue Jays',
    }
    expect(gameCreate).toEqual(expectedGameCreate)
  })
})

describe('getGameResolve', () => {
  it('returns the expected GameResolve', () => {
    const event = {
      id: '32aec692-7974-4d97-b078-45c3c60fe1e0',
      status: 'closed',

      scheduled: '2022-06-22T00:10:00+00:00',
      home: {
        name: 'White Sox',
        market: 'Chicago',
        id: '47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8',
        runs: 7,
      },
      away: {
        name: 'Blue Jays',
        market: 'Toronto',
        id: '1d678440-b4b1-4954-9b39-70afb3ebbcfa',
        runs: 6,
      },
    }

    const gameResolve = getGameResolve(event as Game)

    const expectedGameResolve = {
      gameId: '0x3332616563363932373937343464393762303738343563336336306665316530',
      homeScore: 7,
      awayScore: 6,
      status: 4,
    }
    expect(gameResolve).toEqual(expectedGameResolve)
  })
})
