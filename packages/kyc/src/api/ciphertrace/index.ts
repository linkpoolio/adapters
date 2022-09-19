import { S3Client, SelectObjectContentCommand } from '@aws-sdk/client-s3'
import { injector } from '@linkpool/shared'

import type { CiphertraceApiProviderConfig } from '../../config/types'
import type { Base } from '../types'
import addresses from './addresses'

const Fetch = (config: CiphertraceApiProviderConfig) => {
  const client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: config.s3Client.accessKey,
      secretAccessKey: config.s3Client.secretKey,
    },
  })
  const command = new SelectObjectContentCommand({
    Bucket: 'adapter-ciphertrace',
    Key: 'ciphertrace.csv',
    InputSerialization: {
      CSV: { FileHeaderInfo: 'USE' },
      CompressionType: 'NONE',
    },
    OutputSerialization: {
      JSON: { RecordDelimiter: ',' },
    },
    ExpressionType: 'SQL',
    Expression: 'SELECT * FROM s3object s',
  })

  return async (): Promise<any> => {
    return client.send(command)
  }
}

const Provider = (config: CiphertraceApiProviderConfig): Base => {
  const fetch = Fetch(config)
  const endpoints = {
    addresses,
  }

  return injector(endpoints, fetch)
}

export default Provider
