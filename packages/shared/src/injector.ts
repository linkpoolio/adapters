// Receive object where each key's value is a function
// Invoke function passing injected param
// Return original object with each key/value injected
export default (obj, injected): typeof obj => {
  Object.keys(obj).map((key) => {
    obj[key] = obj[key](injected)
  })
  return obj
}
