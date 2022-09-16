import { AdapterError, Requester, util } from '@chainlink/ea-bootstrap'
import { formatEnumValuesPretty } from '@linkpool/shared'

import { Provider } from '../api/constants'
import type { ApiProviderConfig, SupportedApiProviderConfig } from './types'

export const NAME = 'KYC'

export const makeConfig = (prefix?: string): SupportedApiProviderConfig => {
  const config: ApiProviderConfig = {
    ...Requester.getDefaultConfig(prefix),
    apiProvider: util.getRequiredEnv('API_PROVIDER'),
  }

  switch (config.apiProvider) {
    case Provider.CIPHERTRACE: {
      return {
        ...config,
        s3Client: {
          accessKey: util.getRequiredEnv('CIPHERTRACE_ACCESS_KEY'),
          secretKey: util.getRequiredEnv('CIPHERTRACE_SECRET_KEY'),
        },
      }
    }
    default: {
      const message = `Unsupported provider: ${
        config.apiProvider
      }. Supported providers are: ${formatEnumValuesPretty(Provider)}. Check API_PROVIDER env var`
      throw new AdapterError({
        statusCode: 500,
        message,
        cause: message,
      })
    }
  }
}
