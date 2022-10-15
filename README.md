# PARITI TECHNICAL TEST ~ Vendor Machine

## API Endpoints

| EndPoint                      | Functionality       |
| ----------------------------- | ------------------- |
| POST /api/product/buys        | Buy Product         |
| POST /api/product/setprice    | Set Product price   |
| POST /api/coins/addCoins      | Add coins           |
| POST /api/coins/updateCoins   | Update coins        |
| POST /api/maintainer/register | Register maintainer |
| POST /api/maintainer/login    | Maintainer Login    |
| GET /api/maintainer/getAll    | Get all maintainers |

## The Technology

-   Nodejs
-   TypeScript
-   Express
-   jwt
-   Jest

## The Architecture

The application is built upon the Controller-Service-Repository Event Microservice Architecture
![ScreenShot](/screenshots/screenshot1.png)

## Flow chat:

![ScreenShot](/screenshots/screenshot2.png)

# How to run the application

You will need to install the latest version of

-   nodejs
-   postman

Step 1:
Clone the application to your machine:
`git clone https://github.com/ClintPy/Pariti-Technical-Test.git`
Step 2:
CD into the repository
Step 3:
Run this command to bootstrap the up:
`npm install`
Step4:
Run `npm run dev` to run the application

### Start by loading products to the vendor machine

Register as a new maintainer:
`POST /api/maintainer/register`

Payload:

```
{
    "username": "admin"
    "password": "admin123"
}
```

Login to get the token
`POST /api/maintainer/login`

Payload

```
{
    "username": "admin"
    "password": "admin123"
}
```

Set Product Price:
`POST /api/product/setprice`
NOTE: You can only set the price one product at a time
payload

```
{
    "slot": "1",
    "price": 50
}
{
    "slot": "2",
    "price": 10
}
{
    "slot": "3",
    "price": 25
}
{
    "slot": "4",
    "price": 50
}
{
    "slot": "5",
    "price": 100
}
```

Set Product Quantity
`POST /api/product/setprice `
NOTE: You can only set product quantity one item at a time

Payload

```
{
    "slot": "1",
    "quantity": 50
}
{
    "slot": "2",
    "quantity": 10
}
{
    "slot": "3",
    "quantity": 25
}
{
    "slot": "4",
    "quantity": 50
}
{
    "slot": "5",
    "quantity": 100
}
```

Add COINS to the vendor machine
`POST /api/coins/addCoins`

Payload

```
{
    type: 50,
    quantity: 200
}
```

Buy Product
`POST /api/product/buys`
Payload:

```
{
    "slot": "1",
    "amount": 25,
    "quantity": 1
}
```
