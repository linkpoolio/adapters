export const reduceByKeys = (arr, keys) =>
  arr.map((obj) => {
    const reduced = {}
    keys.map((key) => (reduced[key] = obj[key]))
    return reduced
  })
