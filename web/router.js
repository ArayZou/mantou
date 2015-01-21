var express = require('express'),
    site = require('./controllers/site'),
    user = require('./controllers/user'),
    json = require('./controllers/json'),
    router = express.Router();

// index
router.get('/', site.index);
// user
router.get('/user', user.index);
// json
router.get('/json/:jsonfunc', json.index);

module.exports = router;
