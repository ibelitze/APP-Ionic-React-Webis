## Hubspot

### Create Contact

```http
  POST https://api.brevo.com/v3/contacts
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. contact email |
| `emailBlacklisted` | `bool` | **Required**.|
| `smsBlacklisted` | `bool` | **Required**.|
| `listIds` | `Array` | **Required**.|
| `updateEnabled` | `bool` | **Required**.|
| `smtpBlacklistSender` | `array` | **Required**.|

### Create Company

```http
  POST https://xxxxxxxxxxxxx/api/SendEmailController/HubspotCreateCompanieService
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Api Key |
| `name` | `string` | **Required**. Company Name|

### Linky Contact With Company 

```http
  POST https://xxxxxxxxxxxxx/api/SendEmailController/HubspotLinkCompanyWithContactService
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Api Key |
| `contactId` | `string` | **Required**. Contact Id|
| `companyId` | `string` | **Required**. Company Id|

### Delete Contact 

```http
  POST https://xxxxxxxxxxxx/api/SendEmailController/HubspotDeleteAContact
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Api Key |
| `email` | `string` | **Required**. Contact Email|


### Delete Company 

```http
  POST https://xxxxxxxxxxxx/api/SendEmailController/HubspotDeleteACompany
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Api Key |
| `id` | `string` | **Required**. Company Id|



