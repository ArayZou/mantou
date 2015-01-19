var express = require('express'),
    site = require('./controllers/site'),
    user = require('./controllers/user'),
    router = express.Router();

// index
router.get('/', site.index);
// user
router.get('/user', user.index);

module.exports = router;
