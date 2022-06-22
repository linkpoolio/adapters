const reDate = new RegExp(/^\d{4}-\d{2}-\d{2}$/)

export function validateDate(date: string): void {
  // TODO: request-params-controller validation. Remove once IPON supports null
  if (typeof date !== 'string') {
    throw new Error(`'date' parameter must be of type string`)
  }
  // Check YYYY-MM-DD format
  if (!reDate.test(date)) {
    throw new Error(`Invalid 'date': ${date}. Supported format is YYYY-MM-DD`)
  }
  // Check is a valid date
  if (Number.isNaN(Date.parse(date))) {
    throw new Error(`Invalid 'date': ${date}. Does not represent a valid date`)
  }
  // Check it is human readable (i.e. prevent 31st of February)
  const dateJS = new Date(date).toISOString().split('T')[0]
  if (date !== dateJS) {
    throw new Error(`Invalid 'date': ${date}. Did you mean: ${dateJS}?`)
  }
  // Check it is less than today (latest index is from yesterday's close)
  const today = new Date().toISOString().split('T')[0]
  const todayInMs = new Date(today).getTime()
  const dateInMs = new Date(date).getTime()
  if (dateInMs >= todayInMs) {
    throw new Error(`Invalid 'date': ${date}. Date must be before today: ${today}`)
  }
}
