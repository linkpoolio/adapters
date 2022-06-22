import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'
import { formatResponseData } from '../../src/endpoint/address-info'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()

  describe('validation error', () => {
    it('address no supplied', async () => {
      const testData = { id: jobID, data: { endpoint: 'address-info' } }
      try {
        await execute(testData as AdapterRequest)
      } catch (error) {
        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })
})

describe('formatResponseData()', () => {
  const testCases = [
    {
      name: 'address does not have KYC data',
      responseData: {
        object: '0xde78d3e8e46d0184841874da003928ecd89533a9',
        kycId: '',
        kycLevel: 0,
        objectType: 'address',
      },
      expectedformattedResponseData: {
        object: '0xde78d3e8e46d0184841874da003928ecd89533a9',
        kycId: '0x00000000000000000000000000000000000000000000',
        kycLevel: 0,
        objectType: 'address',
      },
    },
    {
      name: 'address has KYC data',
      responseData: {
        object: '0xff71f5d9b8f8b4886eb7224af5d03000839bc527',
        kycId: 'LAlfLGjYRsi28KdxaS2ffw',
        kycLevel: 0,
        objectType: 'address',
      },
      expectedformattedResponseData: {
        object: '0xff71f5d9b8f8b4886eb7224af5d03000839bc527',
        kycId: '0x4c416c664c476a5952736932384b6478615332666677',
        kycLevel: 0,
        objectType: 'address',
      },
    },
  ]
  testCases.forEach((testCase) => {
    it(`${testCase.name}`, () => {
      const formattedResponseData = formatResponseData(testCase.responseData)

      expect(formattedResponseData).toEqual(testCase.expectedformattedResponseData)
    })
  })
})
