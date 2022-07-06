# Chainlink Upshot External Adapter

![2.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/upshot/package.json)

Base URL https://api.upshot.io

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |  Name   |                               Description                               |  Type  | Options | Default |
| :-------: | :-----: | :---------------------------------------------------------------------: | :----: | :-----: | :-----: |
|    ✅     | API_KEY | An API key that can be obtained from [Upshot](https://app.upshot.xyz/). | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                                 Options                                 | Default |
| :-------: | :------: | :-----------------: | :----: | :---------------------------------------------------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [asset-price](#assetprice-endpoint), [statistics](#statistics-endpoint) |         |

## AssetPrice Endpoint

This endpoint allows you to query the price in wei for a specific NFT asset.

`asset-price` is the only supported name for this endpoint.

### Input Params

| Required? |     Name     |       Aliases       |         Description         |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :----------: | :-----------------: | :-------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | assetAddress | `collectionAddress` | The NFT collection address. | string |         |         |            |                |
|    ✅     |   tokenId    |                     |         The NFT ID.         | number |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "asset-price",
    "assetAddress": "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    "tokenId": 11
  },
  "debug": {
    "cacheKey": "bgH5HKfp3B5y/VAGENZwpbbMN4w="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "status": true,
    "message": "Current Price gotten successfully for assets in query",
    "data": [
      {
        "assetId": "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/11",
        "currentPricing": {
          "assetId": "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/11",
          "estimatedPrice": "23772203809000000000"
        }
      }
    ],
    "result": 23772203809000000000
  },
  "result": 23772203809000000000,
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

## Statistics Endpoint

This endpoint returns statistics for an NFT collection in wei:

1.  Floor price
2.  Market cap
3.  Floor price and Market cap packed as bytes32
4.  Floor price and unix timestamp as bytes32

`statistics` is the only supported name for this endpoint.

### Input Params

| Required? |     Name     |       Aliases       |         Description         |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :----------: | :-----------------: | :-------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | assetAddress | `collectionAddress` | The NFT collection address. | string |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "statistics",
    "assetAddress": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"
  },
  "debug": {
    "cacheKey": "Bt4aZTt/MZBoKu+oCN7OP2maGrc="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "status": true,
    "message": "collection retrieved successfully",
    "data": {
      "id": 1,
      "name": "CryptoPunks",
      "description": "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
      "imageUrl": "https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s120",
      "slug": "cryptopunks",
      "stats": [
        {
          "timestamp": 1656316168,
          "floor": "66500000000000000000",
          "marketCap": "104534840290605916663324"
        }
      ]
    },
    "result": {
      "floorPrice": 66500000000000000000,
      "marketCap": 1.0453484029060591e23,
      "statistics": "0x00000000000000039adf75aafb7a00000000000000001622d85502fc3d5aae1c",
      "dateAndFloor": "0x00000000000000000000000062b9610800000000000000039adf75aafb7a0000"
    }
  },
  "result": {
    "floorPrice": 66500000000000000000,
    "marketCap": 1.0453484029060591e23,
    "statistics": "0x00000000000000039adf75aafb7a00000000000000001622d85502fc3d5aae1c",
    "dateAndFloor": "0x00000000000000000000000062b9610800000000000000039adf75aafb7a0000"
  },
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

MIT License
