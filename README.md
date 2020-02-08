# fancy-to-do
Fancy To-Do List API

```
# Simple-Todo
A simple todo web app for simplify your life.  
Use [NodeJs](https://nodejs.org/en/) as back-end, and [Postgres] as database.

## Base URL
By default, base url is at `http://localhost:3000`  
But you can change it by setting the [environment](## Setting up environment)

## Setting up environment
Make a file called `.env` and fill it with necessary environment such as:
* JWT_SECRET

and put it on server folder.  

# Routes
#### `POST /login`
Route for user login.

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `email type: String` **required**
* `password type: String` **required**

response :
​```js
// success
{
    "token": <token>,
    "username": <username>,
    "email": <email>
}

// error
{
    "errors": [
        "Email or password is wrong"
    ]
}
​```

#### `POST /register`
Route for user register.

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `username type: String` **required**
* `email type: String` **required**
* `password type: String` **required**

response :
​```js
// success
{
    "token": <token>,
    "username": <username>,
    "email": <email>
}

​```
