var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new mongoose.Schema({
    userid     : String,
    password   : String,
    email      : String
});

mongoose.model( 'User', User );
