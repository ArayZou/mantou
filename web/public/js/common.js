require(['js/conf'], function() {
    require(['jquery'], function($) {
        $(function(){
            $('body').on('click','#userlogout',function(){
                $.post('/user/logout',function(){
                    window.location.href = '/';
                });
            });
        });
    });
});
