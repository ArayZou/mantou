//上传图片接口
// config the uploader
var options = {
    tmpDir:  __dirname + '/../public/uploads/',
    uploadDir: __dirname + '/../public/uploads/',
    uploadUrl:  '/uploads/',
    maxPostSize: 1100000, // 11 GB
    minFileSize:  1,
    maxFileSize:  51200000, // 5mb
    acceptFileTypes:  /.+/i,
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
exports.uploadimg = function (req, res) {
    uploader.post(req, res, function (obj) {
        res.send(JSON.stringify(obj));
    });
}


