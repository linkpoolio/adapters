import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { Market } from '../../src/lib/constants'
import { getGameCreate, getGameResolve } from '../../src/lib/schedule'
import { DailyEvent } from '../../src/lib/types'

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
            leagueId: 777,
            date: 1650346477,
          },
        },
      },
      {
        name: "'leagueId' is not supplied",
        testData: {
          data: {
            endpoint: 'schedule',
            market: Market.CREATE,
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
            leagueId: 777,
          },
        },
      },
      {
        name: "'date' is not a valid UNIX timestamp in seconds",
        testData: {
          data: {
            endpoint: 'schedule',
            market: Market.CREATE,
            leagueId: 777,
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
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })
})

describe('getGameCreate', () => {
  it("throws an error if 'event.id' is not a number", () => {
    const event = {
      id: 'linkpool',
    }

    expect(() => getGameCreate(event as DailyEvent)).toThrowError()
  })

  it('returns the expected GameCreate', () => {
    const event = {
      id: '3610253',
      startdate: '2022-04-16T11:30:00+00:00',
      name: 'Tottenham Hotspur-Brighton & Hove Albion',
    }

    const gameCreate = getGameCreate(event as DailyEvent)

    const expectedGameCreate = {
      gameId: 3610253,
      startTime: 1650108600,
      homeTeam: 'Tottenham Hotspur',
      awayTeam: 'Brighton & Hove Albion',
    }
    expect(gameCreate).toEqual(expectedGameCreate)
  })
})

