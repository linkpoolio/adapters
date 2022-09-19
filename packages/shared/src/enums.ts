export function getNumericEnumValues(data: Record<string, number>): number[] {
  return Object.values(data).filter((v) => !isNaN(Number(v)))
}

export function formatNumericEnumValuesPretty(
  data: Record<string, number>,
  separator = ',',
): string {
  return getNumericEnumValues(data).join(separator)
}

export function formatEnumValuesPretty(data: Record<string, number>, separator = ','): string {
  return Object.values(data).join(separator)
}
