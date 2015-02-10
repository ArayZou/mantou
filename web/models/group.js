var mongoose = require('mongoose'),
    groupSchema = require('../schemas/group'),
    group = mongoose.model('Group', groupSchema);

module.exports = group;

