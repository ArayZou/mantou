$(function() {
    var $panel = $('#login-signup-panel');
    $('#signup-btn, #login-btn').click(function(e) {
        var isLogin = false;
        if (e.currentTarget.id === 'login-btn') {
            isLogin = true;
        }
        genLoginSignup(isLogin);
    });
});
