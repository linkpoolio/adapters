# Chainlink NFTBank External Adapter

![1.2.1](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/nftbank/package.json)

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

### Data Conversions

Supported NFT Collections (via `nftCollection`)

|  Value   |             Name             |
| :------: | :--------------------------: |
|   bayc   | Bored Ape Yacht Club (BAYC)  |
|   mayc   | Mutant Ape Yacht Club (MAYC) |
| doodles  |       Doodles (DOODLE)       |
| coolcats |     Cool Cats NFT (COOL)     |
|  azuki   |        Azuki (AZUKI)         |

`floor-price` is the only supported name for this endpoint.

### Input Params

| Required? |     Name      |   Aliases    |                         Description                         |  Type  |                    Options                     | Default | Depends On | Not Valid With |
| :-------: | :-----------: | :----------: | :---------------------------------------------------------: | :----: | :--------------------------------------------: | :-----: | :--------: | :------------: |
|    ✅     | nftCollection | `collection` |         The NFT collection to find a price floor in         | string | `azuki`, `bayc`, `coolcats`, `doodles`, `mayc` |         |            |                |
|           | pricingAsset  |   `asset`    | The pricing asset that you want the price floor returned in | string |                  `ETH`, `USD`                  |  `ETH`  |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "floor-price",
    "nftCollection": "azuki",
    "pricingAsset": "USD"
  },
  "debug": {
    "cacheKey": "PubTAYVU4YQLFbZdlpqjWEhbSuM="
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

---

## Estimate Endpoint

### Data Conversions

Supported NFT Collections (via `nftCollection`)

|    Value    |             Name             |
| :---------: | :--------------------------: |
|    bayc     | Bored Ape Yacht Club (BAYC)  |
| cryptopunks |       CryptoPunks (C)        |
|    mayc     | Mutant Ape Yacht Club (MAYC) |
|   doodles   |       Doodles (DOODLE)       |
|  coolcats   |     Cool Cats NFT (COOL)     |
|    azuki    |        Azuki (AZUKI)         |

`estimate` is the only supported name for this endpoint.

### Input Params

| Required? |     Name      |   Aliases    |                           Description                            |  Type  |                            Options                            | Default | Depends On | Not Valid With |
| :-------: | :-----------: | :----------: | :--------------------------------------------------------------: | :----: | :-----------------------------------------------------------: | :-----: | :--------: | :------------: |
|    ✅     | nftCollection | `collection` |            The NFT collection to find an estimate in             | string | `azuki`, `bayc`, `coolcats`, `cryptopunks`, `doodles`, `mayc` |         |            |                |
|    ✅     |     nftId     |     `id`     | The NFT ID to get an estimate for -- bayc (0) or cryptopunks (1) | number |                                                               |         |            |                |
|           | pricingAsset  |   `asset`    |     The pricing asset that you want the estimate returned in     | string |                         `ETH`, `USD`                          |  `ETH`  |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "estimate",
    "nftCollection": "bayc",
    "nftId": 1,
    "pricingAsset": "ETH"
  },
  "debug": {
    "cacheKey": "t6ffi7WqulY6DUwSPgeR8LmsDuU="
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
