# backend

[Link to PVD](https://docs.google.com/document/d/1KEZ06Q_yHd8nVpVHYToFzfP6P2m8ZGHwvp02NlnUTfU/edit#)


/-------------------/ AUTH ROUTES /---------------/

# **Register a user** #
_method url_ https://silent-auction-2.herokuapp.com/auth/users/register

_http method_: **[POST]**

#### Headers 

|      name             |   type    |  required  |          decription         |
|-----------------------|-----------|------------|-----------------------------|
|    `Content-type`       String      Yes            Must be application/json  |

#### Body

|    name         |     type     |   required  |      description           |   
|-----------------|--------------|-------------|----------------------------|
|`username`       |   String     |      Yes    |     Must be unique         |
|`password`       |   String     |      Yes    |                            |
|`email`          |   String     |      Yes    |     Must be unique         | 
|`firstName`      |   String     |      Yes    |                            | 
|`lastName`       |   String     |      Yes    |                            | 
|`userType`       |   Integer    |      Yes    |     1-Seller, 2-Bidder     | 

#### Example
```
    {     
	"username": "Devin1",
	"password": "123456",
	"email": "devin1@gmail.com",
	"firstName": "Devin",
	"lastName": "Ong",
	"userType": 1
    }
```

####Response

#### 201 (created)

#### Example Response
```
{
  "username": "Devin1",
  "email": "devin1@gmail.com",
  "firstName": "Devin",
  "lastName": "Ong",
  "userType": 1
}
```

#### 428 (Precondition Failed)
```
{
  "message": "Missing required fields."
}
```

#### 401 (Unauthorized)
```
{
  "errorMessage": "Username already taken."
}
```
*or*
```
{
  "errorMessage": "Email already taken."
}
```

#### 500 (Server error)
```
{
  "message": "User could not be added.",
  "error": {
    "errno": 19,
    "code": "SQLITE_CONSTRAINT"
  }
}
```
`SQLITE_CONSTRAINT` usually indicates that one of the fields is required or has to be unique.


-------------------------------------------------------------
-------------------------------------------------------------


# **User Log in** #
_method url_ https://silent-auction-2.herokuapp.com/auth/users/login

_http method_: **[POST]**

#### Headers 

|      name             |   type    |  required  |          decription         |
|-----------------------|-----------|------------|-----------------------------|
|    `Content-type`       String      Yes            Must be application/json  |

#### Body

|name             |     type     |   required  |      description           |   
|-----------------|--------------|-------------|----------------------------|
|`username`       |   String     |      Yes    |     Must be unique         |
|`password`       |   String     |      Yes    |                            |

#### Example
```
{
	"username": "Devin",
	"password": "123456"
}
```
#### Response

#### 200 (Ok)

#### Example Response
```
{
  "user": "Devin",
  "message": "You've logged in."
}
```
##### 428 (Preconditon Failed)

```
  {
    message: "Missing username or password"
  }
```

#### 401 (Unauthorized)
```
{
  "message": "Invalid credentials"
}
```


-------------------------------------------------------------
-------------------------------------------------------------



# **GET USER BY ID** #
_method url_ https://silent-auction-2.herokuapp.com/auth/user/:id

_http method_: **[GET]**

#### Response

#### 200 (Ok)

#### Example Response
```
{
  "id": 2,
  "username": "Devin2",
  "email": "devin2@gmail.com",
  "firstName": "Devin",
  "lastName": "Ong",
  "userType": 1
}
```

#### 401 (Unauthorized)
```
{
  "message": "Please log in."
}

/-------------------/ AUCTION ROUTES /-----------------/

# **GET ALL AUCTIONS** #
_method url_ https://silent-auction-2.herokuapp.com/auth/users/auction/all

_http method_: **[GET]**

#### 200 (OK)

#### Example Response
{
  
}