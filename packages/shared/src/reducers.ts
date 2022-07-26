export const reduceByKeys = (arr: Record<string, any>[], keys: string[]): Record<string, any>[] =>
  arr.map((obj) => {
    const reduced = {}
    keys.map((key) => (reduced[key] = obj[key]))
    return reduced
  })
