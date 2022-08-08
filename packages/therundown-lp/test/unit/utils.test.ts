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
          homeScore: 122,
          awayScore: 131,
          gameId: '0x6364396535363332356334646438346235396635636332313365373763396638',
          statusId: 8,
        },
      },
    },
    {
      name: 'NBA (without winner, scheduled)',
      testData: {
        event: eventNBA1,
        sportId: SportId.NBA,
        expectedGameResolve: {
          homeScore: 0,
          awayScore: 0,
          gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
          statusId: 18,
        },
      },
    },
    {
      name: 'MMA',
      testData: {
        event: eventMMA1,
        sportId: SportId.MMA,
        expectedGameResolve: {
          homeScore: 0,
          awayScore: 1,
          gameId: '0x3030303935396433396532613763613166656139333832376539646230663834',
          statusId: 8,
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

describe('encodeGameResolved()', () => {
  it('returns a GameResolve encoded', () => {
    const gameResolve = {
      homeScore: 114,
      awayScore: 121,
      gameId: '0x3131656333313439366561303130303038353431323634313062353762366463',
      statusId: 8,
    }
    const expectedEncodedGameResolve =
      '0x3131656333313439366561303130303038353431323634313062353762366463000000000000000000000000000000000000000000000000000000000000007200000000000000000000000000000000000000000000000000000000000000790000000000000000000000000000000000000000000000000000000000000008'

    const encodedGameResolve = encodeGameResolve(gameResolve)

    expect(encodedGameResolve).toEqual(expectedEncodedGameResolve)
  })
})
