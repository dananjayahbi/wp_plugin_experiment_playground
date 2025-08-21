# POST {{base_url}}/orders/upload/single-auto

# POST **{{base_url}}/orders/upload/single-auto**

```jsx
{{base_url}}/orders/upload/single-auto
```

Generated from cURL: curl --location -g '{{base_url}}/orders/upload/single-auto'

--header 'Accept: application/json'

--header 'Content-Type: application/json'

--data 

```jsx
{"order_no" : 44444444,
    "customer_name" : "customer name 1",
    "address" : "address 1",
    "description" : "test order_description" ,
    "phone_no" : "0777777777",
    "phone_no2" : "0677777777",
    "cod" : 1500,
    "city_id" : 864,
    "note" : "sample note 1"
    }
```

**HEADERS**

---

**Accept**                                    application/json

**Content-Type**                       application/json

**Body**  raw (json)

---

```jsx
{
        
        "order_no" : 44444444,
        "customer_name" : "customer name 1",
        "address" : "address 1",
        "description" : "test order_description" ,
        "phone_no" : "0777777777",
        "phone_no2" : "0677777777",
        "cod" : 1500,
        "city_id" : 864,
        "note" : "sample note 1"
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
No response body
This request doesn't return any response body
```