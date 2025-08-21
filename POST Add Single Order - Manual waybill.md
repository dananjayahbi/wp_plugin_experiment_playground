# POST Add Single Order - Manual waybill

# POST **Add Single Order - Manual waybill**

```jsx
https://portal.transexpress.lk/api/orders/upload/single-manual
```

The following request can be used to **add orders by manually** providing a **waybill ID** for the package.

## **Request Payload Objects**

**order_data** : ***required : Object*** - Order Specific Details For A Batch Of Orders

- **waybill_id** : ***required : String*** - Waybill number of the order (min count = 8 , max = 8)
- **order_no** : ***optional : String*** - Order number of the order
- **customer_name** : ***required : String*** - Name of the customer to which the order should be delivered to
- **address** : ***required : String*** - Address of the customer to which the order should be delivered to
- **description :** ***optional : String*** - A short description about the order

(min=0 , max=500 characters)

- **phone_no** : ***required : String*** - Contact number of the customer to which the order should be delivered to (min =9 , max =10 digits)
- **phone_no2** : ***optional : String*** - Another contact number of the customer to which the order should be delivered to (min =9 , max =10 digits)
- **cod** : ***required : Double*** - Amount which should be collected on delivery of the package to said customer
- **city_id** : ***required : Integer*** - Respective city of the package should be delivered too
- **note** : ***optional : String*** - Mention if any particular note regarding the order package

**AUTHORIZATION**    Bearer Token

**Token**                                       {{client_token}}

**HEADERS**

---

**Accept**                                      application/json

**Content-Type**                         application/json

**service-provider**                    larocher

**Body** raw (json)

---

```jsx
{
        "waybill_id" : "51722547",
        "order_no" : 55555555,
        "customer_name" : "customer name 1",
        "address" : "address 1",
        "description" : "test order_description" ,
        "phone_no" : "0777777777",
        "phone_no2" : "0777777777",
        "cod" : 1500,
        "city_id" : "Kegalle",
        "note" : "sample note 1"
}
```

Example Request

```jsx
var axios = require('axios');
var data = JSON.stringify({
  "waybill_id": "42718291",
  "order_no": 55555555,
  "customer_name": "customer name 1",
  "address": "address 1",
  "description": "test order_description",
  "phone_no": "0777777777",
  "phone_no2": "0767777777",
  "cod": 1500,
  "district_id": 5,
  "city_id": 864,
  "note": "sample note 1"
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: '{{base_url}}/orders/upload/single-manual',
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
    "waybill_id": "42718291",
    "order_no": 55555555,
    "customer_name": "customer name 1",
    "address": "address 1",
    "description": "test order_description",
    "phone_no": "0777777777",
    "phone_no2": "0767777777",
    "cod": "1500",
    "district_id": 5,
    "city_id": 864,
    "note": "sample note 1",
    "updated_at": "2023-10-06 17:02:55",
    "created_at": "2023-10-06 17:02:55",
    "id": 1947052,
    "client_id": 4205,
    "status_id": 14998774
  }
}
```