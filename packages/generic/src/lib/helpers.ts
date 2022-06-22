import type { JSONValue } from './types'

export function isJsonObject(value: JSONValue): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