describe('getGameResolve', () => {
  it("throws an error if 'event.id' is not a number", () => {
    const event = {
      id: 'linkpool',
    }

    expect(() => getGameCreate(event as DailyEvent)).toThrowError()
  })

  const testCases = [
    {
      name: "could not find 'participant' for home team",
      eventName: 'LinkPool-Brighton & Hove Albion',
      homeScore: '0',
      awayScore: '1',
    },
    {
      name: "could not find 'participant' for away team",
      eventName: 'Tottenham Hotspur-LinkPool',
      homeScore: '0',
      awayScore: '1',
    },
    {
      name: 'home score is not a number',
      eventName: 'Tottenham Hotspur-Brighton & Hove Albion',
      homeScore: 'linkpool',
      awayScore: '1',
    },
    {
      name: 'away score is not a number',
      eventName: 'Tottenham Hotspur-Brighton & Hove Albion',
      homeScore: '0',
      awayScore: 'linkpool',
    },
  ]
  it.each(testCases)('throws an error if $name', ({ eventName, homeScore, awayScore }) => {
    const event = {
      id: '3610253',
      name: eventName, // NB: altered name
      startdate: '2022-04-16T11:30:00+00:00',
      status_type: 'finished',
      event_participants: {
        '13066708': {
          id: '13066708',
          number: '1',
          participantFK: '8586',
          eventFK: '3610253',
          n: '0',
          ut: '2022-04-16T10:33:19+00:00',
          result: {
            '50971416': {
              id: '50971416',
              event_participantsFK: '13066708',
              result_typeFK: '1',
              result_code: 'ordinarytime',
              value: '0',
              n: '0',
              ut: '2021-06-16T08:42:21+00:00',
            },
            '50971418': {
              id: '50971418',
              event_participantsFK: '13066708',
              result_typeFK: '6',
              result_code: 'runningscore',
              value: '0',
              n: '0',
              ut: '2021-06-16T08:42:21+00:00',
            },
            '56991709': {
              id: '56991709',
              event_participantsFK: '13066708',
              result_typeFK: '5',
              result_code: 'halftime',
              value: '0',
              n: '0',
              ut: '2022-04-16T12:18:42+00:00',
            },
            '56992962': {
              id: '56992962',
              event_participantsFK: '13066708',
              result_typeFK: '4',
              result_code: 'finalresult',
              value: homeScore,
              n: '0',
              ut: '2022-04-16T13:25:24+00:00',
            },
          },
          participant: {
            id: '8586',
            name: 'Tottenham Hotspur',
            gender: 'male',
            type: 'team',
            countryFK: '2',
            n: '3',
            ut: '2022-04-12T12:43:50+00:00',
            country_name: 'England',
          },
        },
        '13066709': {
          id: '13066709',
          number: '2',
          participantFK: '10204',
          eventFK: '3610253',
          n: '0',
          ut: '2022-04-16T12:29:22+00:00',
          result: {
            '50971417': {
              id: '50971417',
              event_participantsFK: '13066709',
              result_typeFK: '1',
              result_code: 'ordinarytime',
              value: '1',
              n: '1',
              ut: '2022-04-16T13:18:20+00:00',
            },
            '50971419': {
              id: '50971419',
              event_participantsFK: '13066709',
              result_typeFK: '6',
              result_code: 'runningscore',
              value: '1',
              n: '1',
              ut: '2022-04-16T13:18:21+00:00',
            },
            '56991710': {
              id: '56991710',
              event_participantsFK: '13066709',
              result_typeFK: '5',
              result_code: 'halftime',
              value: '0',
              n: '0',
              ut: '2022-04-16T12:18:42+00:00',
            },
            '56992963': {
              id: '56992963',
              event_participantsFK: '13066709',
              result_typeFK: '4',
              result_code: 'finalresult',
              value: awayScore,
              n: '0',
              ut: '2022-04-16T13:25:25+00:00',
            },
          },
          participant: {
            id: '10204',
            name: 'Brighton & Hove Albion',
            gender: 'male',
            type: 'team',
            countryFK: '2',
            n: '3',
            ut: '2022-04-12T12:43:53+00:00',
            country_name: 'England',
          },
        },
      },
    }

    expect(() => getGameResolve(event as DailyEvent)).toThrowError()
  })

  it('returns the expected GameResolve', () => {
    const event = {
      id: '3610253',
      name: 'Tottenham Hotspur-Brighton & Hove Albion',
      startdate: '2022-04-16T11:30:00+00:00',
      status_type: 'finished',
      event_participants: {
        '13066708': {
          id: '13066708',
          number: '1',
          participantFK: '8586',
          eventFK: '3610253',
          n: '0',
          ut: '2022-04-16T10:33:19+00:00',
          result: {
            '50971416': {
              id: '50971416',
              event_participantsFK: '13066708',
              result_typeFK: '1',
              result_code: 'ordinarytime',
              value: '0',
              n: '0',
              ut: '2021-06-16T08:42:21+00:00',
            },
            '50971418': {
              id: '50971418',
              event_participantsFK: '13066708',
              result_typeFK: '6',
              result_code: 'runningscore',
              value: '0',
              n: '0',
              ut: '2021-06-16T08:42:21+00:00',
            },
            '56991709': {
              id: '56991709',
              event_participantsFK: '13066708',
              result_typeFK: '5',
              result_code: 'halftime',
              value: '0',
              n: '0',
              ut: '2022-04-16T12:18:42+00:00',
            },
            '56992962': {
              id: '56992962',
              event_participantsFK: '13066708',
              result_typeFK: '4',
              result_code: 'finalresult',
              value: '0',
              n: '0',
              ut: '2022-04-16T13:25:24+00:00',
            },
          },
          participant: {
            id: '8586',
            name: 'Tottenham Hotspur',
            gender: 'male',
            type: 'team',
            countryFK: '2',
            n: '3',
            ut: '2022-04-12T12:43:50+00:00',
            country_name: 'England',
          },
        },
        '13066709': {
          id: '13066709',
          number: '2',
          participantFK: '10204',
          eventFK: '3610253',
          n: '0',
          ut: '2022-04-16T12:29:22+00:00',
          result: {
            '50971417': {
              id: '50971417',
              event_participantsFK: '13066709',
              result_typeFK: '1',
              result_code: 'ordinarytime',
              value: '1',
              n: '1',
              ut: '2022-04-16T13:18:20+00:00',
            },
            '50971419': {
              id: '50971419',
              event_participantsFK: '13066709',
              result_typeFK: '6',
              result_code: 'runningscore',
              value: '1',
              n: '1',
              ut: '2022-04-16T13:18:21+00:00',
            },
            '56991710': {
              id: '56991710',
              event_participantsFK: '13066709',
              result_typeFK: '5',
              result_code: 'halftime',
              value: '0',
              n: '0',
              ut: '2022-04-16T12:18:42+00:00',
            },
            '56992963': {
              id: '56992963',
              event_participantsFK: '13066709',
              result_typeFK: '4',
              result_code: 'finalresult',
              value: '1',
              n: '0',
              ut: '2022-04-16T13:25:25+00:00',
            },
          },
          participant: {
            id: '10204',
            name: 'Brighton & Hove Albion',
            gender: 'male',
            type: 'team',
            countryFK: '2',
            n: '3',
            ut: '2022-04-12T12:43:53+00:00',
            country_name: 'England',
          },
        },
      },
    }

    const gameResolve = getGameResolve(event)

    const expectedGameResolve = {
      gameId: 3610253,
      homeScore: 0,
      awayScore: 1,
      status: 'finished',
    }
    expect(gameResolve).toEqual(expectedGameResolve)
  })
})
