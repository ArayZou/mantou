require(['js/conf'], function() {
    require(['jquery', 'underscore', 'bootstrap'], function($, _) {
        console.log('loaded')
        $(function() {
            $('#nav-tabs').delegate('li', 'click', function() {
                $('#nav-tabs li').removeClass('active');
                $(this).addClass('active');
            })
        })
    })
});
