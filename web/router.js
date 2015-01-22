var express = require('express'),
    site = require('./controllers/site'),
    user = require('./controllers/user'),
    json = require('./controllers/json'),
    getimg = require('./controllers/getimg'),
    router = express.Router();

// index
router.get('/', site.index);
// home
router.get('/home', site.home);
// user
router.get('/user', user.index);
// json
router.get('/json/:jsonfunc', json.index);
// getimg img-placehold
router.get('/getimg/:size', getimg.index);

module.exports = router;
