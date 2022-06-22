# Chainlink External Adapter for Solipay

[Solipay](https://www.solipay.tech/)

### Environment Variables

| Required? |  Name   |                            Description                             | Options | Defaults to |
| :-------: | :-----: | :----------------------------------------------------------------: | :-----: | :---------: |
|    ✅     | API_KEY | An API key that can be obtained from the data provider's dashboard |         |             |

---

### Input Parameters

| Required? |   Name   |     Description     |                                    Options                                     | Defaults to |
| :-------: | :------: | :-----------------: | :----------------------------------------------------------------------------: | :---------: |
|    ✅     | endpoint | The endpoint to use | [contains-most-visited-location](#contains-the-most-visited-location-endpoint) |             |

---

## Contains The Most Visited Location Endpoint

Returns whether the most visited location by the Solipay address is in the list of countries.

### Input Params

| Required? |          Name           |                                 Description                                  |             Options              | Defaults to |
| :-------: | :---------------------: | :--------------------------------------------------------------------------: | :------------------------------: | :---------: |
|    ✅     |        `address`        |                           A Solipay wallet address                           |                                  |             |
|    ✅     | `countryCodes` or `ccs` |          A list of country codes (ISO 3166 alpha-2), `-` separated           |                                  |             |
|           |         `days`          | The minimum number of days the address has been in the most visited location | From `1` to `21` (both included) |     `1`     |

### Sample Input

```json
{
  "id": "1",
  "data": {
    "endpoint": "contains-most-visited-location",
    "address": "0x510605f010F5cB63FaF41e94ceB29B1b8856D67d",
    "countryCodes": "PT-ES-FR-IT-US",
    "days": 7
  }
}
```

### Sample Output

A successful request with an invalid response (`valid` is false, `message` contains the reason):

```json
{
  "jobRunID": "1",
  "result": {
    "message": "Non-Solipay Address",
    "res": true,
    "valid": false
  },
  "statusCode": 200,
  "data": {
    "message": "Non-Solipay Address",
    "res": true,
    "valid": false,
    "result": {
      "message": "Non-Solipay Address",
      "res": true,
      "valid": false
    }
  }
}
```

A successful request with a valid response (`valid` is true):

```json
{
  "jobRunID": "1",
  "result": {
    "message": "Valid",
    "res": true,
    "valid": true
  },
  "statusCode": 200,
  "data": {
    "message": "Valid",
    "res": true,
    "valid": true,
    "result": {
      "message": "Valid",
      "res": true,
      "valid": true
    }
  }
}
```
