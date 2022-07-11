const objKeyValueMatch = (key, value) => (obj) => obj[key] == value
export const filterByKeyValue = (arr, key, value) => arr.filter(objKeyValueMatch(key, value))
export const findByKeyValue = (arr, key, value) => arr.find(objKeyValueMatch(key, value))

const objKeyValueInArr = (key, value) => (obj) => value.indexOf(obj[key]) !== -1
export const filterKeyValueInArray = (arr, key, value) => arr.filter(objKeyValueInArr(key, value))
export const findKeyValueInArray = (arr, key, value) => arr.filter(objKeyValueInArr(key, value))
