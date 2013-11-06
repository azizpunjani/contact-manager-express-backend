var db = require('monk')('localhost/contactManager'),
    contacts = db.get('contacts');

//Get contacts
exports.getAll = function(req, res){
    contacts.find({}, function(err, docs){
        if (docs) {
            res.send(docs);       
        } else {
            res.send({ success: false, error: 'Unable to find contacts' });
        }
    });
};

//Get specific contact by id
exports.get = function(req, res){
    var id = req.params.id; 
    contacts.findById(id, function(err, doc) {
        if (!doc) {
            res.send({ success: false, error: 'Unable to find contact'}); 
        } else {
            res.send(doc);  
        }
    }); 
};

//Create a contact
exports.post = function(req, res){
    contacts.insert(req.body, function(err, record){
        if (record) {
            res.send(record);
        } else {
            res.send({ success: false, error: 'Unable to insert record'});
        }
    });

};

//Update a contact
exports.put = function(req, res){
    if ( '_id' in req.body) delete req.body._id;
    contacts.update(req.params.id, req.body, function(err, success){
        req.body._id = req.params.id;    
        if (success) {
            res.send(req.body);
        } else {
            res.send({ success: false, error: 'Unable to update record'});
        }
    });
};

//Delete a contact
exports.delete = function(req, res){
    contacts.remove({ _id: req.params.id }, function(err, success){
        if (success) {
           res.send({ success: true });
        } else {
           res.send({ success: false });
        }
    });
};
