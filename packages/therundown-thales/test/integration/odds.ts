import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { Endpoint, SportId } from '../../src/lib/const'
import type { SuiteContext } from './adapter.test'
import { mockOddsSportId1Success1 } from './fixtures/sportId1'
import { mockOddsSportId2Success1 } from './fixtures/sportId2'
import {
  mockOddsSportId4Error1,
  mockOddsSportId4Error2,
  mockOddsSportId4Success2,
} from './fixtures/sportId4'

export function oddsTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requesting Therundown API', () => {
      it('should throw an exception (sportId: 4, limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NBA,
            date: 1635529231,
            bookmakerIds: [11, 3],
            limit: 20,
          },
        }
        mockOddsSportId4Error1()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertError({ expected: 500, actual: response.body.providerStatusCode }, response.body, id)
      })
    })

    describe('when successfully requesting Therundown API', () => {
      it('should throw and exception if the response is malformed (sportId: 4, limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NBA,
            date: 1635529231,
            bookmakerIds: [11, 3],
            limit: 20,
          },
        }
        mockOddsSportId4Error2()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)

        assertError({ expected: 500, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
    })
  })

  describe('success calls', () => {
    describe('when successfully requesting Therundown API', () => {
      it('should return 1 result (sportId: 4, bookmakerIds: [11, 3], limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NBA,
            date: 1635529231,
            bookmakerIds: [11, 3],
            limit: 20,
          },
        }
        mockOddsSportId4Success2()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })

      it('should return 2 results (sportId: 1, bookmakerIds: [3, 11], gameIds: 2 items (2 exist), limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            bookmakerIds: [3, 11],
            gameIds: ['0017049a376cd9c73345507767295c74', '03a242a346a63835d9ba1797f3a10ff8'],
            limit: 20,
          },
        }
        mockOddsSportId1Success1()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })

      it('should return 0 results (sportId: 1, bookmakerIds: [3, 11], gameIds: 1 item (0 exist), limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            bookmakerIds: [3, 11],
            gameIds: ['00000000000000000000000000000000'],
            limit: 20,
          },
        }
        mockOddsSportId1Success1()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })

      it('should return 2 results and has 1 more (sportId: 1, bookmakerIds: [3, 11], limit: 2, startAfterGameId: yes (exist))', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            bookmakerIds: [3, 11],
            limit: 2,
            startAfterGameId: '0017049a376cd9c73345507767295c74',
          },
        }
        mockOddsSportId1Success1()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })

      it('should return 2 results (sportId: 2, bookmakerIds: [3, 11], limit:20, moneyline, spread & total odds not 0)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NFL,
            date: 1669248000,
            bookmakerIds: [3, 11],
            limit: 20,
          },
        }
        mockOddsSportId2Success1()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
    })
  })
}
