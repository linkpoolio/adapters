import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterContext, AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../src/adapter'
import { Provider } from '../../src/api/constants'

describe('controllers', () => {
  let oldEnv: NodeJS.ProcessEnv
  const context: AdapterContext = {}
  const jobID = '1'
  const execute = makeExecute()

  process.env.LOG_LEVEL = 'debug'

  describe('addresses input validation error', () => {
    describe('bitscrunch', () => {
      beforeAll(() => {
        oldEnv = JSON.parse(JSON.stringify(process.env))
        process.env.API_PROVIDER = Provider.BITSCRUNCH
        process.env.BITSCRUNCH_API_KEY = 'fake-api-key'
      })

      afterAll(() => {
        process.env = oldEnv
      })

      const requests = [
        {
          name: 'endpoint is not supplied',
          testData: {
            id: jobID,
            data: {},
          },
          errorMessage: `Endpoint not supplied and no default found`,
        },
        {
          name: 'endpoint is not supported',
          testData: {
            id: jobID,
            data: {
              endpoint: 'unsupported_endpoint',
            },
          },
          errorMessage: `Endpoint unsupported_endpoint not supported`,
        },
        {
          name: 'endpoint method is not supported',
          testData: {
            id: jobID,
            data: {
              endpoint: 'valuations',
              method: 'linkpool',
            },
          },
          errorMessage: `method parameter 'linkpool' is not in the set of available options: get`,
        },

        {
          name: 'collectionAddress has invalid type',
          testData: {
            id: jobID,
            data: {
              endpoint: 'valuations',
              method: 'get',
              chainId: 1,
              collectionAddress: 777,
              tokenId: 999,
            },
          },
          errorMessage: `collectionAddress parameter must be of type string`,
        },
        {
          name: 'tokenId has invalid type',
          testData: {
            id: jobID,
            data: {
              endpoint: 'valuations',
              method: 'get',
              chainId: 1,
              collectionAddress: '0x67f4732266c7300cca593c814d46bee72e40659f',
              tokenId: 'linkpool',
            },
          },
          errorMessage: `tokenId parameter must be of type number`,
        },
        {
          name: 'chainId has invalid type',
          testData: {
            id: jobID,
            data: {
              endpoint: 'valuations',
              method: 'get',
              chainId: 'linkpool',
              collectionAddress: '0x67f4732266c7300cca593c814d46bee72e40659f',
              tokenId: 999,
            },
          },
          errorMessage: `chainId parameter must be of type number`,
        },
        {
          name: 'parse has invalid type',
          testData: {
            id: jobID,
            data: {
              endpoint: 'valuations',
              method: 'get',
              chainId: 1,
              collectionAddress: '0x67f4732266c7300cca593c814d46bee72e40659f',
              tokenId: 999,
              parse: 777,
            },
          },
          errorMessage: `parse parameter must be of type string`,
        },
      ]

      requests.forEach((req) => {
        it(`${req.name}`, async () => {
          try {
            await execute(req.testData as AdapterRequest, context)
          } catch (error) {
            if (req.errorMessage) {
              expect(error.message.includes(req.errorMessage)).toBe(true)
            }
            const errorResp = Requester.errored(jobID, error)
            assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
          }
        })
      })
    })

    describe('nftperp', () => {
      beforeAll(() => {
        oldEnv = JSON.parse(JSON.stringify(process.env))
        process.env.API_PROVIDER = Provider.NFTPERP
        process.env.NFTPERP_API_KEY = 'fake-api-key'
      })

      afterAll(() => {
        process.env = oldEnv
      })

      const requests = [
        {
          name: 'endpoint is not supplied',
          testData: {
            id: jobID,
            data: {},
          },
          errorMessage: `Endpoint not supplied and no default found`,
        },
        {
          name: 'endpoint is not supported',
          testData: {
            id: jobID,
            data: {
              endpoint: 'unsupported_endpoint',
            },
          },
          errorMessage: `Endpoint unsupported_endpoint not supported`,
        },
        {
          name: 'endpoint method is not supported',
          testData: {
            id: jobID,
            data: {
              endpoint: 'twaps',
              method: 'linkpool',
            },
          },
          errorMessage: `method parameter 'linkpool' is not in the set of available options: get`,
        },
        {
          name: 'collectionName has invalid type',
          testData: {
            id: jobID,
            data: {
              endpoint: 'twaps',
              method: 'get',
              collectionName: 777,
            },
          },
          errorMessage: `collectionName parameter must be of type string`,
        },
        {
          name: 'parse has invalid type',
          testData: {
            id: jobID,
            data: {
              endpoint: 'twaps',
              method: 'get',
              collectionName: 'boredapeyachtclub',
              parse: 777,
            },
          },
          errorMessage: `parse parameter must be of type string`,
        },
      ]

      requests.forEach((req) => {
        it(`${req.name}`, async () => {
          try {
            await execute(req.testData as AdapterRequest, context)
          } catch (error) {
            if (req.errorMessage) {
              expect(error.message.includes(req.errorMessage)).toBe(true)
            }
            const errorResp = Requester.errored(jobID, error)
            assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
          }
        })
      })
    })

    describe('rarify', () => {
      beforeAll(() => {
        oldEnv = JSON.parse(JSON.stringify(process.env))
        process.env.API_PROVIDER = Provider.RARIFY
        process.env.RARIFY_API_KEY = 'fake-api-key'
      })

      afterAll(() => {
        process.env = oldEnv
      })

      const requests = [
        {
          name: 'endpoint is not supplied',
          testData: {
            id: jobID,
            data: {},
          },
          errorMessage: `Endpoint not supplied and no default found`,
        },
        {
          name: 'endpoint is not supported',
          testData: {
            id: jobID,
            data: {
              endpoint: 'unsupported_endpoint',
            },
          },
          errorMessage: `Endpoint unsupported_endpoint not supported`,
        },
        {
          name: 'endpoint method is not supported',
          testData: {
            id: jobID,
            data: {
              endpoint: 'floorprices',
              method: 'linkpool',
            },
          },
          errorMessage: `method parameter 'linkpool' is not in the set of available options: get`,
        },
        {
          name: 'collectionAddress has invalid type',
          testData: {
            id: jobID,
            data: {
              endpoint: 'floorprices',
              method: 'get',
              collectionAddress: 777,
              network: 'ethereum',
            },
          },
          errorMessage: `collectionAddress parameter must be of type string`,
        },
        {
          name: 'network has invalid type',
          testData: {
            id: jobID,
            data: {
              endpoint: 'floorprices',
              method: 'get',
              collectionAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
              network: 777,
            },
          },
          errorMessage: `network parameter must be of type string`,
        },
        {
          name: 'parse has invalid type',
          testData: {
            id: jobID,
            data: {
              endpoint: 'floorprices',
              method: 'get',
              collectionAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
              network: 'ethereum',
              parse: 777,
            },
          },
          errorMessage: `parse parameter must be of type string`,
        },
      ]

      requests.forEach((req) => {
        it(`${req.name}`, async () => {
          try {
            await execute(req.testData as AdapterRequest, context)
          } catch (error) {
            if (req.errorMessage) {
              expect(error.message.includes(req.errorMessage)).toBe(true)
            }
            const errorResp = Requester.errored(jobID, error)
            assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
          }
        })
      })
    })
  })
})
