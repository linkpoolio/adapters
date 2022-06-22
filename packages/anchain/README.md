# Anchain Adapter

![1.0.0](https://img.shields.io/github/package-json/v/smartcontractkit/external-adapters-js?filename=packages/sources/anchain/package.json)

The AnChain adapter checks if an address appears in the OFAC Anti-Terrorism/Anti-Money Laundering list and return the category in which the address belongs.

Base URL https://bei.anchainai.com

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |  Name   |  Description   |  Type  | Options | Default |
| :-------: | :-----: | :------------: | :----: | :-----: | :-----: |
|    ✅     | API_KEY | API key to use | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |            Options             |  Default   |
| :-------: | :------: | :-----------------: | :----: | :----------------------------: | :--------: |
|           | endpoint | The endpoint to use | string | [category](#category-endpoint) | `category` |

## Category Endpoint

This endpoint returns the category in which the address queried belongs to.

### Data Conversions

| chainId | Blockchain |
| :-----: | :--------: |
|    1    |  Ethereum  |
|    2    |  Bitcoin   |

| categoryId |    Category    |
| :--------: | :------------: |
|     0      |  unaffiliated  |
|     1      |   app wallet   |
|     2      |     whale      |
|     3      |      dapp      |
|     4      |     token      |
|     5      |    contract    |
|     6      |     miner      |
|     7      |      defi      |
|     8      |     mixer      |
|     9      |      bot       |
|     10     |     hacker     |
|     11     |      scam      |
|     12     |   ransomware   |
|     13     |     abuse      |
|     14     |    sanction    |
|     15     | darknet market |
|     16     |   blackmail    |

`category` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases |             Description              |  Type  | Options  | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :----------------------------------: | :----: | :------: | :-----: | :--------: | :------------: |
|    ✅     | address |         | The address which we want to lookup. | string |          |         |            |                |
|    ✅     | chainId |         |  The blockchain ID of the address.   | number | `1`, `2` |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "category",
    "address": "0xed5af388653567af2f388e6224dc7c4b3241c544",
    "chainId": 1
  },
  "debug": {
    "cacheKey": "Unmu7zwoBW9/rn8MOwT/VIyEXtM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "status": 200,
    "err_msg": "",
    "data": {
      "0xed5af388653567af2f388e6224dc7c4b3241c544": {
        "self": {
          "category": ["token", "wallet"],
          "detail": ["token:Azuki (AZUKI)", "wallet:Azuki"]
        },
        "is_address_valid": true
      }
    },
    "result": 4
  },
  "result": 4,
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

MIT License
