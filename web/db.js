var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mantou');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('mongodb open');
});

var Users = new mongoose.Schema({
    user_id    : String,
    password   : String,
    email      : String
});
mongoose.model( 'Users', Users );
