/**
 * 需要登录
 */
module.exports = function(req, res , next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
};
