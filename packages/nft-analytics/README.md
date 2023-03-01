# nft-analytics Adapter

![1.2.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/nft-analytics/package.json)

An adapter to query NFT analytics

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |        Name        |      Description       |  Type  | Options | Default |
| :-------: | :----------------: | :--------------------: | :----: | :-----: | :-----: |
|           | BITSCRUNCH_API_KEY | The Bitscrunch API Key | string |         |         |
|           |  NFTPERP_API_KEY   |  The Nftperp API Key   | string |         |         |
|           |   RARIFY_API_KEY   |   The Rarify API Key   | string |         |         |
|           |    API_PROVIDER    |   The data provider    | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                                              Options                                               | Default |
| :-------: | :------: | :-----------------: | :----: | :------------------------------------------------------------------------------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [floorprices](#floorprices-endpoint), [twaps](#twaps-endpoint), [valuations](#valuations-endpoint) |         |

## Floorprices Endpoint

This endpoint returns the floor price for a given NFT collection

`floorprices` is the only supported name for this endpoint.

### Input Params

| Required? |       Name        | Aliases |               Description                |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :---------------: | :-----: | :--------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     |      method       |         |       The endpoint request method        | string |  `get`  |         |            |                |
|           |       parse       |         |  Properties to return (comma separated)  | string |         |         |            |                |
|    ✅     | collectionAddress |         |           The contract address           | string |         |         |            |                |
|    ✅     |      network      |         | The network name, e.g. ethereum, polygon | string |         |         |            |                |

### Example

Request:

```json
{
  "id": 1,
  "data": {
    "endpoint": "floorprices",
    "method": "get",
    "collectionAddress": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "network": "ethereum"
  },
  "debug": {
    "cacheKey": "Hy8SNk0tFxbLCtM9r3ixKrJIB90="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "collection": {
      "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
      "name": null,
      "symbol": null,
      "imageUrl": "https://rarify-public.s3.amazonaws.com/eth_logo.svg"
    },
    "floorPrice": {
      "currency": "ETH",
      "amount": "77157500000000000000",
      "units": "wei"
    },
    "network": "ethereum",
    "timestamp": 1659003693
  },
  "statusCode": 200
}
```

---

## Twaps Endpoint

This endpoint returns the TWAP for a given NFT collection

`twaps` is the only supported name for this endpoint.

### Input Params

| Required? |      Name      | Aliases |              Description               |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :------------: | :-----: | :------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     |     method     |         |      The endpoint request method       | string |  `get`  |         |            |                |
|           |     parse      |         | Properties to return (comma separated) | string |         |         |            |                |
|    ✅     | collectionName |         |        The NFT collection name.        | string |         |         |            |                |

### Example

Request:

```json
{
  "id": 1,
  "data": {
    "endpoint": "twaps",
    "method": "get",
    "collectionName": "boredapeyachtclub"
  },
  "debug": {
    "cacheKey": "FJ9RYJfN24040a6OKpJnHLWrEVs="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "collection": {
      "contractAddress": null,
      "name": null,
      "symbol": null,
      "imageUrl": null
    },
    "twap": {
      "currency": null,
      "amount": "67607924791666666666",
      "units": "wei"
    },
    "network": null,
    "timestamp": 1662988500
  },
  "statusCode": 200
}
```

---

## Valuations Endpoint

This endpoint returns the valuation (price estimate) for a given NFT

`valuations` is the only supported name for this endpoint.

### Input Params

| Required? |       Name        | Aliases |                        Description                         |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :---------------: | :-----: | :--------------------------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     |      method       |         |                The endpoint request method                 | string |  `get`  |         |            |                |
|           |       parse       |         |           Properties to return (comma separated)           | string |         |         |            |                |
|    ✅     |      chainId      |         | The ID of the blockchain where the NFT collection belongs. | number |         |         |            |                |
|    ✅     | collectionAddress |         |        The contract address of the NFT collection.         | string |         |         |            |                |
|    ✅     |      tokenId      |         |                    The ID of the token.                    | number |         |         |            |                |

### Example

Request:

```json
{
  "id": 1,
  "data": {
    "endpoint": "valuations",
    "method": "get",
    "chainId": 137,
    "collectionAddress": "0x67f4732266c7300cca593c814d46bee72e40659f",
    "tokenId": 13056
  },
  "debug": {
    "cacheKey": "dVX9BPPz1w+kXZ/t0G46UcAAiTc="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "valuation": {
      "priceEstimate": {
        "currency": "ETH",
        "amount": "18746314209468810000",
        "units": "wei"
      },
      "priceEstimateUpperBound": {
        "currency": "ETH",
        "amount": "154811129262219250000",
        "units": "wei"
      },
      "priceEstimateLowerBound": {
        "currency": "ETH",
        "amount": "1344708589490849300",
        "units": "wei"
      }
    }
  },
  "statusCode": 200
}
```

---

MIT License
