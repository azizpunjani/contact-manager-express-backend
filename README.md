Contact-Manager-Express-Backend
===============================

A contact manager backend, built with Express and Monk(a thin layer wrapping native mongodb). 

The app has the following RESTful routes. 

HTTP Verb | Path | Description
---  | --- | ---
GET  | /users | Get a list of all users
GET  | /users/id | Get a specific user by id
POST | /users | Create a new user
PUT | /users/id | Update an existing user
DELETE | /users/id | Delete a specific user
