require([
    'jquery',
    'handlebars',
    'bootstrap',
    '/js/common.js'], function($, Handlebars, Bootstrap) {
    var initEvt = function() {
        $('#msg-tabs').delegate('li', 'click', function() {
            var tab;
            $('#msg-tabs li').removeClass('active');
            $(this).addClass('active');

            if ($(this).hasClass('at-me')) {
                tab = 'atme';
                $('#send-msg').addClass('hidden');
            } else if ($(this).hasClass('pri-msg')) {
                tab = 'primsg';
                $('#send-msg').removeClass('hidden');
            }

            $.ajax({
                type: 'GET',
                url: '/msg/' + tab
            }).then(function(data) {
                var res, tpl;
                if (data.success) {
                    res = data.data;
                    tpl = Handlebars.compile($('#' + (tab === 'atme' ? 'at-me' : 'pri-msg') + '-tpl').html());
                    $('#msg-tab-content').html(tpl());
                }
            });
        });
    };

    $(function() {
        initEvt();

        $('#msg-tabs li:first-child').click();
    })
});

