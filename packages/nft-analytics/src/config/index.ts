import { AdapterError, Requester, util } from '@chainlink/ea-bootstrap'
import { enums } from '@linkpool/shared'

import { Provider } from '../api/constants'
import type { ApiProviderConfig, SupportedApiProviderConfig } from './types'

export const NAME = 'NFT-ANALYTICS'

export const makeConfig = (prefix?: string): SupportedApiProviderConfig => {
  const config: ApiProviderConfig = {
    ...Requester.getDefaultConfig(prefix),
    apiProvider: util.getRequiredEnv('API_PROVIDER'),
  }

  switch (config.apiProvider) {
    case Provider.BITSCRUNCH: {
      return {
        ...config,
        apiKey: util.getRequiredEnv('BITSCRUNCH_API_KEY'),
      }
    }
    case Provider.NFTPERP: {
      return {
        ...config,
        apiKey: util.getRequiredEnv('NFTPERP_API_KEY'),
      }
    }
    case Provider.RARIFY: {
      return {
        ...config,
        apiKey: util.getRequiredEnv('RARIFY_API_KEY'),
      }
    }
    default: {
      const message = `Unsupported provider: ${
        config.apiProvider
      }. Supported providers are: ${enums.formatEnumValuesPretty(
        Provider as unknown as Record<string, number>,
      )}. Check API_PROVIDER env var`
      throw new AdapterError({
        statusCode: 500,
        message,
        cause: message,
      })
    }
  }
}
