# Freelance Jobs Adapter

![1.0.1](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/freelance-jobs/package.json)

An adapter to find freelance jobs published

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |     Name     |         Description         |  Type  | Options | Default |
| :-------: | :----------: | :-------------------------: | :----: | :-----: | :-----: |
|           |   API_KEY    | The data provider's API key | string |         |         |
|           | API_PROVIDER |      The data provider      | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |        Options         | Default |
| :-------: | :------: | :-----------------: | :----: | :--------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [jobs](#jobs-endpoint) |         |

## Jobs Endpoint

This endpoint returns a single job.

`jobs` is the only supported name for this endpoint.

### Input Params

| Required? |  Name  | Aliases |              Description               |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :----: | :-----: | :------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | method |         |      The endpoint request method       | string |  `get`  |         |            |                |
|           | parse  |         | Properties to return (comma separated) | string |         |         |            |                |
|    ✅     | jobId  |         |           The job identifier           | number |         |         |            |                |

### Example

Request:

```json
{
  "id": 1,
  "data": {
    "endpoint": "jobs",
    "method": "get",
    "jobId": 1
  },
  "debug": {
    "cacheKey": "BSauWl83Z0mfHs6m3b+nJIKsaS4="
  }
}
```

Response:

```json
{
  "jobRunID": 1,
  "data": {
    "id": 1,
    "employer": {
      "address": "0x6613A30A0D7F4011Cb569ca89f5a107cF9A542f2"
    },
    "freelancer": {
      "address": "0xbDf9CD30F6201B02F48d94878a86cf9B375f6344"
    },
    "payment": {
      "amount": "10000000000000000000",
      "currency": "LANC",
      "units": "wei"
    }
  },
  "statusCode": 200
}
```

---

MIT License
