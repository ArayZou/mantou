var mongoose = require('mongoose'),
    Group;
require('../models/group');
Group = mongoose.model('Group');
module.exports = function(req, res) {
    res.render('myfollows', {
        js:[{js:'myfollows'}],
        title: 'myfollows'
    });
}
