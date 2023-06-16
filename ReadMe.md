# a CRUD Api using nodeJs, express.js, mongoDB, passport.js(emplimenting some Authentication)
- the api will let you create users stored in mongoDB and log there exercises
- you can delete users and exercises 
- you can filter logs 

# create a new user with username and password  
- [ ] *GET* **/login** should serve the login page
- [x] *POST* to **/login** with a form-data  *username* and *password* will create a new user 
- [ ] multipart/form-data  (username, password)
- [x] urlencoded (username, password)
- [x]  respond as json:

```javascript
{
  _id: "5fb5853f734231456ccb3b05",
  username: "fcc_test",
  password: "asldfhhlasdf"
}
```

- [x]  You can make a GET request to **/api/users** to get a list of all users.
- [x]  The GET request to **/api/users** returns an array.
- respod:
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
- [x] POST to **/api/users/:_id/exercises** with form-data *description*, *duration*, and optionally *date*. If no *date* is supplied, the current date will be used.
- [x] The response returned from POST **/api/users/:_id/exercises** will be the user object with the exercise fields added.
```javascript
{
  username: "fcc_test",
  description: "test",
  duration: 60,
  date: "Mon Jan 01 1990",
  _id: "5fb5853f734231456ccb3b05"
}
```
- [x] GET **/api/users/:_id/logs** to retrieve a full exercise log of any user.
- [x] GET **/api/users/:_id/logs** returns a user object with a *count* property representing the number of exercises that belong to that user.
- [x] Each item in the log array that is returned from GET **/api/users/:_id/logs** is an object that should have a *description*, *duration*, and *date* properties.

- [x] The *description* property of any object in the log array that is returned from GET **/api/users/:_id/logs** should be a string.
- [x] The *duration* property of any object in the log array that is returned from GET **/api/users/:_id/logs** should be a number.
- [x] The *date* property of any object in the log array that is returned from GET **/api/users/:_id/logs** should be a string.
- [x] You can add **from**, **to** and **limit** parameters to a **GET** **/api/users/:_id/logs** request to retrieve part of the log of any user. *from* and *to* are dates in *yyyy-mm-dd* format. *limit* is an integer of how many logs to send back.
- example: get request to **api/users/:_id/logs?from=2019-01-01&to=2023-01-01&limit=3 => will give you 3 exercises from 2019=> 2023

```javascript
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
# update exercise
- [x] a PATCH request to **/api/exercise/:_exerciseId** with form-urlencoded(*description*, *duration*, *date*) will update the exercise 

# delete user
- [x] a DELETE request to **/api/users/:_id** will delete the user with all the exercises he had done 

# delete exercise
- [x] a DELETE request to **/api/users/:_id/exercises** with form-urlencoded(*description*, *duration*, *date*) will delete the exercise
- [x] a DELETE request to **/api/exercise/:_exerciseId** will delete that exercise
 - a get request to **/api/users/:_id/logs**
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
 - delete request to **/api/users/:_id/exercise** with form-urlencoded(*description*: dips, *duration*: 20, *date*: 2012-10-11)
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



