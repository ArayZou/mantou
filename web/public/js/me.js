require(['../js/conf', '../js/common'], function(conf, comm) {
    require(['jquery', 'bootstrap'], function($) {
        $(function() {
            comm.comEvt();//init common binding/setting
            $('#nav-tabs').delegate('li', 'click', function() {
                $('#nav-tabs li').removeClass('active');
                $(this).addClass('active');
            });
        })
    });
});
