# Chainlink External Adapter for CRD Network

[CRD Network](https://www.crdtoken.org/)

### Environment Variables

| Required? |  Name   |                            Description                             | Options | Defaults to |
| :-------: | :-----: | :----------------------------------------------------------------: | :-----: | :---------: |
|    ✅     | API_KEY | An API key that can be obtained from the data provider's dashboard |         |             |

---

### Input Parameters

| Required? |   Name   |     Description     |                  Options                   | Defaults to |
| :-------: | :------: | :-----------------: | :----------------------------------------: | :---------: |
|    ✅     | endpoint | The endpoint to use | [address-info](#get-address-info-endpoint) |             |

---

## Get Address Info Endpoint

Returns the KYC info of the address

### Input Params

| Required? |   Name    |              Description              | Options | Defaults to |
| :-------: | :-------: | :-----------------------------------: | :-----: | :---------: |
|    ✅     | `address` | The address to request KYC info about |         |             |

### Sample Input

```json
{
  "id": "1",
  "data": {
    "endpoint": "address-info",
    "address": "0xFf71F5d9B8f8B4886EB7224AF5D03000839BC527"
  }
}
```

### Sample Output

```json
{
  "jobRunID": "1",
  "result": {
    "object": "0xff71f5d9b8f8b4886eb7224af5d03000839bc527",
    "kycId": "0x4c416c664c476a5952736932384b6478615332666677",
    "kycLevel": 0,
    "objectType": "address"
  },
  "statusCode": 200,
  "data": {
    "result": {
      "object": "0xff71f5d9b8f8b4886eb7224af5d03000839bc527",
      "kycId": "0x4c416c664c476a5952736932384b6478615332666677",
      "kycLevel": 0,
      "objectType": "address"
    }
  }
}
```
