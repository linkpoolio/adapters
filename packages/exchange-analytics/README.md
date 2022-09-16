# exchange-analytics Adapter

![1.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/exchange-analytics/package.json)

An adapter to query exchange analytics

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |     Name     |    Description    |  Type  | Options | Default |
| :-------: | :----------: | :---------------: | :----: | :-----: | :-----: |
|           | API_PROVIDER | The data provider | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                Options                 | Default |
| :-------: | :------: | :-----------------: | :----: | :------------------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [funding-rates](#fudingrates-endpoint) |         |

## FudingRates Endpoint

This endpoint returns the funding rates for ETH or BTC paired with USD.

`funding-rates` is the only supported name for this endpoint.

### Input Params

| Required? |  Name  | Aliases |              Description               |  Type  |   Options    | Default | Depends On | Not Valid With |
| :-------: | :----: | :-----: | :------------------------------------: | :----: | :----------: | :-----: | :--------: | :------------: |
|    ✅     | method |         |      The endpoint request method       | string |    `get`     |         |            |                |
|           | parse  |         | Properties to return (comma separated) | string |              |         |            |                |
|    ✅     | asset  |         |         The name of the asset.         | string | `BTC`, `ETH` |         |            |                |

### Example

Request:

```json
{
  "id": 1,
  "data": {
    "endpoint": "funding-rates",
    "method": "get",
    "asset": "ETH"
  },
  "debug": {
    "cacheKey": "tyoRPbXm/tcCOr/B9m/Adjx2Nbo="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "nextFunding": {
      "rate": -0.000019615725081026844,
      "timestamp": 1663344000
    }
  },
  "statusCode": 200
}
```

<details>
<summary>Additional Examples</summary>

Request:

```json
{
  "id": 1,
  "data": {
    "endpoint": "funding-rates",
    "method": "get",
    "asset": "ETH"
  },
  "debug": {
    "cacheKey": "tyoRPbXm/tcCOr/B9m/Adjx2Nbo="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "nextFunding": {
      "rate": -0.00001119125,
      "timestamp": 1663315200
    }
  },
  "statusCode": 200
}
```

Request:

```json
{
  "id": 1,
  "data": {
    "endpoint": "funding-rates",
    "method": "get",
    "asset": "ETH"
  },
  "debug": {
    "cacheKey": "tyoRPbXm/tcCOr/B9m/Adjx2Nbo="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "nextFunding": {
      "rate": -0.000005,
      "timestamp": 1663336800
    }
  },
  "statusCode": 200
}
```

</details>

---

MIT License
