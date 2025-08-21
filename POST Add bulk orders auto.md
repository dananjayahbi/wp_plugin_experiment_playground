# POST Add bulk orders auto

# POST **Add bulk orders auto**

```jsx
https://portal.transexpress.lk/api/orders/upload/auto
```

The following request can be made to add **multiple orders automaticaly** into our system.

## **Request Payload Objects**

**order_data** : ***required : Object*** - Order Specific Details For A Batch Of Orders

- **order_id** : ***optional : String*** - Order number of the order
- **customer_name** : ***required : String*** - Name of the customer to which the order should be delivered to
- **address** : ***required : String*** - Address of the customer to which the order should be delivered to
- **order_description :** ***optional : String*** - A short description about the order

(min=0 , max=500 characters)

- **customer_phone** : ***required : String*** - Contact number of the customer to which the order should be delivered to (min=9 , max=10 digits)
- **customer_phone 2** : ***optional: String*** - Other contact number of the customer to which the order should be delivered to
- **cod_amount** : ***required : Double*** - Amount which should be collected on delivery of the package to said customer
- **city** : ***required : Integer*** - Respective city of the package should be delivered too
- **remark** : ***optional : String*** - Any remarks regarding the order

**AUTHORIZATION**   Bearer Token

**Token**                                                    {{client_token}}

**HEADERS**

---

**Accept**                                                  application/json

**Content-Type**                                     application/json

**Body**    raw

---

```jsx
[
    {
        "order_id" : 50060110,
        "customer_name" : "Customer Name 1",
        "address" : "Address 1",
        "order_description" : "test order_description" ,
        "customer_phone" : "0777777777",
        "customer_phone2" : "0777777777",
        "cod_amount" : 1500,
        "city" : 864,
        "remarks" : "remark 1"
    },
    {
        "order_id" : 50060111,
        "customer_name" : "Customer Name 2",
        "address" : "Address 2",
        "order_description" : "test order_description" ,
        "customer_phone" : "0777777777",
        "customer_phone2" : "0777777777",
        "cod_amount" : 1500,
        "city" : 864,
        "remarks" : "remark 2"
    },
    {
        "order_id" : 50060112,
        "customer_name" : "Customer Name 3",
        "address" : "Address 3",
        "order_description" : "test order_description" ,
        "customer_phone" : "0777777777",
        "customer_phone2" : "0777777777",
        "cod_amount" : 1500,
        "city" : 864,
        "remarks" : "remark 3"
    }
]
```

Example request (success)

```jsx
var axios = require('axios');
var data = JSON.stringify([
  {
    "order_id": 88888888,
    "customer_name": "Customer Name 1",
    "address": "Address 1",
    "order_description": "test order_description",
    "customer_phone": "0777777777",
    "customer_phone2": "0777777777",
    "cod_amount": 1500,
    "district": 5,
    "city": 864,
    "remarks": "remark 1"
  },
  {
    "order_id": 77777777,
    "customer_name": "Customer Name 2",
    "address": "Address 2",
    "order_description": "test order_description",
    "customer_phone": "0777777777",
    "customer_phone2": "0777777777",
    "cod_amount": 1500,
    "district": 5,
    "city": 864,
    "remarks": "remark 2"
  },
  {
    "order_id": 66666666,
    "customer_name": "Customer Name 3",
    "address": "Address 3",
    "order_description": "test order_description",
    "customer_phone": "0777777777",
    "customer_phone2": "0777777777",
    "cod_amount": 1500,
    "district": 5,
    "city": 864,
    "remarks": "remark 3"
  }
]);

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: '{{base_url}}/orders/upload/auto',
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

Example response

```jsx
{
  "success": "Record successfully added",
  "orders": [
    {
      "id": 1947053,
      "waybill_id": "AT399774",
      "client_id": 4205,
      "order_no": "88888888",
      "customer_name": "Customer Name 1",
      "address": "Address 1",
      "phone_no": "",
      "description": "test order_description",
      "district_id": 5,
      "city_id": 864,
      "suggested_city": "",
      "branch_id": null,
      "new_branch_id": null,
      "cod": 1500,
      "collected_cod": null,
      "delivery_charge": null,
      "wight": null,
      "note": "remark 1",
      "first_kg": null,
      "after_kg": null,
      "inv_id": null,
      "deposit_id": null,
      "created_at": "2023-10-06 17:04:35",
      "updated_at": "2023-10-06 17:04:35",
      "status_id": 14998775,
      "delivery_attempts": null,
      "third_party_service": null,
      "current_rider_id": null,
      "latest_rider_assign_id": null,
      "branch_order_id": null
    },
    {
      "id": 1947054,
      "waybill_id": "AT399775",
      "client_id": 4205,
      "order_no": "77777777",
      "customer_name": "Customer Name 2",
      "address": "Address 2",
      "phone_no": "",
      "description": "test order_description",
      "district_id": 5,
      "city_id": 864,
      "suggested_city": "",
      "branch_id": null,
      "new_branch_id": null,
      "cod": 1500,
      "collected_cod": null,
      "delivery_charge": null,
      "wight": null,
      "note": "remark 2",
      "first_kg": null,
      "after_kg": null,
      "inv_id": null,
      "deposit_id": null,
      "created_at": "2023-10-06 17:04:35",
      "updated_at": "2023-10-06 17:04:35",
      "status_id": 14998776,
      "delivery_attempts": null,
      "third_party_service": null,
      "current_rider_id": null,
      "latest_rider_assign_id": null,
      "branch_order_id": null
    },
    {
      "id": 1947055,
      "waybill_id": "AT399776",
      "client_id": 4205,
      "order_no": "66666666",
      "customer_name": "Customer Name 3",
      "address": "Address 3",
      "phone_no": "",
      "description": "test order_description",
      "district_id": 5,
      "city_id": 864,
      "suggested_city": "",
      "branch_id": null,
      "new_branch_id": null,
      "cod": 1500,
      "collected_cod": null,
      "delivery_charge": null,
      "wight": null,
      "note": "remark 3",
      "first_kg": null,
      "after_kg": null,
      "inv_id": null,
      "deposit_id": null,
      "created_at": "2023-10-06 17:04:35",
      "updated_at": "2023-10-06 17:04:35",
      "status_id": 14998777,
      "delivery_attempts": null,
      "third_party_service": null,
      "current_rider_id": null,
      "latest_rider_assign_id": null,
      "branch_order_id": null
    }
  ]
}
```