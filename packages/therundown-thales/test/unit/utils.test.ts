import { NO_EVENT_ODDS, SportId, sportIdsRequireMascot } from '../../src/lib/const'
import type { Event } from '../../src/lib/types'
import {
  encodeGameCreate,
  encodeGameOdds,
  encodeGameResolve,
  getGameCreate,
  getGameOdds,
  getGameResolve,
  getHomeAwayName,
  getOdds,
} from '../../src/lib/utils'
import { eventMLS1, eventMMA1, eventNBA1, eventNBA2 } from '../unit/testCases'

describe('getHomeAwayName()', () => {
  const sportIdValues = Object.values(SportId)
  const numberOfSportId = sportIdValues.length / 2 // NB: SportId is a numeric enum
  const sportIds = sportIdValues.slice(numberOfSportId)
  it.each(sportIds)(
    `returns the expected home and away team name (case sportId is %s)`,
    (sportId) => {
      const event = {
        teams_normalized: [
          {
            name: 'New York',
            mascot: 'Islanders',
            is_away: true,
            is_home: false,
          },
          {
            name: 'St. Louis',
            mascot: 'Blues',
            is_away: false,
            is_home: true,
          },
        ],
      }
      const expectedHomeName = sportIdsRequireMascot.includes(sportId as SportId)
        ? 'St. Louis Blues'
        : 'St. Louis'
      const expectedAwayName = sportIdsRequireMascot.includes(sportId as SportId)
        ? 'New York Islanders'
        : 'New York'

      const homeAwayName = getHomeAwayName(event as Event, sportId as SportId)

      expect(homeAwayName.homeName).toBe(expectedHomeName)
      expect(homeAwayName.awayName).toBe(expectedAwayName)
    },
  )
})

describe('getGameCreate()', () => {
  const getGameCreateTestCases = [
    {
      name: 'NBA',
      testData: {
        event: eventNBA1,
        sportId: SportId.NBA,
        sportIdToBookmakers: {
          '4': [3, 11],
        },
        expectedGameCreate: {
          homeTeam: 'St. Louis Blues',
          awayTeam: 'New York Islanders',
          gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
          startTime: 1649548800,
        },
      },
    },
    {
      name: 'MMA',
      testData: {
        event: eventMMA1,
        sportId: SportId.MMA,
        sportIdToBookmakers: {
          '7': [3, 11],
        },
        expectedGameCreate: {
          homeTeam: 'Mark Coates',
          awayTeam: 'Jaylon Bates',
          gameId: '0x3030303935396433396532613763613166656139333832376539646230663834',
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
          startTime: 1658530800,
        },
      },
    },
  ]
  it.each(getGameCreateTestCases)(
    'returns the GameCreate from an event (case $name)',
    ({ testData }) => {
      const gameCreate = getGameCreate(
        testData.event,
        testData.sportId,
        testData.sportIdToBookmakers[testData.sportId],
      )

      expect(gameCreate).toEqual(testData.expectedGameCreate)
    },
  )
})

describe('getGameResolve()', () => {
  const getGameResolveTestCases = [
    {
      name: 'NBA',
      testData: {
        event: eventNBA2,
        sportId: SportId.NBA,
        sportIdToBookmakers: {
          '4': [3, 11],
        },
        expectedGameResolve: {
          homeScore: 122,
          awayScore: 131,
          gameId: '0x6364396535363332356334646438346235396635636332313365373763396638',
          statusId: 8,
          updatedAt: 1649126125,
        },
      },
    },
    {
      name: 'NBA (without winner, scheduled)',
      testData: {
        event: eventNBA1,
        sportId: SportId.NBA,
        sportIdToBookmakers: {
          '4': [3, 11],
        },
        expectedGameResolve: {
          homeScore: 0,
          awayScore: 0,
          gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
          statusId: 18,
          updatedAt: 1649126125,
        },
      },
    },
    {
      name: 'MMA',
      testData: {
        event: eventMMA1,
        sportId: SportId.MMA,
        sportIdToBookmakers: {
          '7': [3, 11],
        },
        expectedGameResolve: {
          homeScore: 0,
          awayScore: 1,
          gameId: '0x3030303935396433396532613763613166656139333832376539646230663834',
          statusId: 8,
          updatedAt: 1649126125,
        },
      },
    },
  ]
  it.each(getGameResolveTestCases)(
    'returns the GameResolve from an event (case $name)',
    ({ testData }) => {
      const getResolve = getGameResolve(testData.event, testData.sportId)

      expect(getResolve).toEqual(testData.expectedGameResolve)
    },
  )
})

