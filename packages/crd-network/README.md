# @chainlink/crd-network-adapter env var schema

![1.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/crd-network/package.json)

Base URL https://api.crdtoken.org

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |  Name   | Description | Type | Options | Default |
| :-------: | :-----: | :---------: | :--: | :-----: | :-----: |
|    ✅     | API_KEY |             |      |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                Options                | Default |
| :-------: | :------: | :-----------------: | :----: | :-----------------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [address-info](#addressinfo-endpoint) |         |

## AddressInfo Endpoint

`address-info` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases | Description | Type | Options | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :---------: | :--: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | address |         |             |      |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "address-info",
    "address": "0xFf71F5d9B8f8B4886EB7224AF5D03000839BC527"
  },
  "debug": {
    "cacheKey": "3GbqpkMZib6CSXhlN8L+oY5N/gs="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "object": "0xff71f5d9b8f8b4886eb7224af5d03000839bc527",
    "kycId": "LAlfLGjYRsi28KdxaS2ffw",
    "kycLevel": 0,
    "objectType": "address",
    "result": {
      "object": "0xff71f5d9b8f8b4886eb7224af5d03000839bc527",
      "kycId": "0x4c416c664c476a5952736932384b6478615332666677",
      "kycLevel": 0,
      "objectType": "address"
    }
  },
  "result": {
    "object": "0xff71f5d9b8f8b4886eb7224af5d03000839bc527",
    "kycId": "0x4c416c664c476a5952736932384b6478615332666677",
    "kycLevel": 0,
    "objectType": "address"
  },
  "statusCode": 200
}
```

---

MIT License
