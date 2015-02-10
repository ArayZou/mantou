var mongoose = require('mongoose'),
    Group;
require('../models/group');
Group = mongoose.model('Group');
module.exports = function(req, res) {
    Group.find(function(err, group) {
        if (err) {
            console.log(err);
        }

        groupArray = group;

        res.render('myfollows', {
            js:[{js:'myfollows'}],
            title: 'myfollows',
            groupArray: groupArray
        });
    });
}
