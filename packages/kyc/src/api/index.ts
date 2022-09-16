import { AdapterError } from '@chainlink/ea-bootstrap'
import { formatEnumValuesPretty } from '@linkpool/shared'

import type { SupportedApiProviderConfig } from '../config/types'
import ciphertrace from './ciphertrace'
import { Provider } from './constants'

export default (config: SupportedApiProviderConfig) => {
  switch (config.apiProvider) {
    case Provider.CIPHERTRACE:
      return ciphertrace(config)
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
