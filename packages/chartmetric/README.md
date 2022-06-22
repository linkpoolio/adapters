# Chainlink External Adapter for Chartmetric

![1.0.0](https://img.shields.io/github/package-json/v/smartcontractkit/external-adapters-js?filename=packages/sources/chartmetric/package.json)

Chartmetric provides data and statistics for music artists.

Base URL https://api.chartmetric.com/api/

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |  Name   |  Description   |  Type  | Options | Default |
| :-------: | :-----: | :------------: | :----: | :-----: | :-----: |
|    ✅     | API_KEY | API key to use | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                          Options                           | Default |
| :-------: | :------: | :-----------------: | :----: | :--------------------------------------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [auth](#auth-endpoint), [statistics](#statistics-endpoint) |         |

## Statistics Endpoint

This endpoint returns the number of TikTok followers, Youtube subscribers or Spotify listeners, for a given artist.

`statistics` is the only supported name for this endpoint.

### Input Params

| Required? |   Name   | Aliases |                           Description                            |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :------: | :-----: | :--------------------------------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | artistId |         | The ID of the artist for which we want to query the metrics for. | number |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "statistics",
    "artistId": 439
  },
  "debug": {
    "cacheKey": "JhNp4roFVwiJoxbSlBho70pKJKo="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "obj": {
      "cm_statistics": {
        "sp_followers": 77777,
        "ycs_subscribers": 777777,
        "tiktok_followers": 777777
      }
    },
    "result": "0x00000000000bde31000000000000000000000000000bde310000000000000000"
  },
  "result": "0x00000000000bde31000000000000000000000000000bde310000000000000000",
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

## Auth Endpoint

This endpoint returns bearer token in order to authorize the request.

`auth` is the only supported name for this endpoint.

### Input Params

There are no input parameters for this endpoint.

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "auth"
  },
  "debug": {
    "cacheKey": "lBmaKntADQnEoBkPrqxeCIx/src="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "token": "chartmetricAuthToken",
    "expires_in": 3600,
    "refresh_token": "REFRESH_TOKEN",
    "scope": "api",
    "result": "chartmetricAuthToken"
  },
  "result": "chartmetricAuthToken",
  "statusCode": 200,
  "providerStatusCode": 200
}
```

---

MIT License
