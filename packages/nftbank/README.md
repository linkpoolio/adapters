# Chainlink NFTBank External Adapter

![2.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/nftbank/package.json)

The external adapter for [NFTBank](https://nftbank.ai/).

Base URL https://api.nftbank.ai/

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |  Name   |                                    Description                                     |  Type  | Options | Default |
| :-------: | :-----: | :--------------------------------------------------------------------------------: | :----: | :-----: | :-----: |
|    ✅     | API_KEY | An API key that can be obtained from the [NFTBank docs](https://docs.nftbank.ai/). | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                               Options                               |  Default   |
| :-------: | :------: | :-----------------: | :----: | :-----------------------------------------------------------------: | :--------: |
|           | endpoint | The endpoint to use | string | [estimate](#estimate-endpoint), [floor-price](#floorprice-endpoint) | `estimate` |

## FloorPrice Endpoint

This endpoint returns the floor price of an NFT collection in ETH or USD.

### Supported Formats

Choose the format of your response. The default `formatId` is `0`.

| formatId |                                  Format                                  |
| :------: | :----------------------------------------------------------------------: |
|   `0`    |                        Floor price as a uint256.                         |
|   `1`    | Date of estimation (unix timestamp) and floor price packed into bytes32. |

`floor-price` is the only supported name for this endpoint.

### Input Params

| Required? |     Name     |       Aliases       |                         Description                          |  Type  |   Options    | Default | Depends On | Not Valid With |
| :-------: | :----------: | :-----------------: | :----------------------------------------------------------: | :----: | :----------: | :-----: | :--------: | :------------: |
|    ✅     | assetAddress | `collectionAddress` |         The NFT collection to find a price floor in          | string |              |         |            |                |
|           | pricingAsset |       `asset`       | The pricing asset that you want the price floor returned in  | string | `ETH`, `USD` |  `ETH`  |            |                |
|           |   formatId   |                     | Include the timestamp in unix for the time of the estimation | number |   `0`, `1`   |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "floor-price",
    "assetAddress": "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
    "pricingAsset": "USD",
    "formatId": 0
  },
  "debug": {
    "cacheKey": "Ff37eAO10eWTSHvFOr2hhUmfNpI="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "data": [
      {
        "_id": "1",
        "estimated_at": "Wed, 29 Jun 2022 04:00:00 GMT",
        "floor_price": [
          {
            "currency_symbol": "ETH",
            "floor_price": 12
          },
          {
            "currency_symbol": "USD",
            "floor_price": 23951.237809862814
          }
        ]
      }
    ],
    "result": 2395123780986282
  },
  "result": 2395123780986282,
  "statusCode": 200,
  "providerStatusCode": 200
}
```

<details>
<summary>Additional Examples</summary>

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "floor-price",
    "assetAddress": "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
    "pricingAsset": "USD",
    "formatId": 1
  },
  "debug": {
    "cacheKey": "/uWgOlVo1/LVjqliqPFVanvjFcQ="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "data": [
      {
        "_id": "1",
        "estimated_at": "Wed, 29 Jun 2022 04:00:00 GMT",
        "floor_price": [
          {
            "currency_symbol": "ETH",
            "floor_price": 12
          },
          {
            "currency_symbol": "USD",
            "floor_price": 23951.237809862814
          }
        ]
      }
    ],
    "result": "0x00000000000000000000000062bbce4000000000000000000008825a3628a5aa"
  },
  "result": "0x00000000000000000000000062bbce4000000000000000000008825a3628a5aa",
  "statusCode": 200,
  "providerStatusCode": 200
}
```

</details>

---

## Estimate Endpoint

This endpoint returns the complete appraisal value of an NFT collection using Time-Adjusted Market Index in ETH or USD.

`estimate` is the only supported name for this endpoint.

### Input Params

| Required? |     Name     |       Aliases       |                           Description                            |  Type  |   Options    | Default | Depends On | Not Valid With |
| :-------: | :----------: | :-----------------: | :--------------------------------------------------------------: | :----: | :----------: | :-----: | :--------: | :------------: |
|    ✅     | assetAddress | `collectionAddress` |        The NFT collection address to find an estimate in         | string |              |         |            |                |
|    ✅     |   tokenId    |        `id`         | The NFT ID to get an estimate for -- bayc (0) or cryptopunks (1) | number |              |         |            |                |
|           | pricingAsset |       `asset`       |     The pricing asset that you want the estimate returned in     | string | `ETH`, `USD` |  `ETH`  |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "estimate",
    "assetAddress": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "tokenId": 0,
    "pricingAsset": "ETH"
  },
  "debug": {
    "cacheKey": "bq0oAaowO3LKLdjms7zEvNs5Frk="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "data": [
      {
        "_id": "1",
        "estimate": [
          {
            "currency_symbol": "ETH",
            "estimate_price": 100
          },
          {
            "currency_symbol": "USD",
            "estimate_price": 200
          }
        ]
      }
    ],
    "result": 10000000000000000
  },
  "result": 10000000000000000,
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

MIT License
