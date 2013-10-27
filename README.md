Contact-Manager-Express-Backend
===============================

A contact manager backend, built with Express and Monk(a thin layer wrapping native mongodb). 

The app has the following RESTful routes. 

HTTP Verb | Path | Description
---  | --- | ---
GET  | /contacts | Get a list of all contacts
GET  | /contacts/id | Get a specific contact by id
POST | /contacts | Create a new contact
PUT | /contacts/id | Update an existing contact
DELETE | /contacts/id | Delete a specific contact


