// config the uploader
var options = {
    tmpDir:  __dirname + '/../public/uploads/',
    uploadDir: __dirname + '/../public/uploads/',
    uploadUrl:  '/uploads/',
    maxPostSize: 1100000, // 11 GB
    minFileSize:  1,
    maxFileSize:  51200000, // 5mb
    acceptFileTypes:  /\.(gif|jpe?g|png)/i,
    // Files not matched by this regular expression force a download dialog,
    // to prevent executing any scripts in the context of the service domain:
    inlineFileTypes:  /\.(gif|jpe?g|png)/i,
    imageTypes:  /\.(gif|jpe?g|png)/i,
    accessControl: {
        allowOrigin: '*',
        allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
    },
    storage: {
        type: 'local'
    }
};
// init the uploader
var uploader = require('../middlewares/file_upload')(options);
//上传图片接口
exports.uploadimg = function (req, res) {
    uploader.post(req, res, function (obj) {
        res.send(JSON.stringify(obj));
    });
}

// 保存裁切图接口
var fs = require('fs'),
    gm = require('gm'),
    imageMagick = gm.subClass({ imageMagick : true });
exports.savebase64img = function(req, res){
    var imghref = req.body.imghref;
    imageMagick(imghref)
        .resize(150, 150, '!') //加('!')强行把图片缩放成对应尺寸150*150！
        .autoOrient()
        .write(imghref, function(err){
            if (err) {
                console.log(err);
                res.end();
            }
            fs.unlink(imghref, function() {
                return res.end('3');
            });
        });
    // gm('/public/uploads/CfJIiofSX4iKhmup.jpg')
    // .options({imageMagick: true})
    // .write('resize.jpg', function (err) {
    //   if (!err) console.log('done');
    //       res.send({
    //         success:1
    //     });
    // });
    // require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
    //     if(err){
    //         console.log(err);
    //     }
    //     res.send({
    //         success:1
    //     });
    // });
    // res.send({
    //     success:1
    // });
}


