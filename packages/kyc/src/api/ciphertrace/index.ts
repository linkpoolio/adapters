import { S3Client, SelectObjectContentCommand } from '@aws-sdk/client-s3'
import { util } from '@chainlink/ea-bootstrap'
import { injector } from '@linkpool/shared'

import { Base } from '../base'
import addresses from './addresses'
import type { ConfigCiphertrace } from './types'

const Fetch = async (): Promise<any> => {
  const accessKeyId = util.getEnv('ACCESS_KEY') as string
  const secretAccessKey = util.getEnv('SECRET_KEY') as string

  const client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: config.s3Client.accessKeyId,
      secretAccessKey: config.s3Client.secretAccessKey,
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
    let response = client.send(command)
    const records: any[] = []

    console.log(response.Payload)
    
    if (response.Payload)
      for await (const val of response.Payload) {
        if (val.Records) records.push(val.Records?.Payload)
      }

    let recordString = Buffer.concat(records as Uint8Array[]).toString('utf8')
    recordString = `[${recordString.substring(0, recordString.length - 1)}]`

    response = JSON.parse(recordString)

    return response
  }
}

const Provider = (): Base => {
  const fetch = Fetch
  const endpoints = {
    addresses,
  }

  return injector(endpoints, fetch)
}

export default Provider
