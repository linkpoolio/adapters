import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockScheduleResponseError,
  mockScheduleResponseMalformedMarketCreate,
  mockScheduleResponseSuccessMarketCreate,
  mockScheduleResponseSuccessMarketCreate2,
} from './fixtures'

export function oddsTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requesting Therundown API', () => {
      it('should throw an exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'odds',
            sportId: 4,
            date: 1635529231,
          },
        }
        mockScheduleResponseError()

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
      it('should throw and exception if the response is malformed', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'odds',
            sportId: 4,
            date: 1635529231,
          },
        }
        mockScheduleResponseMalformedMarketCreate()

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
      it('should return the odds', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'odds',
            sportId: 4,
            date: 1635529231,
          },
        }
        mockScheduleResponseSuccessMarketCreate()

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

      it('should return the odds (case filtering by gameIds - 2 results)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'odds',
            sportId: 1,
            date: 1662817303,
            gameIds: ['0017049a376cd9c73345507767295c74', '03a242a346a63835d9ba1797f3a10ff8'],
          },
        }
        mockScheduleResponseSuccessMarketCreate2()

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

      it('should return the odds (case filtering by gameIds - 0 results)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'odds',
            sportId: 1,
            date: 1662817303,
            gameIds: ['00000000000000000000000000000000'],
          },
        }
        mockScheduleResponseSuccessMarketCreate2()

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
