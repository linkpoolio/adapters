export const reduceByKeys = (arr: Record<string, any>[], keys: string[]) =>
  arr.map((obj) => {
    const reduced = {}
    keys.map((key) => (reduced[key] = obj[key]))
    return reduced
  })
