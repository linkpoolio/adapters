# Base64 Decoder Adapter

![1.0.1](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/base64-decoder/package.json)

This adapter decodes from base64 and outputs the result.

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

There are no environment variables for this adapter.

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                  Options                  |     Default      |
| :-------: | :------: | :-----------------: | :----: | :---------------------------------------: | :--------------: |
|           | endpoint | The endpoint to use | string | [base64-decoder](#base64decoder-endpoint) | `base64-decoder` |

## Base64Decoder Endpoint

This is endpoint decodes from base64.

`base64-decoder` is the only supported name for this endpoint.

### Input Params

| Required? | Name  | Aliases |            Description             |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :---: | :-----: | :--------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | input |         | Base64 to be decoded and returned. | string |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "base64-decoder",
    "input": "7VrziGU1Z68vOI5iJNx8SzJBxUQ="
  },
  "debug": {
    "cacheKey": "68HaXDi9D6uURGZBV3aayEE33nc="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "result": "0xed5af388653567af2f388e6224dc7c4b3241c544"
  },
  "result": "0xed5af388653567af2f388e6224dc7c4b3241c544",
  "statusCode": 200
}
```

---

MIT License
