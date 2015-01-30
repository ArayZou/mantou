define(['../js/conf', 'jquery'], function(conf, $) {
    var evtHandlers = function() {
        $('#userLogout').click(function() {
            $.post('/user/logout',function(){
                window.location.href = '/';
            });
        });
    };
    return {
        comEvt: evtHandlers
    };
});