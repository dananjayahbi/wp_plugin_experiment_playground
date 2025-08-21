# GET All Provinces, GET All Districts, GET All Cities

### **GET All Provinces**

```jsx
{{base_url}}/provinces
```

displays all the provinces situated in Sri Lanka

```jsx
[
    {
        "id": 1,
        "text": "Western"
    },
    {
        "id": 2,
        "text": "Central"
    },
    {
        "id": 3,
        "text": "Southern"
    },
    {
        "id": 4,
        "text": "North Western"
    },
    {
        "id": 5,
        "text": "Sabaragamuwa"
    },
    {
        "id": 6,
        "text": "Eastern"
    },
    {
        "id": 7,
        "text": "Uva"
    },
    {
        "id": 8,
        "text": "North Central"
    },
    {
        "id": 9,
        "text": "Northern"
    }
]
```

**HEADERS**

---

**Accept**                                       application/json

Example request

```jsx
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: '{{base_url}}/provinces',
  headers: { 
    'Accept': 'application/json'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

**Example Response**

```jsx
No response body
This request doesn't return any response body
```

---

### **GET All Districts**

```jsx
https://portal.transexpress.lk/api/districts?province_id=1
```

Displays the districts upon each province by selecting a province

**HEADERS**

---

**Accept**                         application/json

**Content-Type**            application/json

**PARAMS**

---

**province_id**                 1

**Body**   formdata  

---

                                       1

Example Request (success)

```jsx
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://portal.transexpress.lk/api/districts?province_id=1',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json'
  }
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
[
  {
    "id": 11,
    "text": "Kandy"
  },
  {
    "id": 16,
    "text": "Matale"
  },
  {
    "id": 20,
    "text": "NuwaraEliya"
  }
]
```

---

### **GET All Cities**

```jsx
https://portal.transexpress.lk/api/cities?district_id=8
```

Depicts all the cities available in each respective district.

**HEADERS**

---

**Accept**                            application/json

**PARAMS**

---

**district_id**                       8

Example request (success)

```jsx
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://portal.transexpress.lk/api/cities?district_id=8',
  headers: { 
    'Accept': 'application/json'
  }
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
[
  {
    "id": 519,
    "text": "Ambalantota"
  },
  {
    "id": 520,
    "text": "Angunakolapelessa"
  },
  {
    "id": 521,
    "text": "Bandagiriya Colony"
  },
  {
    "id": 522,
    "text": "Barawakumbuka"
  },
  {
    "id": 523,
    "text": "Beliatta"
  },
  {
    "id": 524,
    "text": "Beragama"
  }
]
```