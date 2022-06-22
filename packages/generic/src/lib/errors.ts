export class GenericConfigError extends Error {
  message: string
  envVar?: string
  prefix: string

  constructor({ message = 'Unexpected error', envVar, prefix = '' }: Partial<GenericConfigError>) {
    const envVarPrefixed = prefix ? `${prefix}_${envVar}` : envVar
    const formattedMessage = `Reason: ${message}. Env var: ${envVarPrefixed}.`
    super(formattedMessage)
    this.envVar = envVar
    this.message = formattedMessage
    this.prefix = prefix
    this.name = this.constructor.name
  }
}
