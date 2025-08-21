# POST Add bulk orders auto Copy

# POST **Add bulk orders auto Copy**

```jsx
https://portal.transexpress.lk/api/orders/upload/auto-without-city
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

**AUTHORIZATION**    Bearer Token

**Token**                                 {{client_token}}

**HEADERS**

---

**Accept**                               application/json

**Content-Type**                  application/json

**Body** raw

---

```jsx
[
    {
        "order_id": 240083,
        "customer_name": "Mazeezasraf ",
        "address": "Mainsreet. Kalpitiya",
        "order_description": "Frog Super Viscous Oily Glue",
        "customer_phone": 772431525,
        "customer_phone2": 788844040,
        "cod_amount": 1350.0,
        "city": "Puttalam Town",
        "remarks": ""
    },
    {
        "order_id": 240416,
        "customer_name": "S abdul asis ",
        "address": "53/3/a dehianga muruthalawq",
        "order_description": "Frog Super Viscous Oily Glue",
        "customer_phone": 763236018,
        "customer_phone2": 763236018,
        "cod_amount": 1300.0,
        "city": "Kandy City",
        "remarks": ""
    },
    {
        "order_id": 240423,
        "customer_name": "S T Pallewatta ",
        "address": "no 98 Amunugama gunnapana",
        "order_description": "Frog Super Viscous Oily Glue",
        "customer_phone": 715347372,
        "customer_phone2": 715347372,
        "cod_amount": 1300.0,
        "city": "Kandy Town",
        "remarks": ""
    },
    {
        "order_id": 240480,
        "customer_name": "sandika.suranjan ",
        "address": "ViLlyagma.Lhiruyagama,DANKOTUWA ,PUTHTHALAMA",
        "order_description": "Hearing Amplifier Ear Whisperer",
        "customer_phone": 777483411,
        "customer_phone2": 777693411,
        "cod_amount": 2000.0,
        "city": "Puttalam Town",
        "remarks": ""
    },
    {
        "order_id": 240545,
        "customer_name": "Tharaka ",
        "address": "No 30 Papliyana rode nadimala",
        "order_description": "REFRIGERATOR  LOCK",
        "customer_phone": 758010072,
        "customer_phone2": 758010072,
        "cod_amount": 1800.0,
        "city": "Nedimala",
        "remarks": ""
    },
    {
        "order_id": 240566,
        "customer_name": "shihan ",
        "address": "146/62A, Aramya Road, Dematagoda, Colombo 9",
        "order_description": "Frog Super Viscous Oily Glue",
        "customer_phone": 777113955,
        "customer_phone2": 757113919,
        "cod_amount": 1450.0,
        "city": "Colombo 8 - Borella",
        "remarks": ""
    },
    {
        "order_id": 240583,
        "customer_name": "m.g indika ",
        "address": "gammaddegoda ,Rathgama",
        "order_description": "Frog Super Viscous Oily Glue",
        "customer_phone": 776090224,
        "customer_phone2": 776090224,
        "cod_amount": 1450.0,
        "city": "Galle Town",
        "remarks": ""
    },
    {
        "order_id": 240589,
        "customer_name": "Asma sappideen ",
        "address": "9 new ferry lane colombo 2",
        "order_description": "Frog Super Viscous Oily Glue",
        "customer_phone": 778537096,
        "customer_phone2": 778537096,
        "cod_amount": 1450.0,
        "city": "Colombo 02 - Slave Island & Union Place",
        "remarks": ""
    },
    {
        "order_id": 240601,
        "customer_name": "Rinos ",
        "address": "248B Vappayadi Road. Sainthamaruthu 13",
        "order_description": "Frog Super Viscous Oily Glue",
        "customer_phone": 757572372,
        "customer_phone2": 757572372,
        "cod_amount": 1450.0,
        "city": "Ampara Town",
        "remarks": ""
    },
    {
        "order_id": 240624,
        "customer_name": "Dulanga Madara ",
        "address": "3 Alfredo place Colombo",
        "order_description": "Airpods Pro ( AAA Grade )",
        "customer_phone": 776779200,
        "customer_phone2": 771295155,
        "cod_amount": 2350.0,
        "city": "Colombo 3 - Kollupitiya",
        "remarks": ""
    }
]
```

Example Request

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

Example Response

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