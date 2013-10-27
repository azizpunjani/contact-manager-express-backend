Contact-Manager-Express-Backend
===============================

A contact manager backend, built with Express and Monk(a thin layer wrapping native mongodb). 

The app has the following RESTful routes. 

HTTP Verb | Path | Description
---  | --- | ---
GET  | /contacts | Get a list of all users
GET  | /contacts/id | Get a specific user by id
POST | /contacts | Create a new user
PUT | /contacts/id | Update an existing user
DELETE | /contacts/id | Delete a specific user

###TODO
1. Move route logic out of app.js to respective routes directory.
2. Better error handling on retrieval of record.

