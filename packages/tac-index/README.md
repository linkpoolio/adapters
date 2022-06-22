# Chainlink External Adapter for Tac-index

[TAC Index](http://tacindex.com/)

[TAC Index API](http://tacindex.com/)

### Environment Variables

| Required? |      Name      | Description | Options | Defaults to |
| :-------: | :------------: | :---------: | :-----: | :---------: |
|    ✅     | `API_USERNAME` | An API key  |         |             |
|    ✅     | `API_PASSWORD` | An API key  |         |             |

---

### Input Parameters

| Required? |   Name   |     Description     |         Options          | Defaults to |
| :-------: | :------: | :-----------------: | :----------------------: | :---------: |
|           | endpoint | The endpoint to use | [price](#price-endpoint) |             |

---

## Price Endpoint

This endpoint returns the price of 1 kilogram of freight based on a given route.

### Input Params

| Required? |    Name    |                   Description                    |        Options         | Defaults to |
| :-------: | :--------: | :----------------------------------------------: | :--------------------: | :---------: |
|    ✅     |  `route`   | The route for which we want the price of freight |                        |             |
|           | `currency` |   The currency for which the price will be in    | `euro`, `usd`, `local` |             |

### Sample Input

```json
{
  "id": "1",
  "data": {
    "route": "HKG-DFW",
    "currency": "usd"
  }
}
```

### Sample Output

```json
{
  "jobRunID": "1",
  "result": 8.6,
  "providerStatusCode": 200,
  "statusCode": 200,
  "data": {
    "result": 8.6
  }
}
```
