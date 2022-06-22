import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockResponseError,
  mockResponseSuccessInternalError,
  mockResponseSuccessInvalid,
  mockResponseSuccessValid,
} from './fixtures'

export function containsMostVisitedLocationTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requests solipay API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'contains-most-visited-location',
            address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
            countryCodes: 'PT-ES-FR-IT',
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

    describe('when successfully requests solipay API and response "res" is false', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'contains-most-visited-location',
            address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
            countryCodes: 'PT-ES-FR-IT',
          },
        }
        mockResponseSuccessInternalError()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertError({ expected: 200, actual: response.body.providerStatusCode }, response.body, id)
      })
    })
  })

  describe('success calls', () => {
    it('returns an invalid result', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'contains-most-visited-location',
          address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
          countryCodes: 'PT-ES-FR-IT',
        },
      }
      mockResponseSuccessInvalid('Non-Solipay Address')

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

    it('returns a valid result', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'contains-most-visited-location',
          address: '0x896e90716f673e0003452f700a0ba44bbfc49c79',
          countryCodes: 'PT-ES-FR-IT-US',
          days: 7,
        },
      }
      mockResponseSuccessValid()

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
