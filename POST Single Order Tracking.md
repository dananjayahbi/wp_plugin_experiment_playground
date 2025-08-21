# POST Single Order Tracking

# POST **Single Order Tracking**

```jsx
https://portal.transexpress.lk/api/tracking
```

Can be used to track a particular order providing the respective waybill ID from the system and get the order details. In the reponses the following details will be displayed.

- **waybill_id** ***: String*** - Waybill number of the order (min count = 8 , max = 8)
- **order_no** : ***String*** - Order number of the order
- **customer_name** : ***String*** - Name of the customer to which the order should be delivered to
- **customer_address** : ***String*** - Address of the customer to which the order should be delivered to
- **customer_district: String - Name of the District.**
- **customer_city: String - Name of the City.**
- **customer_phone_no : int - Phone number of the customer.**
- **weigh**t: int - Weight of the package.
- **placed_date**: Date - Order created date.
- **completed date: Date - Last status updated date of the order.**
- **Status History: Array- the history of the order status updated.**

**AUTHORIZATION**  Bearer Token

---

**Token**                                   <token>

**Body** raw (json)

---

```jsx
{
    "waybill_id" : "55555555"
}
```

Example Request

```jsx
var axios = require('axios');
var data = '{\r\n    "waybill_id" : "55555555"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: '{{base_url}}/tracking',
  headers: { },
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
  "data": {
    "waybill_id": "55555555",
    "order_no": "55555555",
    "customer_name": "Customer 726528",
    "customer_address": "Customer Address 726528",
    "customer_district": "Colombo",
    "customer_city": "Colombo 01",
    "customer_phone_no": "0112555555",
    "weight": null,
    "placed_date": "2021-09-27T11:26:25.000000Z",
    "completed date": null,
    "current_status": "Canceled",
    "status_history": [
      {
        "name": "Canceled",
        "remarks": "Request by Client",
        "added_date": "2021-09-30T05:55:34.000000Z"
      },
      {
        "name": "Processing",
        "remarks": "Enter by U DROP INTERNATIONAL (PVT) LTD",
        "added_date": "2021-09-27T11:26:25.000000Z"
      }
    ]
  }
}
```