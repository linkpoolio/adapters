# Chainlink External Adapter for Heni

### Environment Variables

| Required? |  Name   |                            Description                             | Options | Defaults to |
| :-------: | :-----: | :----------------------------------------------------------------: | :-----: | :---------: |
|           | API_KEY | An API key that can be obtained from [here](https://www.heni.com/) |         |             |

---

### Input Parameters

| Required? |   Name   |     Description     |         Options          | Defaults to |
| :-------: | :------: | :-----------------: | :----------------------: | :---------: |
|           | endpoint | The endpoint to use | [price](#price-endpoint) |    price    |

---

## Price Endpoint

The endpoint returns and index price which represents a TWAP of the sale prices of the last 15 sales of NFTs in a collection.

### Sample Input

```json
{
  "id": "1",
  "data": {
    "endpoint": "price"
  }
}
```

### Sample Output

The output price is multiplied by 10^9 and is in ETH.

```json
{
  "jobRunID": "1",
  "result": 4962921295,
  "statusCode": 200,
  "data": {
    "result": 4962921295
  }
}
```
