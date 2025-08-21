# Introduction and login

# **Trans Express**

Overview

The Trans Express API simplifies your shipping operations by seamlessly integrating Trans Express services into your existing systems. Whether it's your website, order entry, or warehouse management, our API streamlines your processes for a more efficient operation.

*Key Features*

- *Shipment*: Create and manage shipments.
- *Tracking*: Monitor shipment status.

*Benefits*

- Optimize and expand your business.
- Easily integrate Trans Express features into your existing system.
- Maintain your team's familiarity with the user interface.

*Developer-Friendly:*

- Single API based on industry standards.
- Designed for fast-paced warehousing and time-sensitive e-commerce.
- Dedicated API environment for testing.

# **Environments**

| [https://dev-transexpress.parallaxtec.com/api](https://dev-transexpress.parallaxtec.com/) | **Staging - for testing perpose** |
| --- | --- |
| [https://portal.transexpress.lk/api](https://portal.transexpress.lk/api) | Production - for live account access |

**Responses:**

Each API endpoint provides both success and error responses.

---

This updated documentation now includes a section on responses for each API endpoint, featuring an example of both success and error responses. It provides users with a clear understanding of what to expect when interacting with your API.

**Testing Shipments:**

You can also verify the functionality of the Trans Express API by adding orders via the API to our staging servers and checking the status. Follow these steps:

- **Add Orders:** Utilize the API to create sample orders and submit them to our staging servers. Make sure to use the API endpoints designed for testing purposes.
- **Login:** Access the following link to log in to our staging servers and verify if the orders have been successfully added: [https://dev-transexpress.parallaxtec.com/](https://dev-transexpress.parallaxtec.com/) .
- **Check Status:** Once logged in, navigate to the shipment status section. Here, you can review the status of the orders you added via the API.

Testing your shipments on our staging servers allows you to ensure that everything is functioning as expected before implementing the API in a live environment.

---

**POST Client Login**

```jsx
https://portal.transexpress.lk/api/login/client
```

**Trans Express API** uses a simple login system based on **email and password** in order to access the client portal after successful sign-ins. It performs authentication and authorization checks to ensure that only authorized clients can access the client portal of the system.

## **Request Payload Objects**

**Login_data** : ***required : Object*** - General Order details

- **E-mail** : ***required : String*** - email address provided by the client during registration.

(provide valid email address)

- **Password** : ***required: String*** - password provided by the client.

### ***For Production Use :**

Client Portal ->My Profile -> Update Account -> API Key as a Bearer Token**

**HEADERS**

---

**Accept**                                                           application/json

**Body**      raw (json)

---

```jsx
{
    "email": "apexhm@gmail.com",
    "password": "12345678"
}
```

**Example Request (Success)**

```jsx
var axios = require('axios');
var data = '{\r\n    "email": "iphonestore8@gmail.com",\r\n    "password": "12345678"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: '{{base_url}}/login/client',
  headers: { 
    'Accept': 'application/json'
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
  "token": "oGEIPQgrUrIzHZP9OZevE9YKc0M1oWx7ZZXA2QjTNwN8ShwFXrHz5hPwdvY9sansrMc0jKtuZR3QK06Y",
  "status": "success"
}
```