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

  describe('CiphertraceApiProviderConfig', () => {
    const testCases = [
      {
        name: 'CIPHERTRACE_ACCESS_KEY is not set',
        testData: {
          envVars: {
            CIPHERTRACE_ACCESS_KEY: undefined,
            CIPHERTRACE_SECRET_KEY: 'fake-secret-key',
          },
          expectedMessage: 'Please set the required env CIPHERTRACE_ACCESS_KEY',
        },
      },
      {
        name: 'CIPHERTRACE_SECRET_KEY is not set',
        testData: {
          envVars: {
            CIPHERTRACE_ACCESS_KEY: 'fake-access-key',
            CIPHERTRACE_SECRET_KEY: undefined,
          },
          expectedMessage: 'Please set the required env CIPHERTRACE_SECRET_KEY',
        },
      },
    ]
    it.each(testCases)('throws an error if ($name) env var is not set', ({ testData }) => {
      expect.hasAssertions()
      process.env.API_PROVIDER = Provider.CIPHERTRACE
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

  describe('EverestApiProviderConfig', () => {
    const testCases = [
      {
        name: 'EVEREST_API_KEY is not set',
        testData: {
          envVars: {
            EVEREST_API_KEY: undefined,
          },
          expectedMessage: 'Please set the required env EVEREST_API_KEY',
        },
      },
    ]
    it.each(testCases)('throws an error if ($name) env var is not set', ({ testData }) => {
      expect.hasAssertions()
      process.env.API_PROVIDER = Provider.EVEREST
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
