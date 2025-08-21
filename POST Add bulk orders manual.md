# POST Add bulk orders manual

# POST **Add bulk orders manual**

```jsx
https://portal.transexpress.lk/api/orders/upload/manual
```

The following request can be made to add **multiple orders manually** into our system by including the waybill id.

## **Request Payload Objects**

**order_data** : ***required : Object*** - Order Specific Details For A Batch Of Orders

- **waybill_id** : ***required : String*** - Waybill number of the order

(min=8 , max=8 characters)

- **order_id** : ***optional : String*** - Order number of the order
- **customer_name** : ***required : String*** - Name of the customer to which the order should be delivered to
- **address** : ***required : String*** - Address of the customer to which the order should be delivered to
- **order_description :** ***optional : String*** - A short description about the order

(min=0 , max=500 characters)

- **customer_phone** : ***required : String*** - Contact number of the customer to which the order should be delivered to

(min=9 , max=10 digits)

- **cod_amount** : ***required : Double*** - Amount which should be collected on delivery of the package to said customer
- **city** : ***required : Integer*** - Respective city of the package should be delivered too
- **remark** : ***optional : String*** - Any remarks regarding the order

**AUTHORIZATION** Bearer Token

---

**Token**                                     {{client_token}}

**HEADERS**

**Accept**                                   application/json

**Content-Type**                      application/json

**service-provider**                 larocher

**Body**raw (json)

---

```jsx
[
    {
        "way_bill": 67201919,
        "order_id" : 88888888,
        "customer_name" : "Customer Name 1",
        "address" : "Address 1",
        "order_description" : "test order_description" ,
        "customer_phone" : "0777777777",
        "customer_phone2" : "0777777777",
        "cod_amount" : 1500,
        "city" : "Kandy",
        "remarks" : "remark 1"
    },
    {
        "way_bill": 77201291,
        "order_id" : 77777777,
        "customer_name" : "Customer Name 2",
        "address" : "Address 2",
        "order_description" : "test order_description" ,
        "customer_phone" : "0777777777",
        "customer_phone2" : "0777777777",
        "cod_amount" : 1500,
        "city" : "Kendagolla",
        "remarks" : "remark 2"
    },
    {
        "way_bill": 66801182,
        "order_id" : 66666666,
        "customer_name" : "Customer Name 3",
        "address" : "Address 3",
        "order_description" : "test order_description" ,
        "customer_phone" : "0777777777",
        "customer_phone2" : "0777777777",
        "cod_amount" : 1500,
        "city" : "Kegalle",
        "remarks" : "remark 3"
    }
]
```

Example request

```jsx
var axios = require('axios');
var data = JSON.stringify([
  {
    "way_bill": 67283919,
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
    "way_bill": 77288291,
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
    "way_bill": 66829182,
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
  url: '{{base_url}}/orders/upload/manual',
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
      "id": 1947049,
      "waybill_id": "67283919",
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
      "created_at": "2023-10-06 16:54:46",
      "updated_at": "2023-10-06 16:54:46",
      "status_id": 14998771,
      "delivery_attempts": null,
      "third_party_service": null,
      "current_rider_id": null,
      "latest_rider_assign_id": null,
      "branch_order_id": null
    },
    {
      "id": 1947050,
      "waybill_id": "77288291",
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
      "created_at": "2023-10-06 16:54:46",
      "updated_at": "2023-10-06 16:54:46",
      "status_id": 14998772,
      "delivery_attempts": null,
      "third_party_service": null,
      "current_rider_id": null,
      "latest_rider_assign_id": null,
      "branch_order_id": null
    },
    {
      "id": 1947051,
      "waybill_id": "66829182",
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
      "created_at": "2023-10-06 16:54:46",
      "updated_at": "2023-10-06 16:54:46",
      "status_id": 14998773,
      "delivery_attempts": null,
      "third_party_service": null,
      "current_rider_id": null,
      "latest_rider_assign_id": null,
      "branch_order_id": null
    }
  ]
}
```