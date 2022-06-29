export interface Answer {
  eth: string
  gwei: string
  wei: string
}

export interface ResponseSchemaTami {
  answer: Answer
  result?: number
}
