# nft-analytics Adapter

![1.1.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/nft-analytics/package.json)

An adapter to query NFT analytics

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |     Name     |         Description         |  Type  | Options | Default |
| :-------: | :----------: | :-------------------------: | :----: | :-----: | :-----: |
|           |   API_KEY    | The data provider's API key | string |         |         |
|           | API_PROVIDER |      The data provider      | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                            Options                             | Default |
| :-------: | :------: | :-----------------: | :----: | :------------------------------------------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [floorprices](#floorprices-endpoint), [twaps](#twaps-endpoint) |         |

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

MIT License
