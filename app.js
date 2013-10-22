
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

var db = require('monk')('localhost/contacts'),
    users = db.get('users'),
    contacts = require('./contacts'); 

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//Get users, with optional search query term
app.get('/users', function(req, res) {
    var name = req.query.name && req.query.name.split(' ') || [], 
        query = {};  
    
    if (name.length === 2) {
        query['name.first'] = new RegExp('^' + name[0], 'i'); 
        query['name.last'] = new RegExp('^' + name[1], 'i');
    } else if(name.length === 1) {
        query.$or = []; 
        query.$or.push({ 'name.first': new RegExp('^' + name[0], 'i') });
        query.$or.push({ 'name.last': new RegExp('^' + name[0], 'i') });
    }

    users.find(query, function(err, docs){
        res.send(docs);       
    });
});

//Get a user by id
app.get('/users/:id', function(req, res) {
    var id = req.params.id; 
    users.findById(id, function(err, doc) {
        if (!doc) {
            res.send({ success: false, error: 'Unable to find user'}); 
        } else {
            res.send(doc);  
        }
    }); 
});

//Update a user
app.put('/users/:id', function(req, res) {
    users.update(req.params.id, { $set: req.body }, function(err, success){
        if (success) {
            res.send({ success: true });
        } else {
            res.send({ success: false, error: 'Unable to update record'});
        }
    });
});

//Create a new user
app.post('/users', function(req, res) {
    users.insert(req.body, function(err, record){
        if (record) {
           res.send({ success: true, record: record });
        } else {
           res.send({ success: false, error: 'Unable to insert record'});
        }
    });
});

//Delete a user
app.del('/users/:id', function(req, res) {
    users.remove({ _id: req.params.id }, function(err, success){
        if (success) {
           res.send({ success: true });
        } else {
           res.send({ success: false });
        }
    });
});

//Index page
app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, 'public/app/index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
