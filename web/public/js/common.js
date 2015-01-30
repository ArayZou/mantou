define(['jquery'], function($) {
    $('#userLogout').click(function() {
        $.post('/user/logout',function(){
            window.location.href = '/';
        });
    });
});
