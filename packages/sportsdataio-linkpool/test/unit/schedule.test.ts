import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { LeagueId, Market } from '../../src/lib/constants'
import { getGameCreate, getGameResolve } from '../../src/lib/schedule'
import { GameByDate } from '../../src/lib/types'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()

  process.env.MLB_API_KEY = 'test_api_key'

  describe('validating inputParameters', () => {
    const testCases = [
      {
        name: "'market' is not supplied",
        testData: {
          data: {
            endpoint: 'schedule',
            leagueId: 0,
            date: 1650637200,
          },
        },
      },
      {
        name: "'leagueId' is not supplied",
        testData: {
          data: {
            endpoint: 'schedule',
            market: Market.CREATE,
            date: 1650637200,
          },
        },
      },
      {
        name: "'date' is not supplied",
        testData: {
          data: {
            endpoint: 'schedule',
            market: Market.CREATE,
            leagueId: 0,
          },
        },
      },
      {
        name: "'date' is not a valid UNIX timestamp in seconds",
        testData: {
          data: {
            endpoint: 'schedule',
            market: Market.CREATE,
            leagueId: 0,
            date: 10000000000000,
          },
        },
      },
      {
        name: "'gameIds' is not an array of numbers",
        testData: {
          data: {
            endpoint: 'schedule',
            market: Market.CREATE,
            leagueId: 0,
            date: 1650637200,
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
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })
})

describe('getGameCreate', () => {
  it('returns the expected GameCreate', () => {
    const game = {
      GameID: 64551,
      DateTimeUTC: '2022-04-22T14:20:00',
      AwayTeam: 'PIT',
      HomeTeam: 'CHC',
    }

    const gameCreate = getGameCreate(game as GameByDate)

    const expectedGameCreate = {
      gameId: 64551,
      startTime: 1650637200,
      homeTeam: '0x434843',
      awayTeam: '0x504954',
    }
    expect(gameCreate).toEqual(expectedGameCreate)
  })
})

describe('getGameResolve', () => {
  const getGameResolveTestCases1 = [
    {
      name: 'home score is not a number',
      HomeTeamRuns: 'linkpool',
      AwayTeamRuns: 3,
    },
    {
      name: 'away score is not a number',
      HomeTeamRuns: 6,
      AwayTeamRuns: 'linkpool',
    },
  ]
  it.each(getGameResolveTestCases1)(
    'throws an error if $name',
    ({ HomeTeamRuns, AwayTeamRuns }) => {
      const game = {
        GameID: 64530,
        Status: 'Final',
        Day: '2022-04-21T00:00:00',
        DateTimeUTC: '2022-04-21T13:10:00',
        AwayTeam: 'CHW',
        HomeTeam: 'CLE',
        AwayTeamRuns,
        HomeTeamRuns,
      }

      expect(() => getGameResolve(game as GameByDate, LeagueId.MLB)).toThrowError()
    },
  )

  const getGameResolveTestCases2 = [
    {
      name: 'case with runs',
      gameByDate: {
        GameID: 64530,
        Status: 'Final',
        Day: '2022-04-21T00:00:00',
        DateTimeUTC: '2022-04-21T13:10:00',
        AwayTeam: 'CHW',
        HomeTeam: 'CLE',
        AwayTeamRuns: 3,
        HomeTeamRuns: 6,
      },
      expectedGameResolve: {
        gameId: 64530,
        homeScore: 6,
        awayScore: 3,
        status: '0x46696e616c',
      },
    },
    {
      name: 'case without runs',
      gameByDate: {
        GameID: 64530,
        Status: 'Final',
        Day: '2022-04-21T00:00:00',
        DateTimeUTC: '2022-04-21T13:10:00',
        AwayTeam: 'CHW',
        HomeTeam: 'CLE',
        AwayTeamRuns: null,
        HomeTeamRuns: null,
      },
      expectedGameResolve: {
        gameId: 64530,
        homeScore: 0,
        awayScore: 0,
        status: '0x46696e616c',
      },
    },
  ]
  it.each(getGameResolveTestCases2)(
    'returns the expected GameResolve ($name)',
    ({ gameByDate, expectedGameResolve }) => {
      const gameResolve = getGameResolve(gameByDate as GameByDate, LeagueId.MLB)

      expect(gameResolve).toEqual(expectedGameResolve)
    },
  )
})
