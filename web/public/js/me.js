require(['../js/conf', '../js/common'], function(conf, comm) {
    require(['jquery', 'handlebars', 'bootstrap'], function($, Handlebars, Bootstrap) {
        $(function() {
            comm.comEvt();//init common binding/setting

            $('#nav-tabs').delegate('li', 'click', function() {
                var tab;
                $('#nav-tabs li').removeClass('active');
                $(this).addClass('active');

                if ($(this).hasClass('my-col')) {
                    tab = 'collect';
                } else if ($(this).hasClass('my-pub')) {
                    tab = 'pub';
                }

                $.ajax({
                    type: 'GET',
                    url: '/me/' + tab,
                }).then(function(data) {
                    var res, tpl;
                    if (data.success) {
                        res = data.data;
                        tpl = Handlebars.compile($('#my-' + tab + '-tpl').html());
                        $('#tab-content').html(tpl());//TODO:send in res to render tpl
                    }
                });
            });

            //init Tab active
            $('#nav-tabs li:first-child').click();
        });
    });
});
