import Job from '../../src/models/job'
import { Provider } from '../../src/api/constants'

describe('models', () => {
  describe('lanceria transformer', () => {
    it('hydrates an IJob object', async () => {
      const jobRequest = {
        jobId: 1,
        amount: '10000000000000000000',
        employerAddress: '0x6613A30A0D7F4011Cb569ca89f5a107cF9A542f2',
        freelancerAddress: '0xbDf9CD30F6201B02F48d94878a86cf9B375f6344',
      }
      const expectedJob = {
        id: 1,
        employer: {
          address: '0x6613A30A0D7F4011Cb569ca89f5a107cF9A542f2',
        },
        freelancer: {
          address: '0xbDf9CD30F6201B02F48d94878a86cf9B375f6344',
        },
        payment: {
          amount: '10000000000000000000',
          currency: 'LANC',
        },
      }

      expect(Job.Single(jobRequest, Provider.LANCERIA)).toEqual(expectedJob)
    })
  })
})
