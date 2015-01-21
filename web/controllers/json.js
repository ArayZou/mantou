exports.index = function (req, res, next) {
    //取地址里的json方法
    var funcName = req.params.jsonfunc;
    //从jsonfunc里调用对应方法
    jsonfunc[funcName](res);
}

var models = require('../models');
var User = models.User;

//全局json方法
var jsonfunc = {
    example: function(res){
        User.find(function (err, user) {
            var x = [];
            x = user;
            res.end(String(x));
        });
    }
}

