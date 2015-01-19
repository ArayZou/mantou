$(function() {
    var $panel = $('#login-signup-panel');
    $('#signup-btn,#login-btn').click(function(e) {
        $panel.find('.panel-title').text(e.currentTarget.innerText);
        $panel.show();
    });
});