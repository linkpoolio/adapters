import { AdapterError } from '@chainlink/ea-bootstrap'

import { Provider } from '../../src/api/constants'
import Address, { EverestKYCStatus } from '../../src/models/address'

describe('models', () => {
  describe('ciphertrace transformer', () => {
    const addressesGetPayloadItemTestCases = [
      {
        name: 'case 1 - address was found',
        testData: {
          record: {
            Blockchain: 'eth',
            Address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
          },
          expectedAddress: {
            isFound: true,
            network: 'ETH',
            address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            aml: {
              isSanctioned: true,
            },
            kyc: {
              status: null,
              timestamp: null,
            },
          },
        },
      },
      {
        name: 'case 2 - address was found',
        testData: {
          record: {
            Blockchain: '',
            Address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          },
          expectedAddress: {
            isFound: true,
            network: null,
            address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
            aml: {
              isSanctioned: true,
            },
            kyc: {
              status: null,
              timestamp: null,
            },
          },
        },
      },
      {
        name: 'case 3 - address was not found',
        testData: {
          record: {},
          expectedAddress: {
            isFound: false,
            network: null,
            address: null,
            aml: {
              isSanctioned: false,
            },
            kyc: {
              status: null,
              timestamp: null,
            },
          },
        },
      },
      {
        name: 'case 4 - address was not found',
        testData: {
          record: {
            Blockchain: 'eth',
            Address: '',
          },
          expectedAddress: {
            isFound: false,
            network: 'ETH',
            address: null,
            aml: {
              isSanctioned: false,
            },
            kyc: {
              status: null,
              timestamp: null,
            },
          },
        },
      },
      {
        name: 'case 5 - address was not found',
        testData: {
          record: {
            Blockchain: '',
            Address: '',
          },
          expectedAddress: {
            isFound: false,
            network: null,
            address: null,
            aml: {
              isSanctioned: false,
            },
            kyc: {
              status: null,
              timestamp: null,
            },
          },
        },
      },
    ]
    it.each(addressesGetPayloadItemTestCases)(
      'Address.Single: hydrates an IAddress object ($name)',
      ({ testData }) => {
        expect(Address.Single(testData.record, Provider.CIPHERTRACE)).toEqual(
          testData.expectedAddress,
        )
      },
    )

    it('Address.List: hydrates multiple IAddress objects', () => {
      const addressGetPayload = [
        {
          Blockchain: 'eth',
          Address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
        },
        {
          Blockchain: 'btc',
          Address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        },
      ]
      const expectedAddresses = [
        {
          isFound: true,
          network: 'ETH',
          address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          aml: {
            isSanctioned: true,
          },
          kyc: {
            status: null,
            timestamp: null,
          },
        },
        {
          isFound: true,
          network: 'BTC',
          address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          aml: {
            isSanctioned: true,
          },
          kyc: {
            status: null,
            timestamp: null,
          },
        },
      ]

      expect(Address.List(addressGetPayload, Provider.CIPHERTRACE)).toEqual(expectedAddresses)
    })
  })

  describe('everest transformer', () => {
    const addressesGetPayloadItemTestCases = [
      {
        name: 'case 1 - status is NOT_FOUND',
        testData: {
          payload: {
            success: true,
            data: {
              isHumanAndUniqueUser: false,
              isKYCUser: false,
              KYCDate: null,
            },
            error: null,
          },
          expectedAddress: {
            isFound: false,
            network: null,
            address: null,
            aml: {
              isSanctioned: null,
            },
            kyc: {
              status: EverestKYCStatus.NOT_FOUND,
              timestamp: 0,
            },
          },
        },
      },
      {
        name: 'case 2 - status is HUMAN_UNIQUE',
        testData: {
          payload: {
            success: true,
            data: {
              isHumanAndUniqueUser: true,
              isKYCUser: false,
              KYCDate: null,
            },
            error: null,
          },
          expectedAddress: {
            isFound: true,
            network: null,
            address: null,
            aml: {
              isSanctioned: null,
            },
            kyc: {
              status: EverestKYCStatus.HUMAN_UNIQUE,
              timestamp: 0,
            },
          },
        },
      },
      {
        name: 'case 3 - status is KYC_USER',
        testData: {
          payload: {
            success: true,
            data: {
              isHumanAndUniqueUser: true,
              isKYCUser: true,
              KYCDate: '2022-09-16T13:07:39Z',
            },
            error: null,
          },
          expectedAddress: {
            isFound: true,
            network: null,
            address: null,
            aml: {
              isSanctioned: null,
            },
            kyc: {
              status: EverestKYCStatus.KYC_USER,
              timestamp: 1663333659,
            },
          },
        },
      },
    ]
    it.each(addressesGetPayloadItemTestCases)(
      'Address.Single: hydrates an IAddress object ($name)',
      ({ testData }) => {
        expect(Address.Single(testData.payload, Provider.EVEREST)).toEqual(testData.expectedAddress)
      },
    )

    it('Address.List: throws an error', () => {
      expect(() => Address.List([], Provider.EVEREST)).toThrow(AdapterError)
    })
  })
})
