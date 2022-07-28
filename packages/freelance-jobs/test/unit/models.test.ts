import { ethers } from 'ethers'

import Job from '../../src/models/job'
import { Provider } from '../../src/api/constants'

describe('models', () => {
  describe('lanceria transformer', () => {
    const testCases = [
      {
        name: 'case 1',
        testData: {
          jobRequest: {
            jobId: 1,
            amount: '10000000000000000000',
            employerAddress: '0x6613A30A0D7F4011Cb569ca89f5a107cF9A542f2',
            freelancerAddress: '0xbDf9CD30F6201B02F48d94878a86cf9B375f6344',
          },
          expectedJob: {
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
              units: 'wei',
            },
          },
        },
      },
      {
        name: 'case 2 - no freelancerAddress',
        testData: {
          jobRequest: {
            jobId: 777,
            amount: '0',
            employerAddress: '0x6613A30A0D7F4011Cb569ca89f5a107cF9A542f2',
            freelancerAddress: null,
          },
          expectedJob: {
            id: 777,
            employer: {
              address: '0x6613A30A0D7F4011Cb569ca89f5a107cF9A542f2',
            },
            freelancer: {
              address: ethers.constants.AddressZero,
            },
            payment: {
              amount: '0',
              currency: 'LANC',
              units: 'wei',
            },
          },
        },
      },
    ]
    it.each(testCases)('hydrates an IJob object ($name)', async ({ testData }) => {
      expect(Job.Single(testData.jobRequest, Provider.LANCERIA)).toEqual(testData.expectedJob)
    })
  })
})
