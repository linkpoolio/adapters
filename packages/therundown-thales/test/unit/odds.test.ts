import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'
import { getGameOdds, encodeGameOdds } from '../../src/lib/utils'

import { testCase } from '../unit/testCases'

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
  it('returns a gameCreate from an event', () => {
    const gameOdds = getGameOdds(testCase)

    const expectedGameOdds = {
      gameId: '0x3736313636626436623464653934653131633562643230636466336662313965',
      homeOdds: -16000,
      awayOdds: 14000,
      drawOdds: 0,
    }
    expect(gameOdds).toEqual(expectedGameOdds)
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
    const encodedGameOdds = encodeGameOdds(gameOdds)

    const expectedEncodedGameOdds =
      '0x3736313636626436623464653934653131633562643230636466336662313965ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc18000000000000000000000000000000000000000000000000000000000000036b00000000000000000000000000000000000000000000000000000000000000000'

    expect(encodedGameOdds).toEqual(expectedEncodedGameOdds)
  })
})
