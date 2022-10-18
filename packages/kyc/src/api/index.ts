import { AdapterError } from '@chainlink/ea-bootstrap'
import { enums } from '@linkpool/shared'

import type {
  CiphertraceApiProviderConfig,
  EverestApiProviderConfig,
  SupportedApiProviderConfig,
} from '../config/types'
import ciphertrace from './ciphertrace'
import { Provider } from './constants'
import everest from './everest'

export default (config: SupportedApiProviderConfig) => {
  switch (config.apiProvider) {
    case Provider.CIPHERTRACE:
      return ciphertrace(config as CiphertraceApiProviderConfig)
    case Provider.EVEREST:
      return everest(config as EverestApiProviderConfig)
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
