require([
    'jquery',
    'handlebars',
    'bootstrap',
    '/js/jquery.ui.widget.js',
    '/js/jquery.iframe-transport.js',
    '/js/jquery.fileupload.js',
    '/js/cropper.min.js',
    '/js/common.js'], function($, Handlebars, Bootstrap) {
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
    },
    settingEvt = function() {
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
            if ($(this).hasClass('set-photo')) {
                meUpload();
            }
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
        }).delegate('#info-button', 'click', function() {
            $.ajax({
                type: 'POST',
                url: '/user/info',
                data: {
                    realName: $('#user-real-name').val(),
                    weibo: $('#user-weibo').val(),
                    qq: $('#user-qq').val(),
                    sign: $('#user-sign').val()
                }
            }).then(function(data) {
                if (data.success) {
                    alert('success');
                } else {
                    alert(data.err);
                }
            })
        }).on('click','#userimg_submit',function(){
            //上传头像
            var imgSrc = $(".cropper > img").attr('src');
            var imgData = $(".cropper > img").cropper('getData');
            $.ajax({
                url: 'http://localhost:3000/user/saveuserimg',
                data: {
                    imgSrc:imgSrc,
                    imgX:imgData.x,
                    imgY:imgData.y,
                    imgWidth: imgData.width,
                    imgHeight: imgData.height
                },
                type: 'POST',
                success:function(data){
                    if(data.success==1){
                        window.location.href = window.location.href;
                    }else{
                        alert('保存失败');
                    }
                },
                error: function(data){
                    alert('保存失败')
                }
            });
        });;
    },
    meUpload = function(){
        //上传图片
        $('#fileupload').fileupload({
            url: 'http://localhost:3000/json/uploadimg',
            type: 'POST',
            dataType: 'json',
            acceptFileTypes:  /(\.|\/)(gif|jpe?g|png)$/i,
            maxNumberOfFiles: 1,
            submit: function(){
                $(".cropper > img").cropper('destroy');
            },
            success: function(data){
                $(".cropper > img").attr('src',data.files[0].url);
                $(".cropper > img").cropper({
                    aspectRatio: 1,
                    minWidth: 300,
                    minHeight: 300,
                    maxWidth: 3000,
                    maxHeight: 3000,
                    preview:$('.cropper_preview'),
                    done: function(data) {
                        // Output the result data for cropping image.
                    }
                });
            }
        });
    };
    $(function() {
        initEvt();

        //init Tab active
        $('#nav-tabs li:first-child').click();
    });
});
