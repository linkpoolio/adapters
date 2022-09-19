# kyc Adapter

![1.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/kyc/package.json)

This adapter demonstrates leveraging two data providers for the same data types.

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |          Name          |           Description            |  Type  | Options | Default |
| :-------: | :--------------------: | :------------------------------: | :----: | :-----: | :-----: |
|           | CIPHERTRACE_ACCESS_KEY | The Ciphertrace's API Access Key | string |         |         |
|           | CIPHERTRACE_SECRET_KEY | The Ciphertrace's API Secret Key | string |         |         |
|           |      API_PROVIDER      |        The data provider         | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |             Options              | Default |
| :-------: | :------: | :-----------------: | :----: | :------------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [addresses](#addresses-endpoint) |         |

## Addresses Endpoint

This endpoint returns the KYC status of an address

`addresses` is the only supported name for this endpoint.

### Input Params

| Required? |     Name      |  Aliases  |                Description                 |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :-----------: | :-------: | :----------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     |    method     |           |        The endpoint request method         | string |  `get`  |         |            |                |
|           |     parse     |           |   Properties to return (comma separated)   | string |         |         |            |                |
|    ✅     | lookupAddress | `address` | The address to check whether is sanctioned | string |         |         |            |                |
|    ✅     |    network    |           |      The network name, e.g. ETH, BTC       | string |         |         |            |                |

### Example

There are no examples for this endpoint.

---

MIT License
