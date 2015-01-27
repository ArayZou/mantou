module.exports = function(req, res) {
    var groupName = req.params.groupname;
    res.render('group', {
        title: 'group-'+groupName,
        groupname: groupName
    });
}
