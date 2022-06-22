# Chainlink External Adapter for Wavebridge

[Wavebridge](https://wavebridge.com/)

[WavebridgeIndex API](https://wavebridgelabs.gitbook.io/wave-index-api-eng/)

### Environment Variables

| Required? |      Name       |    Description     | Options | Defaults to |
| :-------: | :-------------: | :----------------: | :-----: | :---------: |
|    ✅     | `API_CORP_CODE` | A corporation code |         |             |
|    ✅     |    `API_KEY`    |     An API key     |         |             |

---

### Input Parameters

| Required? |   Name   |     Description     |                                                          Options                                                           | Defaults to |
| :-------: | :------: | :-----------------: | :------------------------------------------------------------------------------------------------------------------------: | :---------: |
|           | endpoint | The endpoint to use | [cmx-daily](#get-cmx-daily-endpoint), [kimp-daily](#get-kimp-daily-endpoint), [kimp-realtime](#get-kimp-realtime-endpoint) |             |

---

## Get CMX Daily Endpoint

Get the CMX Index by date

### Input Params

| Required? |  Name  |                                        Description                                        | Options | Defaults to |
| :-------: | :----: | :---------------------------------------------------------------------------------------: | :-----: | :---------: |
|           | `date` | The date of the Index (as `YYYY-MM-DD`). Set to yesterday by the API if it is not present | format: |             |

### Sample Input

```json
{
  "id": "1",
  "data": {
    "endpoint": "cmx-daily",
    "date": "2022-01-23"
  }
}
```

### Sample Output

```json
{
  "jobRunID": "1",
  "result": 6849.831829822349,
  "providerStatusCode": 200,
  "statusCode": 200,
  "data": {
    "result": 6849.831829822349
  }
}
```

---

## Get KIMP Daily Endpoint

Get the KIMP Index by date

### Input Params

| Required? |  Name  |                                        Description                                        | Options | Defaults to |
| :-------: | :----: | :---------------------------------------------------------------------------------------: | :-----: | :---------: |
|           | `date` | The date of the Index (as `YYYY-MM-DD`). Set to yesterday by the API if it is not present | format: |             |

### Sample Input

```json
{
  "id": "1",
  "data": {
    "endpoint": "kimp-daily",
    "date": "2022-01-23"
  }
}
```

### Sample Output

```json
{
  "jobRunID": "1",
  "result": 2.208898,
  "providerStatusCode": 200,
  "statusCode": 200,
  "data": {
    "result": 2.208898
  }
}
```

---

## Get KIMP Realtime Endpoint

Get the real-time KIMP Index

### Sample Input

```json
{
  "id": "1",
  "data": {
    "endpoint": "kimp-realtime"
  }
}
```

### Sample Output

```json
{
  "jobRunID": "1",
  "result": 2.419445,
  "providerStatusCode": 200,
  "statusCode": 200,
  "data": {
    "result": 2.419445
  }
}
```
