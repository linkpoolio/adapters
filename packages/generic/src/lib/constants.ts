export enum AuthorizationType {
  API_KEY = 'api_key',
  BASIC_AUTH = 'basic_auth',
  BEARER_TOKEN = 'bearer_token',
  CUSTOM = 'custom',
  NO_AUTH = 'no_auth',
}

export enum CredentialsLocation {
  HEADERS = 'headers',
  PARAMS = 'params',
}

export enum RequestMethod {
  DELETE = 'delete',
  HEAD = 'head',
  GET = 'get',
  OPTIONS = 'options',
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put',
  TRACE = 'trace',
}
