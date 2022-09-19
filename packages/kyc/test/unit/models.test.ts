import { Provider } from '../../src/api/constants'
import Address from '../../src/models/address'

describe('models', () => {
  describe('ciphertrace transformer', () => {
    const addressesGetPayloadItemTestCases = [
      {
        name: 'address is malicious 1',
        testData: {
          record: {
            Blockchain: 'eth',
            Address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
          },
          expectedAddress: {
            network: 'ETH',
            address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            isMalicious: true,
          },
        },
      },
      {
        name: 'address is malicious 2',
        testData: {
          record: {
            Blockchain: '',
            Address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          },
          expectedAddress: {
            network: null,
            address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
            isMalicious: true,
          },
        },
      },
      {
        name: 'address is not malicious 1',
        testData: {
          record: {},
          expectedAddress: {
            network: null,
            address: null,
            isMalicious: false,
          },
        },
      },
      {
        name: 'address is not malicious 2',
        testData: {
          record: {
            Blockchain: 'eth',
            Address: '',
          },
          expectedAddress: {
            network: 'ETH',
            address: null,
            isMalicious: false,
          },
        },
      },
      {
        name: 'address is not malicious 3',
        testData: {
          record: {
            Blockchain: '',
            Address: '',
          },
          expectedAddress: {
            network: null,
            address: null,
            isMalicious: false,
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
          network: 'ETH',
          address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          isMalicious: true,
        },
        {
          network: 'BTC',
          address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          isMalicious: true,
        },
      ]

      expect(Address.List(addressGetPayload, Provider.CIPHERTRACE)).toEqual(expectedAddresses)
    })
  })
})
