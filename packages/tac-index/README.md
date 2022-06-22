# Chainlink External Adapter for TAC Index

![1.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/tac-index/package.json)

Base URL https://api.tacindex.com

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |     Name     |   Description   |  Type  | Options | Default |
| :-------: | :----------: | :-------------: | :----: | :-----: | :-----: |
|    ✅     | API_USERNAME | An API username | string |         |         |
|    ✅     | API_PASSWORD | An API password | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |          Options           | Default |
| :-------: | :------: | :-----------------: | :----: | :------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [price](#example-endpoint) | `price` |

## Example Endpoint

`price` is the only supported name for this endpoint.

### Input Params

| Required? |   Name   | Aliases |                         Description                          |  Type  |        Options         | Default | Depends On | Not Valid With |
| :-------: | :------: | :-----: | :----------------------------------------------------------: | :----: | :--------------------: | :-----: | :--------: | :------------: |
|    ✅     |  route   |         | The route for which we want to get the latest freight price. | string |                        |         |            |                |
|           | currency |         |             The desired currency for the price.              | string | `EURO`, `LOCAL`, `USD` |  `USD`  |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "price",
    "route": "HKG-SIN",
    "currency": "usd"
  },
  "debug": {
    "cacheKey": "DSM9o/8muASna6YwevpEKqLcZWs="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "payload": [
      {
        "route_code": "HKG-SIN",
        "route_type": "origin-destination",
        "route_description": "Hong Kong to Singapore",
        "origin": {
          "code": "HKG",
          "name": "Hong Kong",
          "type": "city"
        },
        "destination": {
          "code": "SIN",
          "name": "Singapore",
          "type": "city"
        },
        "date": "2022-02-21",
        "index_name": "ANP MAWB",
        "usd": "2.88",
        "euro": "2.54",
        "local": "22.47",
        "local_currency": "HKD"
      }
    ],
    "result": 2.88
  },
  "result": 2.88,
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

MIT License
