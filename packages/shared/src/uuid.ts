export function bytes32ToUuid(hexStr: string): string {
  const start = hexStr.startsWith('0x') ? 2 : 0
  const buffer = Buffer.from(hexStr.slice(start), 'hex').toString()
  const uuid = `${buffer.slice(0, 8)}-${buffer.slice(8, 12)}-${buffer.slice(12, 16)}-${buffer.slice(
    16,
    20,
  )}-${buffer.slice(20)}`
  return uuid
}

export function uuidToBytes32(uuid: string): string {
  const bytes = Buffer.from(uuid.replace(/-/g, ''))
  if (bytes.length === 32) {
    return `0x${bytes.toString('hex')}`
  }
  throw new Error(`Invalid 'uuid': ${uuid}. The uuid is not 32 bytes long`)
}
