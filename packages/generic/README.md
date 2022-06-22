# Generic External Adapter

An EA for almost any API

### Environment Variables

The Generic External Adapter is built on top of the EA core framework, supporting its [environment variables](../../core/bootstrap/README.md).

**TO BE AWARE:** the adapter configuration set via the environment variables listed below is constant at run time

| Required? |        Name         |                                                                                                                   Description                                                                                                                   |                               Options                               | Defaults to |
| :-------: | :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------: | :---------: |
|           |  `GENERIC_PREFIX`   | It forces to look up any of the environment variables listed below prefixed with `<GENERIC_PREFIX value>_`. For instance, `GENERIC_PREFIX = 'A_PREFIX'` will make the adapter look up `A_PREFIX_GENERIC_BASE_URL` instead of `GENERIC_BASE_URL` |                                                                     |             |
|    ✅     | `GENERIC_BASE_URL`  |                                                                                                     The consistent part of the API address                                                                                                      |                                                                     |             |
|           | `GENERIC_AUTH_TYPE` |               The authorization type of the API. Additional environment variables may involved/required depending on its value See [Environment Variables Per Authorization Type](#environment-variables-per-authorization-type)                | See [Supported Authorization Types](#supported-authorization-types) |  `no_auth`  |

#### Supported Authorization Types

|       Name       |     Value      |                                          Description                                          |
| :--------------: | :------------: | :-------------------------------------------------------------------------------------------: |
|     API Key      |   `api_key`    | Either sets the authorization header: `<Key> <Value>`, or the query parameter `<key>=<value>` |
|    Basic Auth    |  `basic_auth`  |         Sets the authorization header: `Basic <Base64 encoded username and password>`         |
|   Bearer Token   | `bearer_token` |                    Sets the authorization header: `Bearer <Your API key>`                     |
|      Custom      |    `custom`    |                  Allows to set any request header, query parameter, and body                  |
| No authorization |   `no_auth`    |                   Does not set any request header, query parameter or body                    |

### Environment Variables Per Authorization Type

**TO BE AWARE:** the adapter configuration set via the environment variables listed below is constant at run time

#### API Key

| Required? |                Name                 |                                                              Description                                                              |        Options        | Defaults to |
| :-------: | :---------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :-------------------: | :---------: |
|    ✅     |   `GENERIC_AUTH_CREDENTIALS_KEY`    |                                                           The API key name                                                            |                       |             |
|    ✅     |  `GENERIC_AUTH_CREDENTIALS_VALUE`   |                                                           The API key value                                                           |                       |             |
|    ✅     | `GENERIC_AUTH_CREDENTIALS_LOCATION` | The location of the key-value pair. `headers` sets it in the request headers, whilst `params` sets it in the request query parameters | `headers` or `params` |             |

#### Basic Auth

| Required? |                Name                 |       Description        | Options | Defaults to |
| :-------: | :---------------------------------: | :----------------------: | :-----: | :---------: |
|    ✅     | `GENERIC_AUTH_CREDENTIALS_USERNAME` | The API login `username` |         |             |
|    ✅     | `GENERIC_AUTH_CREDENTIALS_PASSWORD` | The API login `password` |         |             |

#### Bearer Token

| Required? |               Name               |         Description          | Options | Defaults to |
| :-------: | :------------------------------: | :--------------------------: | :-----: | :---------: |
|    ✅     | `GENERIC_AUTH_CREDENTIALS_TOKEN` | The API authentication token |         |             |

#### Custom

| Required? |          Name          |                                                             Description                                                             | Options | Defaults to |
| :-------: | :--------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :-----: | :---------: |
|           | `GENERIC_AUTH_HEADERS` |    The API authentication headers in a JSON object as string. Expected format is `{ "header1": "value1", "header2": "value2" }`     |         |    `{}`     |
|           | `GENERIC_AUTH_PARAMS`  | The API authentication query parameters in a JSON object as string. Expected format is `{ "param1": "value1", "param2": "value2" }` |         |    `{}`     |
|           |  `GENERIC_AUTH_DATA`   |        The API authentication body in a JSON object as string. Expected format is `{ "data1": <value1>, "data2": <value2> }`        |         |    `{}`     |

#### No Authorization

N/A

---

### Input Parameters

| Required? |    Name    |     Description     |                   Options                    |    Defaults to    |
| :-------: | :--------: | :-----------------: | :------------------------------------------: | :---------------: |
|           | `endpoint` | The endpoint to use | [generic-request](#generic-request-endpoint) | `generic-request` |

---

## Generic Request Endpoint

Requests almost any API

### Input Params

More information regarding each parameter can be found in the [Axios Request Config Docs](https://axios-http.com/docs/req_config)

| Required? |   Name    |                                                    Description                                                     |                               Options                               | Defaults to |
| :-------: | :-------: | :----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------: | :---------: |
|           | `method`  |                                                 The request method                                                 | `get`, `head`, `post`, `put`, `delete`, `options`, `trace`, `patch` |    `get`    |
|           |   `url`   |                       The relative URL part appended to the base URL (in `GENERIC_BASE_URL`)                       |                                                                     |     `/`     |
|           | `headers` |                         The custom headers to be sent with the request (as a JSON object)                          |                                                                     |    `{}`     |
|           | `params`  |                        The query parameters to be sent with the request (as a JSON object)                         |                                                                     |    `{}`     |
|           |  `data`   | The data to be sent as the request body (as a JSON object). Only applicable to `PUT`, `POST`, `DELETE` and `PATCH` |                                                                     |    `{}`     |

### Sample Input

Set first the required generic env vars:

```shell
GENERIC_BASE_URL='https://min-api.cryptocompare.com'
```

```json
{
  "id": "1",
  "data": {
    "url": "/data/price",
    "params": {
      "fsym": "link",
      "tsyms": "eth"
    }
  }
}
```

### Sample Output

```json
{
  "jobRunID": 1,
  "result": {
    "ETH": 0.005298
  },
  "data": {
    "ETH": 0.005298,
    "result": {
      "ETH": 0.005298
    }
  },
  "statusCode": 200
}
```
