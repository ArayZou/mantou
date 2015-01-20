function genLoginSignup(isLogin) {
    var sHeight = document.documentElement.scrollHeight,
        sWdith = document.documentElement.scrollWidth,
        wHeight = document.documentElement.clientHeight,
        wWidth = document.documentElement.clientWidth,
        template, login, mask, panel, pHeight, pWidth;
    template = Handlebars.compile($('#login-signup-tpl').html());
    $('body').append(template({isLogin: isLogin}));

    mask = document.getElementsByClassName('mask')[0];
    mask.style.height = sHeight + 'px';
    mask.style.width = sWdith + 'px';

    panel = document.getElementsByClassName('login-signup')[0];
    pHeight = panel.offsetHeight;
    pWidth = panel.offsetWidth;
    panel.style.left = (sWdith - pWidth) / 2 + 'px';
    panel.style.top = (sHeight - pHeight) / 2 + 'px';
    $('#login-signup-panel .close').click(function() {
        document.body.removeChild(mask);
        document.body.removeChild(panel);
    });
}
