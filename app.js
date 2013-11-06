
/**
 * Module dependencies.
 */

var express = require('express')
  , contacts = require('./routes/contacts')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//Get contacts, with optional search query term name=first last
app.get('/contacts', contacts.getAll);

//Get a user by id
app.get('/contacts/:id', contacts.get);

//Update a user
app.put('/contacts/:id', contacts.put);

//Create a new user
app.post('/contacts', contacts.post);

//Delete a user
app.del('/contacts/:id', contacts.delete);

//Index page
app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, 'public/index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
