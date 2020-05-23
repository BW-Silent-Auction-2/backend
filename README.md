# backend

[Link to PVD](https://docs.google.com/document/d/1KEZ06Q_yHd8nVpVHYToFzfP6P2m8ZGHwvp02NlnUTfU/edit#)


/-------------------/ AUTH ROUTES /---------------/

**Register a user**
_method url_" https://silent-auction-2.herokuapp.com/auth/users/register

_http method_: **[POST]**

####Headers 

|      name             |   type    |  required  |          decription         |
|-----------------------|-----------|------------|-----------------------------|
|    `Content-type`       String      Yes            Must be application/json  |

####Body

|name                  type        required        description

|`username`       |   String     |      Yes    |     Must be unique         |
|`password`       |   String     |      Yes    |                            |
|`email`          |   String     |      Yes    |     Must be unique         | 
|`firstName`      |   String     |      Yes    |                            | 
|`lastName`       |   String     |      Yes    |                            | 
|`userType`       |   Integer    |      Yes    |     1-Seller, 2-Bidder     | 