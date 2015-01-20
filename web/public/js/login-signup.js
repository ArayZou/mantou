function genLoginSignup(isLogin) {
    var sHeight = document.documentElement.scrollHeight,
        sWdith = document.documentElement.scrollWidth,
        wHeight = document.documentElement.clientHeight,
        wWidth = document.documentElement.clientWidth,
        html, login, mask, panel, pHeight, pWidth;
    // html = Handlebars.compile($('#login-signup-tpl').html());
    // $('body').append(html({isLogin: isLogin}));
    mask = document.getElementsByClassName('mask')[0];
    mask.style.height = sHeight + 'px';
    mask.style.width = sWdith + 'px';

    panel = document.getElementsByClassName('login-signup')[0];
    pHeight = panel.offsetHeight;
    pWidth = panel.offsetWidth;
    panel.style.left = (sWdith - pWidth) / 2 + 'px';
    panel.style.top = (sHeight - pHeight) / 2 + 'px';
}
