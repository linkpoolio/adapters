# @chainlink/heni-adapter env var schema

![1.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/heni/package.json)

Base URL https://api.nftoracle.heni.com/

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |  Name   | Description |  Type  | Options | Default |
| :-------: | :-----: | :---------: | :----: | :-----: | :-----: |
|    ✅     | API_KEY |             | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |         Options          | Default |
| :-------: | :------: | :-----------------: | :----: | :----------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [price](#price-endpoint) | `price` |

## Price Endpoint

`price` is the only supported name for this endpoint.

### Input Params

There are no input parameters for this endpoint.

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "price"
  },
  "debug": {
    "cacheKey": "VrI9ktHz2Gp7oHbb2+1HMGmvh5k="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "price": "5.069164497",
    "last_updated": "2022-02-04T13:55:27+00:00",
    "last_sale_time": "2022-02-04T10:47:07+00:00",
    "GITSHA": "171b8a4feff9ae020efab1ad96c784d51be95c34",
    "result": 5069164497
  },
  "result": 5069164497,
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

MIT License
