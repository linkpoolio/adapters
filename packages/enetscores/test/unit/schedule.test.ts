import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { Market } from '../../src/lib/constants'
import {
  getGameCreate,
  getGameResolve,
  getTeamNames,
  validateEventAndGetEventParticipants,
} from '../../src/lib/schedule'
import { DailyEvent, EventParticipant } from '../../src/lib/types'

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

describe('validateEventAndGetEventParticipants', () => {
  it("throws an error if 'event.id' is not a number", () => {
    const event = {
      id: 'linkpool',
    }

    expect(() => validateEventAndGetEventParticipants(event as DailyEvent)).toThrowError()
  })

  it("throws an error if the number of 'event.participants' items is different than 2", () => {
    const event = {
      id: '3610253',
      event_participants: {
        '13066708': null,
      },
    }

    expect(() => validateEventAndGetEventParticipants(event as DailyEvent)).toThrowError()
  })

  it('successfully validates the event', () => {
    const event = {
      id: '3610253',
      event_participants: {
        '13066708': null,
        '13066709': null,
      },
    }

    expect(() => validateEventAndGetEventParticipants(event as DailyEvent)).not.toThrowError()
  })
})

describe('getTeamNames', () => {
  const errorTestCases = [
    {
      name: 'could not find home team name',
      eventName: 'LinkPool-Brighton & Hove Albion',
    },
    {
      name: 'could not find away team name',
      eventName: 'Tottenham Hotspur-LinkPool',
    },
    {
      name: 'event name does not start with the homeTeam',
      eventName: 'Brighton & Hove Albion-Tottenham Hotspur',
    },
    {
      name: 'event name does not end with the awayTeam',
      eventName: 'Tottenham Hotspur-LinkPool',
    },
  ]
  it.each(errorTestCases)('throws an error if $name', ({ eventName }) => {
    const event = {
      id: '3610253',
      name: eventName, // NB: altered name
      startdate: '2022-04-16T11:30:00+00:00',
      status_type: 'finished',
      event_participants: {
        '13066709': {
          id: '13066709',
          number: '2',
          participantFK: '10204',
          eventFK: '3610253',
          n: '0',
          ut: '2022-04-16T12:29:22+00:00',
          result: {}, // NB: not necessary
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
        '13066708': {
          id: '13066708',
          number: '1',
          participantFK: '8586',
          eventFK: '3610253',
          n: '0',
          ut: '2022-04-16T10:33:19+00:00',
          result: {}, // NB: not necessary
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
      },
    }

    expect(() =>
      getTeamNames(Object.values(event.event_participants as EventParticipant[]), event.name),
    ).toThrowError()
  })

  const successTestCases = [
    {
      name: "home team name has a '-'",
      eventName: 'Sochaux-Saint-Etienne',
      homeTeamName: 'Sochaux',
      awayTeamName: 'Saint-Etienne',
    },
    {
      name: "away team name has a '-'",
      eventName: 'Saint-Etienne-Sochaux',
      homeTeamName: 'Saint-Etienne',
      awayTeamName: 'Sochaux',
    },
    {
      name: "no teams have '-' in the names",
      eventName: 'LinkPool-Saint-Etienne',
      homeTeamName: 'LinkPool',
      awayTeamName: 'Saint-Etienne',
    },
    {
      name: "both teams have '-' in the name",
      eventName: 'Link-Pool-Saint-Etienne',
      homeTeamName: 'Link-Pool',
      awayTeamName: 'Saint-Etienne',
    },
  ]
  it.each(successTestCases)(
    'throws an error if $name',
    ({ eventName, homeTeamName, awayTeamName }) => {
      const event = {
        id: '3610253',
        name: eventName, // NB: altered name
        startdate: '2022-04-16T11:30:00+00:00',
        status_type: 'finished',
        event_participants: {
          '13066709': {
            id: '13066709',
            number: '2',
            participantFK: '10204',
            eventFK: '3610253',
            n: '0',
            ut: '2022-04-16T12:29:22+00:00',
            result: {}, // NB: not necessary
            participant: {
              id: '10204',
              name: awayTeamName,
              gender: 'male',
              type: 'team',
              countryFK: '2',
              n: '3',
              ut: '2022-04-12T12:43:53+00:00',
              country_name: 'England',
            },
          },
          '13066708': {
            id: '13066708',
            number: '1',
            participantFK: '8586',
            eventFK: '3610253',
            n: '0',
            ut: '2022-04-16T10:33:19+00:00',
            result: {}, // NB: not necessary
            participant: {
              id: '8586',
              name: homeTeamName,
              gender: 'male',
              type: 'team',
              countryFK: '2',
              n: '3',
              ut: '2022-04-12T12:43:50+00:00',
              country_name: 'England',
            },
          },
        },
      }

      const [homeTeam, awayTeam] = getTeamNames(
        Object.values(event.event_participants as EventParticipant[]),
        event.name,
      )

      expect(homeTeam).toBe(homeTeamName)
      expect(awayTeam).toBe(awayTeamName)
    },
  )
})

describe('getGameCreate', () => {
  it('returns the expected GameCreate (case team names without "-")', () => {
    const event = {
      id: '3610253',
      name: 'Tottenham Hotspur-Brighton & Hove Albion',
      tournament_stageFK: '873678',
      startdate: '2022-04-16T11:30:00+00:00',
      status_type: 'finished',
      status_descFK: '6',
      round_typeFK: '70',
      n: '5',
      ut: '2022-04-16T13:31:10+00:00',
      tournamentFK: '16390',
      tournament_templateFK: '47',
      sportFK: '1',
      tournament_stage_name: 'Premier League',
      tournament_name: '2021/2022',
      tournament_template_name: 'England 1',
      sport_name: 'Soccer',
      gender: 'male',
      property: {
        '50254769': {
          id: '50254769',
          type: 'metadata',
          name: 'Round',
          value: '33',
          n: '0',
          ut: '2021-06-16T08:42:21+00:00',
        },
        '50254770': {
          id: '50254770',
          type: 'metadata',
          name: 'Live',
          value: 'yes',
          n: '0',
          ut: '2021-06-16T08:42:21+00:00',
        },
        '50254771': {
          id: '50254771',
          type: 'metadata',
          name: 'LiveStatsType',
          value: 'livestats',
          n: '0',
          ut: '2021-06-16T08:42:21+00:00',
        },
        '50255039': {
          id: '50255039',
          type: 'metadata',
          name: 'VenueName',
          value: 'Tottenham Hotspur Stadium',
          n: '0',
          ut: '2021-06-16T08:42:31+00:00',
        },
        '50255040': {
          id: '50255040',
          type: 'metadata',
          name: 'Commentary',
          value: 'full',
          n: '0',
          ut: '2021-06-16T08:42:31+00:00',
        },
        '55599103': {
          id: '55599103',
          type: 'ref:participant',
          name: 'refereeFK',
          value: '431322',
          n: '0',
          ut: '2022-04-12T07:23:00+00:00',
        },
        '55599104': {
          id: '55599104',
          type: 'ref:participant',
          name: 'assistant1_refereeFK',
          value: '954874',
          n: '0',
          ut: '2022-04-12T07:23:00+00:00',
        },
        '55599105': {
          id: '55599105',
          type: 'ref:participant',
          name: 'assistant2_refereeFK',
          value: '954875',
          n: '0',
          ut: '2022-04-12T07:23:00+00:00',
        },
        '55599106': {
          id: '55599106',
          type: 'ref:participant',
          name: 'fourth_refereeFK',
          value: '1216555',
          n: '0',
          ut: '2022-04-12T07:23:00+00:00',
        },
        '55599108': {
          id: '55599108',
          type: 'ref:participant',
          name: 'var1_refereeFK',
          value: '117804',
          n: '0',
          ut: '2022-04-12T07:23:00+00:00',
        },
        '55599110': {
          id: '55599110',
          type: 'ref:participant',
          name: 'var2_refereeFK',
          value: '954883',
          n: '0',
          ut: '2022-04-12T07:23:00+00:00',
        },
        '55643799': {
          id: '55643799',
          type: 'metadata',
          name: 'LineupConfirmed',
          value: 'yes',
          n: '1',
          ut: '2022-04-16T10:33:53+00:00',
        },
        '55669058': {
          id: '55669058',
          type: 'metadata',
          name: 'GameStarted',
          value: '2022-04-16T11:30:34+00:00',
          n: '0',
          ut: '2022-04-16T11:30:34+00:00',
        },
        '55670066': {
          id: '55670066',
          type: 'metadata',
          name: 'FirstHalfEnded',
          value: '2022-04-16T12:18:42+00:00',
          n: '0',
          ut: '2022-04-16T12:18:42+00:00',
        },
        '55670559': {
          id: '55670559',
          type: 'metadata',
          name: 'SecondHalfStarted',
          value: '2022-04-16T12:34:12+00:00',
          n: '0',
          ut: '2022-04-16T12:34:12+00:00',
        },
        '55672104': {
          id: '55672104',
          type: 'metadata',
          name: 'SecondHalfEnded',
          value: '2022-04-16T13:25:24+00:00',
          n: '0',
          ut: '2022-04-16T13:25:24+00:00',
        },
        '55672105': {
          id: '55672105',
          type: 'metadata',
          name: 'GameEnded',
          value: '2022-04-16T13:25:24+00:00',
          n: '0',
          ut: '2022-04-16T13:25:24+00:00',
        },
        '55672113': {
          id: '55672113',
          type: 'metadata',
          name: 'Spectators',
          value: '58685',
          n: '0',
          ut: '2022-04-16T13:26:22+00:00',
        },
        '55672228': {
          id: '55672228',
          type: 'metadata',
          name: 'Verified',
          value: 'yes',
          n: '0',
          ut: '2022-04-16T13:31:10+00:00',
        },
      },
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
            ut: '2022-05-18T14:14:09+00:00',
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
            ut: '2022-05-18T14:10:05+00:00',
            country_name: 'England',
          },
        },
      },
      elapsed: {
        '1700531': {
          id: '1700531',
          elapsed: '90',
          injury_time: 'no',
          injury_time_elapsed: '0',
          time_type: 'minute',
          n: '100',
          ut: '2022-04-16T13:25:24+00:00',
        },
      },
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

  it('returns the expected GameCreate (case team names with "-")', () => {
    const event = {
      id: '3904901',
      name: 'Metz-Saint-Etienne',
      tournament_stageFK: '879866',
      startdate: '2022-11-07T19:45:00+00:00',
      status_type: 'notstarted',
      status_descFK: '1',
      round_typeFK: '51',
      n: '1',
      ut: '2022-10-11T12:05:25+00:00',
      tournamentFK: '17811',
      tournament_templateFK: '110',
      sportFK: '1',
      tournament_stage_name: 'Ligue 2',
      tournament_name: '2022/2023',
      tournament_template_name: 'France 2',
      sport_name: 'Soccer',
      gender: 'male',
      property: {
        '56722333': {
          id: '56722333',
          type: 'metadata',
          name: 'Round',
          value: '14',
          n: '0',
          ut: '2022-06-17T12:48:16+00:00',
        },
        '56722334': {
          id: '56722334',
          type: 'metadata',
          name: 'Live',
          value: 'yes',
          n: '0',
          ut: '2022-06-17T12:48:16+00:00',
        },
        '56723342': {
          id: '56723342',
          type: 'metadata',
          name: 'LiveStatsType',
          value: 'light',
          n: '0',
          ut: '2022-06-17T13:11:20+00:00',
        },
        '57005223': {
          id: '57005223',
          type: 'metadata',
          name: 'VenueName',
          value: 'Stade Saint Symphorien',
          n: '0',
          ut: '2022-07-04T11:29:28+00:00',
        },
        '58844711': {
          id: '58844711',
          type: 'metadata',
          name: 'Commentary',
          value: 'light',
          n: '0',
          ut: '2022-10-11T12:05:25+00:00',
        },
      },
      event_participants: {
        '14344908': {
          id: '14344908',
          number: '1',
          participantFK: '8550',
          eventFK: '3904901',
          n: '0',
          ut: '2022-06-17T12:48:45+00:00',
          result: {
            '58211599': {
              id: '58211599',
              event_participantsFK: '14344908',
              result_typeFK: '6',
              result_code: 'runningscore',
              value: '0',
              n: '0',
              ut: '2022-06-17T12:49:36+00:00',
            },
            '58211602': {
              id: '58211602',
              event_participantsFK: '14344908',
              result_typeFK: '1',
              result_code: 'ordinarytime',
              value: '0',
              n: '0',
              ut: '2022-06-17T12:49:36+00:00',
            },
          },
          participant: {
            id: '8550',
            name: 'Metz',
            gender: 'male',
            type: 'team',
            countryFK: '5',
            n: '2',
            ut: '2022-04-12T12:43:48+00:00',
            country_name: 'France',
          },
        },
        '14344917': {
          id: '14344917',
          number: '2',
          participantFK: '9853',
          eventFK: '3904901',
          n: '0',
          ut: '2022-06-17T12:48:46+00:00',
          result: {
            '58211645': {
              id: '58211645',
              event_participantsFK: '14344917',
              result_typeFK: '1',
              result_code: 'ordinarytime',
              value: '0',
              n: '0',
              ut: '2022-06-17T12:49:38+00:00',
            },
            '58211672': {
              id: '58211672',
              event_participantsFK: '14344917',
              result_typeFK: '6',
              result_code: 'runningscore',
              value: '0',
              n: '0',
              ut: '2022-06-17T12:49:39+00:00',
            },
          },
          participant: {
            id: '9853',
            name: 'Saint-Etienne',
            gender: 'male',
            type: 'team',
            countryFK: '5',
            n: '4',
            ut: '2022-06-27T18:47:17+00:00',
            country_name: 'France',
          },
        },
      },
    }

    const gameCreate = getGameCreate(event as DailyEvent)

    const expectedGameCreate = {
      gameId: 3904901,
      startTime: 1667850300,
      homeTeam: 'Metz',
      awayTeam: 'Saint-Etienne',
    }
    expect(gameCreate).toEqual(expectedGameCreate)
  })
})

describe('getGameResolve', () => {
  it('returns the expected GameResolve (case team with "-")', () => {
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

  it('returns the expected GameResolve (case team names without "-")', () => {
    const event = {
      id: '3904863',
      name: 'Sochaux-Saint-Etienne',
      tournament_stageFK: '879866',
      startdate: '2022-10-10T18:45:00+00:00',
      status_type: 'finished',
      status_descFK: '6',
      round_typeFK: '48',
      n: '5',
      ut: '2022-10-10T20:50:36+00:00',
      tournamentFK: '17811',
      tournament_templateFK: '110',
      sportFK: '1',
      tournament_stage_name: 'Ligue 2',
      tournament_name: '2022/2023',
      tournament_template_name: 'France 2',
      sport_name: 'Soccer',
      gender: 'male',
      property: {
        '56722135': {
          id: '56722135',
          type: 'metadata',
          name: 'Round',
          value: '11',
          n: '0',
          ut: '2022-06-17T12:47:54+00:00',
        },
        '56722148': {
          id: '56722148',
          type: 'metadata',
          name: 'Live',
          value: 'yes',
          n: '0',
          ut: '2022-06-17T12:47:54+00:00',
        },
        '56723555': {
          id: '56723555',
          type: 'metadata',
          name: 'LiveStatsType',
          value: 'light',
          n: '0',
          ut: '2022-06-17T13:20:09+00:00',
        },
        '57005201': {
          id: '57005201',
          type: 'metadata',
          name: 'VenueName',
          value: 'Stade Auguste Bonal',
          n: '0',
          ut: '2022-07-04T11:29:05+00:00',
        },
        '58835283': {
          id: '58835283',
          type: 'metadata',
          name: 'LineupConfirmed',
          value: 'yes',
          n: '0',
          ut: '2022-10-10T17:58:53+00:00',
        },
        '58835296': {
          id: '58835296',
          type: 'metadata',
          name: 'Commentary',
          value: 'light',
          n: '0',
          ut: '2022-10-10T17:59:19+00:00',
        },
        '58835883': {
          id: '58835883',
          type: 'metadata',
          name: 'GameStarted',
          value: '2022-10-10T18:47:42+00:00',
          n: '0',
          ut: '2022-10-10T18:47:46+00:00',
        },
        '58836368': {
          id: '58836368',
          type: 'metadata',
          name: 'FirstHalfEnded',
          value: '2022-10-10T19:34:05+00:00',
          n: '0',
          ut: '2022-10-10T19:34:08+00:00',
        },
        '58836497': {
          id: '58836497',
          type: 'metadata',
          name: 'SecondHalfStarted',
          value: '2022-10-10T19:47:50+00:00',
          n: '0',
          ut: '2022-10-10T19:47:54+00:00',
        },
        '58836911': {
          id: '58836911',
          type: 'metadata',
          name: 'SecondHalfEnded',
          value: '2022-10-10T20:37:53+00:00',
          n: '0',
          ut: '2022-10-10T20:37:58+00:00',
        },
        '58836914': {
          id: '58836914',
          type: 'metadata',
          name: 'GameEnded',
          value: '2022-10-10T20:38:10+00:00',
          n: '0',
          ut: '2022-10-10T20:38:14+00:00',
        },
        '58837019': {
          id: '58837019',
          type: 'metadata',
          name: 'Verified',
          value: 'yes',
          n: '0',
          ut: '2022-10-10T20:50:36+00:00',
        },
      },
      event_participants: {
        '14344849': {
          id: '14344849',
          number: '1',
          participantFK: '9874',
          eventFK: '3904863',
          n: '0',
          ut: '2022-10-10T19:23:00+00:00',
          result: {
            '58211570': {
              id: '58211570',
              event_participantsFK: '14344849',
              result_typeFK: '1',
              result_code: 'ordinarytime',
              value: '2',
              n: '2',
              ut: '2022-10-10T19:50:15+00:00',
            },
            '58211572': {
              id: '58211572',
              event_participantsFK: '14344849',
              result_typeFK: '6',
              result_code: 'runningscore',
              value: '2',
              n: '2',
              ut: '2022-10-10T19:50:15+00:00',
            },
            '60694918': {
              id: '60694918',
              event_participantsFK: '14344849',
              result_typeFK: '5',
              result_code: 'halftime',
              value: '1',
              n: '0',
              ut: '2022-10-10T19:34:26+00:00',
            },
            '60695235': {
              id: '60695235',
              event_participantsFK: '14344849',
              result_typeFK: '4',
              result_code: 'finalresult',
              value: '2',
              n: '0',
              ut: '2022-10-10T20:38:10+00:00',
            },
          },
          participant: {
            id: '9874',
            name: 'Sochaux',
            gender: 'male',
            type: 'team',
            countryFK: '5',
            n: '2',
            ut: '2018-06-05T08:03:27+00:00',
            country_name: 'France',
          },
        },
        '14344861': {
          id: '14344861',
          number: '2',
          participantFK: '9853',
          eventFK: '3904863',
          n: '0',
          ut: '2022-10-10T18:15:42+00:00',
          result: {
            '58211569': {
              id: '58211569',
              event_participantsFK: '14344861',
              result_typeFK: '1',
              result_code: 'ordinarytime',
              value: '1',
              n: '1',
              ut: '2022-10-10T20:11:40+00:00',
            },
            '58211571': {
              id: '58211571',
              event_participantsFK: '14344861',
              result_typeFK: '6',
              result_code: 'runningscore',
              value: '1',
              n: '1',
              ut: '2022-10-10T20:11:40+00:00',
            },
            '60694919': {
              id: '60694919',
              event_participantsFK: '14344861',
              result_typeFK: '5',
              result_code: 'halftime',
              value: '0',
              n: '0',
              ut: '2022-10-10T19:34:26+00:00',
            },
            '60695236': {
              id: '60695236',
              event_participantsFK: '14344861',
              result_typeFK: '4',
              result_code: 'finalresult',
              value: '1',
              n: '0',
              ut: '2022-10-10T20:38:10+00:00',
            },
          },
          participant: {
            id: '9853',
            name: 'Saint-Etienne',
            gender: 'male',
            type: 'team',
            countryFK: '5',
            n: '4',
            ut: '2022-06-27T18:47:17+00:00',
            country_name: 'France',
          },
        },
      },
      elapsed: {
        '1754404': {
          id: '1754404',
          elapsed: '90',
          injury_time: 'no',
          injury_time_elapsed: '0',
          time_type: 'minute',
          n: '99',
          ut: '2022-10-10T20:38:11+00:00',
        },
      },
    }

    const gameResolve = getGameResolve(event)

    const expectedGameResolve = {
      gameId: 3904863,
      homeScore: 2,
      awayScore: 1,
      status: 'finished',
    }
    expect(gameResolve).toEqual(expectedGameResolve)
  })
})
