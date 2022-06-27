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
      homeTeam: 'Los Angeles Lakers',
      awayTeam: 'Golden State Warriors',
      gameId: '0x3438663264363964356330383932346236383261323737333131653135383833',
      startTime: 1634695200,
    }
    expect(gameCreate).toEqual(expectedGameCreate)
  })
})

describe('getGameResolve()', () => {
  it('returns a gameResolve from an event', () => {
    const getResolve = getGameResolve(testCase)

    const expectedGameResolve = {
      homeScore: 114,
      awayScore: 121,
      gameId: '0x3438663264363964356330383932346236383261323737333131653135383833',
      statusId: 8,
    }
    expect(getResolve).toEqual(expectedGameResolve)
  })
})

describe('encodeGameCreated()', () => {
  it('returns a gameCreate encoded', () => {
    const gameCreate = {
      homeTeam: 'Los Angeles Lakers',
      awayTeam: 'Golden State Warriors',
      gameId: '0x3438663264363964356330383932346236383261323737333131653135383833',
      startTime: 1634695200,
    }
    const encodedGameCreate = encodeGameCreate(gameCreate)

    const expectedEncodedGameCreate =
      '0x0000000000000000000000000000000000000000000000000000000000000020343866326436396435633038393234623638326132373733313165313538383300000000000000000000000000000000000000000000000000000000616f7820000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000124c6f7320416e67656c6573204c616b65727300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000015476f6c64656e2053746174652057617272696f72730000000000000000000000'

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
