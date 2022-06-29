# NFT Metrics Adapter

![2.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/nft-metrics/package.json)

The external adapter for the LinkPool NFT Metrics API.

Base URL https://api.market.link

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |    Name    |                    Description                     |  Type  | Options | Default |
| :-------: | :--------: | :------------------------------------------------: | :----: | :-----: | :-----: |
|    ✅     | ACCESS_KEY | The Access Key that can be obtained from LinkPool. | string |         |         |
|    ✅     | SECRET_KEY | The Secret Key that can be obtained from LinkPool. | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |        Options         | Default |
| :-------: | :------: | :-----------------: | :----: | :--------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [tami](#tami-endpoint) | `tami`  |

## Tami Endpoint

This endpoint returns the complete appraisal value of an NFT collection using Time-Adjusted Market Index in WEI.

### Supported Markets

The parameter `marketId` defaults to `0`.

| marketId |      Market       |
| :------: | :---------------: |
|    0     |    All Markets    |
|    1     |      OpenSea      |
|    2     |     LooksRare     |
|    3     | CryptoPunksMarket |

`tami` is the only supported name for this endpoint.

### Input Params

| Required? |     Name     |       Aliases       |                  Description                   |  Type  |      Options       | Default | Depends On | Not Valid With |
| :-------: | :----------: | :-----------------: | :--------------------------------------------: | :----: | :----------------: | :-----: | :--------: | :------------: |
|    ✅     | assetAddress | `collectionAddress` |          The NFT collection address.           | string |                    |         |            |                |
|           |   marketId   |                     | The NFT market ID from which we want the TAMI. | number | `0`, `1`, `2`, `3` |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "tami",
    "assetAddress": "0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e",
    "marketId": 0
  },
  "debug": {
    "cacheKey": "aNYl31PtBXS6ydMTl3RosmfYVKc="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "answer": {
      "eth": "145792.4216888684",
      "gwei": "145792421688868.4",
      "wei": "145792421688868400000000"
    },
    "message": "successful",
    "result": 1.457924216888684e23
  },
  "result": 1.457924216888684e23,
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

MIT License
