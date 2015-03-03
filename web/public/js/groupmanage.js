require([
    'jquery',
    'bootstrap',
    '/js/plugins/jquery.ui.widget.js',
    '/js/plugins/jquery.iframe-transport.js',
    '/js/plugins/jquery.fileupload.js',
    '/js/plugins/cropper.min.js',
    '/js/common.js'
    ],
function(
    $,
    bootstrap
) {
    $(function() {
        //修改群组基本资料
        $('body').on('click','#submit_groupinto',function(){
            var $this = $(this);
            var groupName = $('#group_name').val(),
                groupIntro = $('#group_intro').val(),
                groupLink = $('#group_link').val(),
                groupWeixin = $('#group_weixin').val(),
                groupWeibo = $('#group_weibo').val();
            $.ajax({
                url: 'http://localhost:3000/group/editgroupintro',
                data: {
                    groupName:groupName,
                    groupIntro:groupIntro,
                    groupLink:groupLink,
                    groupWeixin:groupWeixin,
                    groupWeibo:groupWeibo
                },
                type: 'POST',
                success: function(data){
                    if(data.success===1){
                        alert('保存成功');
                        window.location.href = window.location.href;
                    }else{
                        alert('保存失败');
                    }
                },
                error: function(data){
                    console.log(data)
                    alert('保存失败');
                }
            });
        });

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

        //上传切图
        $('body').on('click','#cropper_submit',function(){
            var imgSrc = $(".cropper > img").attr('src');
            var imgData = $(".cropper > img").cropper('getData');
            $.ajax({
                url: 'http://localhost:3000/group/savegroupimg',
                data: {
                    groupName: $('#group_name').val(),
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
        });
    });
});

