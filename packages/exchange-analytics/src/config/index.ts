import { AdapterError, Requester, util } from '@chainlink/ea-bootstrap'
import { enums } from '@linkpool/shared'

import { Provider } from '../api/constants'
import type { ApiProviderConfig, SupportedApiProviderConfig } from './types'

export const NAME = 'EXCHANGE-ANALYTICS'

export const makeConfig = (prefix?: string): SupportedApiProviderConfig => {
  const config: ApiProviderConfig = {
    ...Requester.getDefaultConfig(prefix),
    apiProvider: util.getRequiredEnv('API_PROVIDER'),
  }

  switch (config.apiProvider) {
    case Provider.BINANCE: {
      return {
        ...config,
      }
    }
    case Provider.BYBIT: {
      return {
        ...config,
      }
    }
    case Provider.FTX: {
      return {
        ...config,
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
