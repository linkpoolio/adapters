import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { NO_EVENT_ODDS } from '../../src/lib/const'
import { encodeGameOdds, getGameOdds } from '../../src/lib/utils'
import { eventNBA1 } from '../unit/testCases'

describe('validation error', () => {
  const jobID = '1'
  process.env.API_KEY = 'test_api_key'
  const execute = makeExecute()

  const requests = [
    {
      name: 'date not supplied',
      testData: { id: jobID, data: { sportId: 4, endpoint: 'odds' } },
    },
    {
      name: 'date invalid',
      testData: {
        id: jobID,
        data: { sportId: 4, date: 'linkpool', endpoint: 'odds' },
      },
    },
    {
      name: 'sportId not supplied',
      testData: {
        id: jobID,
        data: { date: 1638297631, endpoint: 'odds' },
      },
    },
    {
      name: 'sportId invalid',
      testData: {
        id: jobID,
        data: { sportId: 'linkpool', date: 1638297631, endpoint: 'odds' },
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

describe('getGameOdds()', () => {
  const gameOddsTestCases = [
    {
      name: 'case all NO_EVENT_ODDS',
      testData: {
        event: eventNBA1,
        rawOdds: {
          moneyline_home: NO_EVENT_ODDS,
          moneyline_away: NO_EVENT_ODDS,
          moneyline_draw: NO_EVENT_ODDS,
        },
        expectedGameOdds: {
          gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
          homeOdds: 0,
          awayOdds: 0,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case some NO_EVENT_ODDS',
      testData: {
        event: eventNBA1,
        rawOdds: {
          moneyline_home: -16000,
          moneyline_away: 14000,
          moneyline_draw: NO_EVENT_ODDS,
        },
        expectedGameOdds: {
          gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
          homeOdds: -1600000,
          awayOdds: 1400000,
          drawOdds: 0,
        },
      },
    },
    {
      name: 'case no NO_EVENT_ODDS',
      testData: {
        event: eventNBA1,
        rawOdds: {
          moneyline_home: -16000,
          moneyline_away: 14000,
          moneyline_draw: 0,
        },
        expectedGameOdds: {
          gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
          homeOdds: -1600000,
          awayOdds: 1400000,
          drawOdds: 0,
        },
      },
    },
  ]
  it.each(gameOddsTestCases)('returns the game odds ($name)', ({ testData }) => {
    testData.event.lines['3'].moneyline.moneyline_home = testData.rawOdds.moneyline_home
    testData.event.lines['3'].moneyline.moneyline_away = testData.rawOdds.moneyline_away
    testData.event.lines['3'].moneyline.moneyline_draw = testData.rawOdds.moneyline_draw

    const gameOdds = getGameOdds(testData.event)

    expect(gameOdds).toEqual(testData.expectedGameOdds)
  })
})

describe('encodeGameCreated()', () => {
  it('returns a gameCreate encoded', () => {
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
