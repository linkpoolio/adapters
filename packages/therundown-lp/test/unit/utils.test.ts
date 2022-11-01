import { SportId, sportIdsRequireMascot } from '../../src/lib/const'
import type { Event } from '../../src/lib/types'
import {
  encodeGameCreate,
  encodeGameResolve,
  getGameCreate,
  getGameResolve,
  getHomeAwayName,
} from '../../src/lib/utils'
import { eventMMA1, eventNBA1, eventNBA2 } from '../unit/testCases'

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
        expectedGameCreate: {
          homeTeam: 'St. Louis Blues',
          awayTeam: 'New York Islanders',
          gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
          startTime: 1649548800,
        },
      },
    },
    {
      name: 'MMA',
      testData: {
        event: eventMMA1,
        sportId: SportId.MMA,
        expectedGameCreate: {
          homeTeam: 'Mark Coates',
          awayTeam: 'Jaylon Bates',
          gameId: '0x3030303935396433396532613763613166656139333832376539646230663834',
          startTime: 1658530800,
        },
      },
    },
  ]
  it.each(getGameCreateTestCases)(
    'returns the GameCreate from an event (case $name)',
    ({ testData }) => {
      const gameCreate = getGameCreate(testData.event, testData.sportId)

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
        expectedGameResolve: {
          homeScoreByPeriod: [31, 28, 40, 23],
          awayScoreByPeriod: [33, 49, 25, 24],
          homeScore: 122,
          awayScore: 131,
          gameId: '0x6364396535363332356334646438346235396635636332313365373763396638',
          statusId: 8,
          updatedAt: 1649265524,
        },
      },
    },
    {
      name: 'NBA (without winner, scheduled)',
      testData: {
        event: eventNBA1,
        sportId: SportId.NBA,
        expectedGameResolve: {
          homeScoreByPeriod: [],
          awayScoreByPeriod: [],
          homeScore: 0,
          awayScore: 0,
          gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
          statusId: 18,
          updatedAt: 1649265524,
        },
      },
    },
    {
      name: 'MMA',
      testData: {
        event: eventMMA1,
        sportId: SportId.MMA,
        expectedGameResolve: {
          homeScoreByPeriod: [],
          awayScoreByPeriod: [],
          homeScore: 0,
          awayScore: 1,
          gameId: '0x3030303935396433396532613763613166656139333832376539646230663834',
          statusId: 8,
          updatedAt: 1649265524,
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

describe('encodeGameCreated()', () => {
  it('returns a GameCreate encoded', () => {
    const gameCreate = {
      homeTeam: 'St. Louis Blues',
      awayTeam: 'New York Islanders',
      gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
      startTime: 1649548800,
    }
    const expectedEncodedGameCreate =
      '0x000000000000000000000000000000000000000000000000000000000000002037363136366264366234646539346531316335626432306364663366623139650000000000000000000000000000000000000000000000000000000062521e00000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000f53742e204c6f75697320426c756573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000124e657720596f726b2049736c616e646572730000000000000000000000000000'

    const encodedGameCreate = encodeGameCreate(gameCreate)

    expect(encodedGameCreate).toEqual(expectedEncodedGameCreate)
  })
})

describe('encodeGameResolve()', () => {
  const encodeGameResolveTestCases = [
    {
      name: 'GameResolve with final score (hasScoresByPeriod is false)',
      testData: {
        hasScoresByPeriod: false,
        GameResolve: {
          homeScoreByPeriod: [31, 28, 40, 23],
          awayScoreByPeriod: [33, 49, 25, 24],
          homeScore: 122,
          awayScore: 131,
          gameId: '0x6364396535363332356334646438346235396635636332313365373763396638',
          statusId: 8,
          updatedAt: 1649265524,
        },
        expectedEncodedGameResolve:
          '0x6364396535363332356334646438346235396635636332313365373763396638000000000000000000000000000000000000000000000000000000000000007a0000000000000000000000000000000000000000000000000000000000000083000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000624dcb74',
      },
    },
    {
      name: 'GameResolve with scores per period (hasScoresByPeriod is true)',
      testData: {
        hasScoresByPeriod: true,
        GameResolve: {
          homeScoreByPeriod: [31, 28, 40, 23],
          awayScoreByPeriod: [33, 49, 25, 24],
          homeScore: 122,
          awayScore: 131,
          gameId: '0x6364396535363332356334646438346235396635636332313365373763396638',
          statusId: 8,
          updatedAt: 1649265524,
        },
        expectedEncodedGameResolve:
          '0x0000000000000000000000000000000000000000000000000000000000000020636439653536333235633464643834623539663563633231336537376339663800000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000624dcb740000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001f000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000001700000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000021000000000000000000000000000000000000000000000000000000000000003100000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000018',
      },
    },
  ]

  it.each(encodeGameResolveTestCases)(
    'returns a GameResolve encoded from an event (case $name)',
    ({ testData }) => {
      const encodedGameResolve = encodeGameResolve(testData.GameResolve, testData.hasScoresByPeriod)

      expect(encodedGameResolve).toEqual(testData.expectedEncodedGameResolve)
    },
  )
})
