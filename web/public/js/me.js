require(['jquery', 'handlebars', 'bootstrap','../js/common'], function($, Handlebars, Bootstrap) {
    var initEvt = function() {

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

        $('#me-setting').click(function() {
            var tpl = Handlebars.compile($('#setting-panel-tpl').html());
            $('#me-page').append(tpl());
            //TODO:unbind when remove panel
            settingEvt();

            $('#setting-tabs li:first-child').click();
        });

        $('#me-page').delegate('#close-setting', 'click', function() {
            $(this).closest('.panel').remove();
        });
    }, settingEvt = function() {
        $('#setting-tabs').delegate('li', 'click', function() {
            var tab, tpl;
            $('#setting-tabs li').removeClass('active');
            $(this).addClass('active');

            if ($(this).hasClass('set-photo')) {
                tab = 'photo';
            } else if ($(this).hasClass('set-info')) {
                tab = 'info';
            } else if ($(this).hasClass('set-psw')) {
                tab = 'psw';
            }
            tpl = Handlebars.compile($('#set-' + tab + '-tpl').html());
            $('#setting-tab-content').html(tpl());//TODO:send in res to render tpl
        }).delegate('#repwd-button', 'click', function() {
            $.ajax({
                type: 'POST',
                url: '/user/repwd',
                data: {
                    oldPwd: $('#old-pwd').val(),
                    newPwd: $('#new-pwd').val()
                }
            }).then(function(data) {
                if (data.success) {
                    alert('success');
                } else {
                    alert(data.err);
                }
            });
        });
    };
    $(function() {
        initEvt();

        //init Tab active
        $('#nav-tabs li:first-child').click();
    });
});
