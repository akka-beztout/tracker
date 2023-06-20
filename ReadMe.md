# a CRUD Api using nodeJs, express.js, mongoDB, passport.js(emplimenting some Authentication)
- the api will let you create users stored in mongoDB and log there exercises
- you can delete users and exercises 
- you can filter logs 
- password are stored hashed + salted (using bcryptjs)

# create a new user with username and password  
- [ ] *GET* **/login** should serve the login page
- [x] implement bcryptjs
- [x] *POST* to **/signup** with a form-urlencoded  *username* and *password* will create a new user 
- [x] *POST* to **/signup** with a form-urlencoded  *username* and *password* will store the password hashed and salted
- [x]  respond as json:

```javascript
{
  _id: "5fb5853f734231456ccb3b05",
  username: "fcc_test",
  password: "aidfasdfasdfldfhhlasdf"
}
```
- [x] *POST* to **/login** with a form-urlencoded  *username* and *password* will check if the user existed or not 
#### existed 
```javascript
{
    "username": "fcc_test",
    "id": "5fb5853f734231456ccb3b05"
}

```
#### user do not exist
```javascript
{
    "error": "User Not Found!"
}
```
#### wrong password
```javascript
{
    "error": "Wrong Password"
}
```

- [x]  You can make a GET request to **/users** to get a list of all users.
- [x]  The GET request to **/users** returns an array.
- respond:
```javascript
[
{
  _id: "5fb5853f734231456ccb3b05",
  username: "fcc_test",
}
]
```
# using Authentication 
- [ ] implement passportjs 

## after login
- [x] POST to **/users/:id/** with form-urlencoded *description*, *duration*, and optionally *date*. If no *date* is supplied, the current date will be used will create a log of that exercise for that user
- [x] The response returned from POST **/users/:id** will be the user object with the exercise fields added.
```json
{
  username: "fcc_test",
  description: "test",
  duration: 60,
  date: "Mon Jan 01 1990",
  _id: "5fb5853f734231456ccb3b05"
}
```
- [x] GET **/users/:id/logs** to retrieve a full exercise log of any user.
- [x] GET **/users/:id/logs** returns a user object with a *count* property representing the number of exercises that belong to that user.
- [x] Each item in the log array that is returned from GET **/users/:id/logs** is an object that should have a *description*, *duration*, and *date* properties.
- [x] The *description* property of any object in the log array that is returned from GET **/users/:id/logs** should be a string.
- [x] The *duration* property of any object in the log array that is returned from GET **/users/:id/logs** should be a number.
- [x] The *date* property of any object in the log array that is returned from GET **/users/:id/logs** should be a string.

#### logs filter
- [x] You can add **from**, **to** and **limit** parameters to a **GET** **/users/:id/logs** request to retrieve part of the log of any user. *from* and *to* are dates in *yyyy-mm-dd* format. *limit* is an integer of how many logs to send back.
- example: get request to **/users/:id/logs?from=2019-01-01&to=2023-01-01&limit=3 => will give you 3 exercises from 2019=> 2023

```json
Log:

{
  username: "fcc_test",
  count: 1,
  _id: "5fb5853f734231456ccb3b05",
  log: [{
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
  }]
}
```
# update user
- [x] patch request to **users/:id** with form-urlencoded (username oldPassword newPassword) will update the password 
- [x] patch request to **users/:id** with form-urlencoded (username oldPassword newUsername) will update the username 
```json
[
    {
        "_id": "6491f1187dcd39e579bb0434",
        "username": "akka"
    },
    {
        "_id": "6491f1827dcd39e579bb043a",
        "username": "imadddd"
    }
]
```
### wrong username when sending the patch request to **users/:id**
```json
User Not Found!
```
### worong password when sending the patch reqest to **users/:id**
```json
Wrong Password!
```

#### udpate username 
```json
{
    "_id": "6491f1827dcd39e579bb043a",
    "NewUsername": "imad"
}
```
#### udpate password
```json
new password has been set
```

# delete user
- [x] a DELETE request to **/users/:id** will delete the user with all the exercises he had done 
# update exercise
- [x] a PATCH request to **/exercise/:exerciseId** with form-urlencoded(*description*, *duration*, *date*) will update the exercise 


# delete exercise
- [x] a DELETE request to **/exercise/:exerciseId** will delete that exercise
- [x] a DELETE request to **/exercise** with form-urlencoded(*description*, *duration*, *date*) will delete the exercise
 - a get request to **/users/:id/logs**
 ```javascript
 {
  "username": "toufik",
  "count": 2,
  "_id": "6489f9fbc6ff7df278b6a524",
  "log": [
    {
      "description": "plank",
      "duration": 10,
      "date": "Wed Oct 10 2012"
    },
    {
      "description": "dips",
      "duration": 20,
      "date": "Wed Oct 11 2012"
    }
  ]
}
 ```
## after delettion
 - delete request to **/users/:id/exercise** with form-urlencoded(*description*: dips, *duration*: 20, *date*: 2012-10-11)
 ```javascript
 {
    "delexercise": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```
checking the logs again
```javascript
{
  "username": "toufik",
  "count": 1,
  "_id": "6489f9fbc6ff7df278b6a524",
  "log": [
    {
      "description": "plank",
      "duration": 10,
      "date": "Wed Oct 10 2012"
    }
  ]
}
```



