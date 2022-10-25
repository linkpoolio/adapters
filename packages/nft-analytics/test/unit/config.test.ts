import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { enums } from '@linkpool/shared'

import { Provider } from '../../src/api/constants'
import { makeConfig } from '../../src/config'

let oldEnv: NodeJS.ProcessEnv

beforeEach(() => {
  oldEnv = JSON.parse(JSON.stringify(process.env))
  process.env.LOG_LEVEL = 'debug'
})

afterEach(() => {
  process.env = oldEnv
})

describe('config', () => {
  const jobID = '1'

  describe('ApiProviderConfig', () => {
    it('throws an error if API_PROVIDER is not set', () => {
      expect.hasAssertions()
      const expectedMessage = 'Please set the required env API_PROVIDER'

      try {
        makeConfig()
      } catch (error) {
        expect(error.message.includes(expectedMessage)).toBe(true)
        expect(error.constructor.name).toBe('RequiredEnvError')

        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 500, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })

    it('throws an error if API_PROVIDER is not set', () => {
      process.env.API_PROVIDER = 'nicolas_cage'

      expect.hasAssertions()
      const expectedMessage = `Unsupported provider: ${
        process.env.API_PROVIDER
      }. Supported providers are: ${enums.formatEnumValuesPretty(
        Provider as unknown as Record<string, number>,
      )}. Check API_PROVIDER env var`

      try {
        makeConfig()
      } catch (error) {
        expect(error.message.includes(expectedMessage)).toBe(true)

        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 500, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })

  describe('BitscrunchApiProviderConfig', () => {
    const testCases = [
      {
        name: 'BITSCRUNCH_API_KEY is not set',
        testData: {
          envVars: {
            BITSCRUNCH_API_KEY: undefined,
          },
          expectedMessage: 'Please set the required env BITSCRUNCH_API_KEY',
        },
      },
    ]
    it.each(testCases)('throws an error if ($name) env var is not set', ({ testData }) => {
      expect.hasAssertions()
      process.env.API_PROVIDER = Provider.BITSCRUNCH
      process.env = { ...process.env, ...testData.envVars }

      try {
        makeConfig()
      } catch (error) {
        expect(error.message.includes(testData.expectedMessage)).toBe(true)
        expect(error.constructor.name).toBe('RequiredEnvError')

        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 500, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })

  describe('RarifyApiProviderConfig', () => {
    const testCases = [
      {
        name: 'RARIFY_API_KEY is not set',
        testData: {
          envVars: {
            RARIFY_API_KEY: undefined,
          },
          expectedMessage: 'Please set the required env RARIFY_API_KEY',
        },
      },
    ]
    it.each(testCases)('throws an error if ($name) env var is not set', ({ testData }) => {
      expect.hasAssertions()
      process.env.API_PROVIDER = Provider.RARIFY
      process.env = { ...process.env, ...testData.envVars }

      try {
        makeConfig()
      } catch (error) {
        expect(error.message.includes(testData.expectedMessage)).toBe(true)
        expect(error.constructor.name).toBe('RequiredEnvError')

        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 500, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })

  describe('NftperpApiProviderConfig', () => {
    const testCases = [
      {
        name: 'NFTPERP_API_KEY is not set',
        testData: {
          envVars: {
            NFTPERP_API_KEY: undefined,
          },
          expectedMessage: 'Please set the required env NFTPERP_API_KEY',
        },
      },
    ]
    it.each(testCases)('throws an error if ($name) env var is not set', ({ testData }) => {
      expect.hasAssertions()
      process.env.API_PROVIDER = Provider.NFTPERP
      process.env = { ...process.env, ...testData.envVars }

      try {
        makeConfig()
      } catch (error) {
        expect(error.message.includes(testData.expectedMessage)).toBe(true)
        expect(error.constructor.name).toBe('RequiredEnvError')

        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 500, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })
})
