# POST Add Single Order - Manual waybill Copy

# POST **Add Single Order - Manual waybill Copy**

```jsx
https://portal.transexpress.lk/api/orders/upload/auto-without-city
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

**AUTHORIZATION**  Bearer Token

---

**Token**                                        {{client_token}}

**HEADERS**

---

**Accept**                                     application/json

**Content-Type**                        application/json

**service-provider**                   larocher

**Body** raw (json)

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
    },
    {
        "order_id": 240711,
        "customer_name": "Nandana Bible ",
        "address": "06, Jayawardana Mawatha, Sea Beach Road, Angola, Moratuwa",
        "order_description": "24V Mini Chainsaw",
        "customer_phone": 755950930,
        "customer_phone2": 782343300,
        "cod_amount": 6000.0,
        "city": "Rathmalana",
        "remarks": ""
    },
    {
        "order_id": 240714,
        "customer_name": "kahada kanththga palitha edwrd samarasingha ",
        "address": "no9 seeppukulamaroad galenbidunuwewa",
        "order_description": "24V Mini Chainsaw",
        "customer_phone": 712810993,
        "customer_phone2": 713961196,
        "cod_amount": 6000.0,
        "city": "Anuradhapura Town",
        "remarks": ""
    }
]
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