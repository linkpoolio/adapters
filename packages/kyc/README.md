# kyc Adapter

![1.1.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/kyc/package.json)

This adapter demonstrates leveraging two data providers for the same data types.

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |          Name          |           Description            |  Type  | Options | Default |
| :-------: | :--------------------: | :------------------------------: | :----: | :-----: | :-----: |
|           | CIPHERTRACE_ACCESS_KEY | The Ciphertrace's API Access Key | string |         |         |
|           | CIPHERTRACE_SECRET_KEY | The Ciphertrace's API Secret Key | string |         |         |
|           |    EVEREST_API_KEY     |   The Everest's API Secret Key   | string |         |         |
|           |      API_PROVIDER      |        The data provider         | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |             Options              | Default |
| :-------: | :------: | :-----------------: | :----: | :------------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [addresses](#addresses-endpoint) |         |

## Addresses Endpoint

This endpoint returns the address details, e.g. KYC, AML

`addresses` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases |                                    Description                                    |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :-------------------------------------------------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | method  |         |                            The endpoint request method                            | string |  `get`  |         |            |                |
|           |  parse  |         |                      Properties to return (comma separated)                       | string |         |         |            |                |
|    ✅     | address |         |                               The address to check                                | string |         |         |            |                |
|           | network |         | The network name, e.g. ETH, BTC. Only for the following API_PROVIDER: ciphertrace | string |         |         |            |                |

### Example

Request:

```json
{
  "id": 1,
  "data": {
    "endpoint": "addresses",
    "method": "get",
    "address": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
  },
  "debug": {
    "cacheKey": "DwM00OvNtGMlpuLARjgsp/4kan0="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "isFound": false,
    "network": null,
    "address": null,
    "aml": {
      "isSanctioned": null
    },
    "kyc": {
      "status": 0,
      "timestamp": 0
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
    "endpoint": "addresses",
    "method": "get",
    "address": "0xda0AFdDB7b05f6B635E3018937E35faa6255d4a1"
  },
  "debug": {
    "cacheKey": "cW0PTE+tGuiLBKAJpLRUemsMlVo="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "isFound": true,
    "network": null,
    "address": null,
    "aml": {
      "isSanctioned": null
    },
    "kyc": {
      "status": 2,
      "timestamp": 0
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
    "endpoint": "addresses",
    "method": "get",
    "address": "0x652c3c775A82fEc8D176BEaEB1e259DD5b0c8526"
  },
  "debug": {
    "cacheKey": "XV0H1aE6CruJFkI987z5TqlhWjA="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "isFound": true,
    "network": null,
    "address": null,
    "aml": {
      "isSanctioned": null
    },
    "kyc": {
      "status": 1,
      "timestamp": 1661786511
    }
  },
  "statusCode": 200
}
```

</details>

---

MIT License
