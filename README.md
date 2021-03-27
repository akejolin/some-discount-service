# some-discount-service
This service will handle discount codes. It will create codes connected to brand (and to users when codes are used).

## Getting started

```js
npm i
npm run start

// http://localhost:8000/
```

##### Other npm commands

```js
npm run test // unit testing
npm run lint // lint all code within js in ./src folder
```

## API endpoints


### POST /generate-codes
Generate discount codes

**Parameters**

| Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `brand` | yes | string  | value needs to be a brand that exist in the db |
| `amount` | yes | number  | Amount of how many codes to be generated

**Response**

```json
[
  {
    "id": 1,
    "code": "4b5d2f34678818fd57a377f4ed1c4bb8",
    "brand": "some awesome brand",
    "brandId": 0,
    "desc": "20% off",
    "rate": 0.2,
  },
]
```


Example: [http://localhost:8000/generate-codes?brand=blocket&amount=2](http://localhost:8000/generate-codes?brand=blocket&amount=2)


### PUT /get-code
Generate discount codes

**Parameters**

| Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code` | yes | string  | the code to be used |
| `userId` | yes | number  | The user who should be using the code

**Response**

```json
{
  "status": "valid",
  "code": "919703cb272c9835ff7baeadec9beea9",
  "discount": 0.2,
  "message": "Congratulation, you will get a discount of 20% on the total price."

}
```


Example: [http://localhost:8000/get-code?code=919703cb272c9835ff7baeadec9beea9&user_id=0](http://localhost:8000/get-code?code=919703cb272c9835ff7baeadec9beea9&user_id=0)
