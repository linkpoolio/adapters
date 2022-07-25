import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'

import type { SuiteContext } from '../adapter.test'
import { jobsInput } from '../common'
import { mockJobsSingleError, mockJobsSingleSuccess } from './fixtures'

export function testJobs(context: SuiteContext): void {
  describe('error calls', () => {
    it('returns an error response when the API errors too', async () => {
      const jobsSingleInput = { ...jobsInput }
      jobsSingleInput.data.jobId = 1
      mockJobsSingleError()

      const response = await context.req
        .post('/')
        .send(jobsSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertError(
        { expected: 500, actual: response.body.providerStatusCode },
        response.body,
        jobsInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })

    describe('success calls', () => {
      it('returns a single job', async () => {
        const jobsSingleInput = { ...jobsInput }
        jobsSingleInput.data.jobId = 1
        mockJobsSingleSuccess()

        const response = await context.req
          .post('/')
          .send(jobsSingleInput)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess(
          { expected: 200, actual: response.body.statusCode },
          response.body,
          jobsInput.id,
        )
        expect(response.body).toMatchSnapshot()
      })
    })
  })
}