describe('getGameOdds()', () => {
  const getGameResolveTestCases = [
    {
      name: 'NBA',
      testData: {
        event: eventNBA2,
        sportId: SportId.NBA,
        sportIdToBookmakers: {
          '4': [3, 11],
        },
        expectedGameResolve: {
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
          gameId: '0x6364396535363332356334646438346235396635636332313365373763396638',
        },
      },
    },
  ]
  it.each(getGameResolveTestCases)(
    'returns the GameResolve from an event (case $name)',
    ({ testData }) => {
      const getResolve = getGameOdds(
        testData.event,
        testData.sportId,
        testData.sportIdToBookmakers[testData.sportId],
      )

      expect(getResolve).toEqual(testData.expectedGameResolve)
    },
  )
})

describe('getOdds()', () => {
  it(`throws an error if bookmakerIds is an empty Array`, async () => {
    expect(() => getOdds(eventMLS1, SportId.MLS, [])).toThrow()
  })

  const getOddsTestCases = [
    {
      name: 'case: sport with draw odds, 1 bookmaker, 1st bookmaker ID is missing. Returns default odds',
      testData: {
        event: eventMLS1,
        sportId: SportId.MLS,
        sportIdToBookmakers: {
          [SportId.MLS]: [7],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: 1,
              moneyline_away: 2,
              moneyline_draw: 3,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: 4,
              moneyline_away: 5,
              moneyline_draw: 6,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case: sport with draw odds, 2 bookmakers, 1st and 2nd bookmaker IDs are missing. Returns default odds',
      testData: {
        event: eventMLS1,
        sportId: SportId.MLS,
        sportIdToBookmakers: {
          [`${SportId.MLS}`]: [1, 2],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: 1,
              moneyline_away: 2,
              moneyline_draw: 3,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: 4,
              moneyline_away: 5,
              moneyline_draw: 6,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case: sport with no draw odds, 1 bookmaker, 1st bookmaker ID is missing. Returns default odds',
      testData: {
        event: eventNBA1,
        sportId: SportId.NBA,
        sportIdToBookmakers: {
          [`${SportId.NBA}`]: [1],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: 1,
              moneyline_away: 2,
              moneyline_draw: 3,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: 4,
              moneyline_away: 5,
              moneyline_draw: 6,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case: sport with no draw odds, 2 bookmakers, 1st and 2nd bookmaker IDs are missing. Returns default odds',
      testData: {
        event: eventNBA1,
        sportId: SportId.NBA,
        sportIdToBookmakers: {
          [`${SportId.NBA}`]: [1, 2],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: 1,
              moneyline_away: 2,
              moneyline_draw: 3,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: 4,
              moneyline_away: 5,
              moneyline_draw: 6,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case: sport with draw odds, 2 bookmakers, 1st bookmaker has odds. Returns 1st bookmaker odds',
      testData: {
        event: eventMLS1,
        sportId: SportId.MLS,
        sportIdToBookmakers: {
          [SportId.MLS]: [3, 11],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: 1,
              moneyline_away: 2,
              moneyline_draw: 3,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: 4,
              moneyline_away: 5,
              moneyline_draw: 6,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 100,
          awayOdds: 200,
          drawOdds: 300,
        },
      },
    },
    {
      name: 'case: sport with draw odds, 2 bookmakers, 1st bookmaker has no odds. 2nd bookmaker has odds. Returns 2nd bookmaker odds',
      testData: {
        event: eventMLS1,
        sportId: SportId.MLS,
        sportIdToBookmakers: {
          [`${SportId.MLS}`]: [3, 11],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: 1,
              moneyline_away: 2,
              moneyline_draw: NO_EVENT_ODDS,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: 4,
              moneyline_away: 5,
              moneyline_draw: 6,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 400,
          awayOdds: 500,
          drawOdds: 600,
        },
      },
    },
    {
      name: 'case: sport with draw odds, 2 bookmakers, 1st and 2nd bookmaker have no draw odds. Falls back to 2nd bookmaker',
      testData: {
        event: eventMLS1,
        sportId: SportId.MLS,
        sportIdToBookmakers: {
          [`${SportId.MLS}`]: [3, 11],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: 1,
              moneyline_away: 2,
              moneyline_draw: NO_EVENT_ODDS,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: 4,
              moneyline_away: 5,
              moneyline_draw: NO_EVENT_ODDS,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 400,
          awayOdds: 500,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case: sport with draw odds, 2 bookmakers, 1st and 2nd bookmaker have no odds. Returns default odds',
      testData: {
        event: eventMLS1,
        sportId: SportId.MLS,
        sportIdToBookmakers: {
          [`${SportId.MLS}`]: [3, 11],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: 1,
              moneyline_away: NO_EVENT_ODDS,
              moneyline_draw: 3,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: NO_EVENT_ODDS,
              moneyline_away: 5,
              moneyline_draw: NO_EVENT_ODDS,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case: sport with no draw odds, 2 bookmakers, 1st bookmaker has odds. Returns 1st bookmaker odds with drawOdds default value',
      testData: {
        event: eventNBA1,
        sportId: SportId.NBA,
        sportIdToBookmakers: {
          [`${SportId.NBA}`]: [3, 11],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: 1,
              moneyline_away: 2,
              moneyline_draw: 3,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: 4,
              moneyline_away: 5,
              moneyline_draw: 6,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 100,
          awayOdds: 200,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case: sport with no draw odds, 2 bookmakers, 1st bookmaker has no odds. 2nd bookmaker has odds. Returns 2nd bookmaker odds with drawOdds default value',
      testData: {
        event: eventNBA1,
        sportId: SportId.NBA,
        sportIdToBookmakers: {
          [`${SportId.NBA}`]: [3, 11],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: NO_EVENT_ODDS,
              moneyline_away: 2,
              moneyline_draw: 3,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: 4,
              moneyline_away: 5,
              moneyline_draw: 6,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 400,
          awayOdds: 500,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case: sport with no draw odds, 2 bookmakers, 1st and 2nd bookmaker have no odds. Returns default odds',
      testData: {
        event: eventNBA1,
        sportId: SportId.NBA,
        sportIdToBookmakers: {
          [`${SportId.NBA}`]: [3, 11],
        },
        lines: {
          '3': {
            moneyline: {
              moneyline_home: NO_EVENT_ODDS,
              moneyline_away: 2,
              moneyline_draw: 3,
            },
          },
          '11': {
            moneyline: {
              moneyline_home: NO_EVENT_ODDS,
              moneyline_away: 5,
              moneyline_draw: 6,
            },
          },
        },
        expectedGameOdds: {
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
        },
      },
    },
  ]
  it.each(getOddsTestCases)('returns the game odds ($name)', ({ testData }) => {
    testData.event['lines'] = testData.lines

    const gameOdds = getOdds(
      testData.event,
      testData.sportId,
      testData.sportIdToBookmakers[testData.sportId],
    )

    expect(gameOdds).toEqual(testData.expectedGameOdds)
  })
})

describe('encodeGameCreate()', () => {
  it('returns a GameCreate encoded', () => {
    const gameCreate = {
      homeTeam: 'St. Louis Blues',
      awayTeam: 'New York Islanders',
      gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
      homeOdds: 0,
      awayOdds: 0,
      drawOdds: 0,
      startTime: 1649548800,
    }
    const expectedEncodedGameCreate =
      '0x000000000000000000000000000000000000000000000000000000000000002037363136366264366234646539346531316335626432306364663366623139650000000000000000000000000000000000000000000000000000000062521e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000f53742e204c6f75697320426c756573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000124e657720596f726b2049736c616e646572730000000000000000000000000000'

    const encodedGameCreate = encodeGameCreate(gameCreate)

    expect(encodedGameCreate).toEqual(expectedEncodedGameCreate)
  })
})

describe('encodeGameResolve()', () => {
  it('returns a GameResolve encoded', () => {
    const gameResolve = {
      homeScore: 114,
      awayScore: 121,
      gameId: '0x3131656333313439366561303130303038353431323634313062353762366463',
      statusId: 8,
      updatedAt: 1649548800,
    }
    const expectedEncodedGameResolve =
      '0x31316563333134393665613031303030383534313236343130623537623664630000000000000000000000000000000000000000000000000000000000000072000000000000000000000000000000000000000000000000000000000000007900000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000062521e00'

    const encodedGameResolve = encodeGameResolve(gameResolve)

    expect(encodedGameResolve).toEqual(expectedEncodedGameResolve)
  })
})

describe('encodeGameOdds()', () => {
  it('returns a GameOdds encoded', () => {
    const gameOdds = {
      gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
      homeOdds: -16000,
      awayOdds: 14000,
      drawOdds: 0,
    }
    const expectedEncodedGameOdds =
      '0x3736313636626436623464653934653131633562643230636466336662313965ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc18000000000000000000000000000000000000000000000000000000000000036b00000000000000000000000000000000000000000000000000000000000000000'

    const encodedGameOdds = encodeGameOdds(gameOdds)

    expect(encodedGameOdds).toEqual(expectedEncodedGameOdds)
  })
})
