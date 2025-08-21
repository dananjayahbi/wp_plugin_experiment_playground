# POST Add Single Order - Auto waybill

# POST **Add Single Order - Auto waybill**

```jsx
https://portal.transexpress.lk/api/orders/upload/single-auto-without-city
```

The following request can be used to add orders where the waybill ID will be suggested automaticaly for an order.

## **Request Payload Objects**

**order_data** : ***required : Object*** - Order Specific Details For A Batch Of Orders

- **order_no** : ***optional : String*** - Order number of the order
- **customer_name** : ***required : String*** - Name of the customer to which the order should be delivered to
- **address** : ***required : String*** - Address of the customer to which the order should be delivered to
- **description :** ***optional : String*** - A short description about the order (min=0,max=500 characters)
- **phone_no** : ***required : String*** - Contact number of the customer to which the order should be delivered to (min=10, max=10 digits)
- **phone_no2** : ***optional : String*** - Another contact number of the customer to which the order should be delivered to (min=10, max=10 digits)
- **cod** : ***required : Double*** - Amount which should be collected on delivery of the package to said customer
- **city_id** : ***required : Integer*** - Respective city of the package should be delivered too
- **note** : ***optional : String*** - Mention if any particular note regarding the order package

**AUTHORIZATION**  Bearer Token

---

**Token**                                       <token>

**HEADERS**

---

**Accept**                                    application/json

**Content-Type**                       application/json

**Body**  raw (json)

---

```jsx
{
    "order_no": 44444444,
    "customer_name": "customer name 1",
    "address": "address 1",
    "description": "test order_description",
    "phone_no": "0777777777",
    "phone_no2": "0677777777",
    "cod": 1500,
    // "city_id": 864,
    "note": "sample note 1",
    "city": "amgth"
}
```

Example Request

```jsx
var axios = require('axios');
var data = JSON.stringify({
  "order_no": 44444444,
  "customer_name": "customer name 1",
  "address": "address 1",
  "description": "test order_description",
  "phone_no": "0777777777",
  "phone_no2": "0677777777",
  "cod": 1500,
  "district_id": 5,
  "city_id": 864,
  "note": "sample note 1"
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: '{{base_url}}/orders/upload/single-auto',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

Example Response

```jsx
{
  "success": "Record successfully added",
  "order": {
    "waybill_id": "AT399773",
    "order_no": 44444444,
    "address": "address 1",
    "customer_name": "customer name 1",
    "phone_no": [
      "0777777777",
      "0677777777"
    ],
    "description": "test order_description",
    "district_id": 5,
    "city_id": 864,
    "cod": "1500",
    "note": "sample note 1",
    "third_party_service": null,
    "updated_at": "2023-10-06 15:18:33",
    "created_at": "2023-10-06 15:18:33",
    "id": 1947047,
    "client_id": 4205,
    "status_id": 14998769
  }
}
```