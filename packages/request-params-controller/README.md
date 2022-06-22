# Chainlink External Adapter to control optional request parameters

![1.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/request-params-controller/package.json)

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

There are no environment variables for this adapter.

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                            Options                             |           Default           |
| :-------: | :------: | :-----------------: | :----: | :------------------------------------------------------------: | :-------------------------: |
|           | endpoint | The endpoint to use | string | [request-params-controller](#requestparamscontroller-endpoint) | `request-params-controller` |

## RequestParamsController Endpoint

`request-params-controller` is the only supported name for this endpoint.

### Input Params

| Required? |      Name      | Aliases |                                                                Description                                                                 |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :------------: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     |     params     |         |                      A map containing the request parameters (i.e. the JSON object returned by the `cborparse` task)                       | object |         |         |            |                |
|    ✅     | optionalParams |         | An array that contains the optional request parameters names. These will be set to the `default` value if they are not present in `params` | array  |         |         |            |                |
|           |    default     |         |                    The value an optional parameter will be set to if it is not present in `params`. Defaults to `null`                     |        |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "request-params-controller",
    "params": {
      "param1": "value1",
      "param2": 777.77,
      "param3": ["linkpool"],
      "param4": true
    },
    "optionalParams": ["param2", "param5", "param6"]
  },
  "debug": {
    "cacheKey": "VKYAw8zJMe0PZsCDtPpDxpwdFyw="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "param1": "value1",
    "param2": 777.77,
    "param3": ["linkpool"],
    "param4": true,
    "param5": null,
    "param6": null
  },
  "statusCode": 200
}
```

<details>
<summary>Additional Examples</summary>

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "request-params-controller",
    "params": {
      "param1": "value1",
      "param2": 777.77,
      "param3": ["linkpool"],
      "param4": true
    },
    "optionalParams": ["param2", "param5", "param6"],
    "default": 42
  },
  "debug": {
    "cacheKey": "Xz80cAjA2fSmO5zSqsbbU4JGccU="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "param1": "value1",
    "param2": 777.77,
    "param3": ["linkpool"],
    "param4": true,
    "param5": 42,
    "param6": 42
  },
  "statusCode": 200
}
```

</details>

---

MIT License
