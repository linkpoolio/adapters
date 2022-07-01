# Big Mac Index Adapter

![2.1.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/big-mac-index/package.json)

This is the adapter for the [Big Mac Index](https://www.economist.com/big-mac-index)

Base URL https://data.nasdaq.com

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |  Name   |                                          Description                                          |  Type  | Options | Default |
| :-------: | :-----: | :-------------------------------------------------------------------------------------------: | :----: | :-----: | :-----: |
|    ✅     | API_KEY | An API key that can be obtained from [The Economist](https://www.economist.com/big-mac-index) | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |         Options          | Default |
| :-------: | :------: | :-----------------: | :----: | :----------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [price](#price-endpoint) | `price` |

## Price Endpoint

This endpoint returns the price of a big mac in a specific country over a given year.

The response will contain the price reported during the first half of the chosen year and the second half.

The prices will be of type uint128 and will be returned packed into a bytes32 (order: firstHalfPrice, secondHalfPrice).

If a price has not been reported for any reason (country does not exist, year ), its default value will be 0.

The price is reported in dollars multiplied by 10^15.

`price` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases |                                                         Description                                                          |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :--------------------------------------------------------------------------------------------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | country |         | The 3 character ISO standard code for your desired country which coubld be found [here](https://www.iban.com/country-codes). | string |         |         |            |                |
|    ✅     |  year   |         |                                                      The desired year.                                                       | number |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "price",
    "country": "LBN",
    "year": 2020
  },
  "debug": {
    "cacheKey": "HyOlTd16OJ+VZ2fe5802mo9CERA="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "dataset": {
      "data": [
        [
          "2020-07-31",
          9000,
          1512,
          5.95238095238095,
          1576.1821366024512,
          4.245,
          null,
          null,
          null,
          null,
          null
        ],
        [
          "2020-01-31",
          6500,
          1514,
          4.29326287978864,
          1146.384479717813,
          -24.281,
          null,
          null,
          null,
          null,
          null
        ]
      ],
      "collapse": null,
      "order": null,
      "database_id": 5330
    },
    "result": "0x0000000000000000009886ff98c58fc0000000000000000000d37896e2583cd8"
  },
  "result": "0x0000000000000000009886ff98c58fc0000000000000000000d37896e2583cd8",
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

MIT License
