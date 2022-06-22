import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import { mockResponseError, mockResponseSuccess, mockResponseSuccessMalformed } from './fixtures'

export function addressInfoTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requests CRD Network API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'address-info',
            address: '0xdE78D3e8e46D0184841874da003928ecd89533A9',
          },
        }
        mockResponseError()

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

    describe('when successfully requests CRD Network API', () => {
      it('should throw and exception if fails to format the response data', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'address-info',
            address: '0xdE78D3e8e46D0184841874da003928ecd89533A9',
          },
        }
        mockResponseSuccessMalformed()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertError({ expected: 200, actual: response.statusCode }, response.body, id)
      })
    })
  })

  describe('success calls', () => {
    it('returns the CRD Network API response data', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'address-info',
          address: '0xFf71F5d9B8f8B4886EB7224AF5D03000839BC527',
        },
      }
      mockResponseSuccess()

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
}
