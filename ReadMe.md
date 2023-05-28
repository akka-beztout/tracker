#### this app is like the one we did on [freecodecamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker) but im trtying to add stuff to it as i learn


# create a new user with username and password  
- [ ] *GET* **/login** should serve the login page
- [x] *POST* to **/login** with a form-data  *username* and *password* will create a new user 
- [ ] multipart/form-data  (username, password)
- [x] urlencoded (username, password)
- [x]  respod as json:
``` bash
{
  _id: "5fb5853f734231456ccb3b05",
  username: "fcc_test",
  password: "asldfhhlasdf"
}
```

- [x]  You can make a *GET* request to **/api/users** to get a list of all users.
- [x]  The GET request to /api/users returns an array.
- respod:
``` bash
[
{
  _id: "5fb5853f734231456ccb3b05",
  username: "fcc_test",
}
]
```
## after login
- [ ] POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
- [ ] The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
```bash
{
  username: "fcc_test",
  description: "test",
  duration: 60,
  date: "Mon Jan 01 1990",
  _id: "5fb5853f734231456ccb3b05"
}
```
- [ ] GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
- [ ] request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.
- [ ] GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.
- [ ] Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.
- [ ] The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.
- [ ] The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.
- [ ] The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.
- [ ] You can add **from**, **to** and **limit** parameters to a **GET** **/api/users/:_id/logs** request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.

# OAuth
- [ ] implement OAuth in your loging page



