import { authorizationApiKeyTests } from './endpoint-generic-request/authorization-api-key'
import { authorizationBasicAuthTests } from './endpoint-generic-request/authorization-basic-auth'
import { authorizationBearerTokenTests } from './endpoint-generic-request/authorization-bearer-token'
import { authorizationCustomTests } from './endpoint-generic-request/authorization-custom'
import { authorizationNoAuthTests } from './endpoint-generic-request/authorization-no-auth'

// NB: run sequentially due to incapacity of assigning an independent port
// (e.g. 8080, 8081 via process.env.EA_PORT) per test server
describe('endpoint: generic-request', () => {
  describe('authorization type: api_key', () => authorizationApiKeyTests())
  describe('authorization type: basic_auth', () => authorizationBasicAuthTests())
  describe('authorization type: bearer_token', () => authorizationBearerTokenTests())
  describe('authorization type: custom', () => authorizationCustomTests())
  describe('authorization type: no_auth', () => authorizationNoAuthTests())
})
