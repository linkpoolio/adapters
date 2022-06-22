export function iso8061ToTimestamp(datetime: string, returnInMilliseconds = false): number {
  const denominator = returnInMilliseconds ? 1 : 1000
  return new Date(datetime).getTime() / denominator
}

export function timestampToIso8061(timestamp: number, paramInMilliseconds = false): string {
  const time = paramInMilliseconds ? timestamp : timestamp * 1000
  return new Date(time).toISOString()
}
