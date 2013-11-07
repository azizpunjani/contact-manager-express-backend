Contact-Manager-Express-Backend
===============================

A contact manager backend, built with Express and Monk(a thin layer wrapping native mongodb). 

###Routes
The app has the following RESTful routes. 

HTTP Verb | Path | Description
---  | --- | ---
GET  | /contacts | Get a list of all contacts
GET  | /contacts/id | Get a specific contact by id
POST | /contacts | Create a new contact
PUT | /contacts/id | Update an existing contact
DELETE | /contacts/id | Delete a specific contact

###Setup
Install nodemon globally
    npm install -g nodemon

Install the required project dependencies
    npm install

###Getting sample data into mongo
To get some sample data into mongodb for testing purposes, this repo has a sampleDb directory which can be imported. To import the data
simply run the following command.

    mongorestore sampleDb --db contactManager



