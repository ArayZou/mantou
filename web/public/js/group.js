require(['jquery','bootstrap','/js/jquery.ui.widget.js','/js/jquery.iframe-transport.js','/js/jquery.fileupload.js','/js/common.js'], function($,bootstrap) {
    $(function() {
        //发文章
        $('body').on('click','#postsubmit',function(){
            var postTitle = $('#post_title').val(),
                postContent = $('#post_content').val(),
                groupName = $('#group_name').val(),
                userName = $('#user_name').val();
            $.ajax({
                url: 'http://localhost:3000/post/write',
                data: {
                    postTitle:postTitle,
                    postContent:postContent,
                    groupName:groupName,
                    userName:userName
                },
                type: 'POST',
                success: function(data){
                    if(data.message){
                        alert('存在相同名称文章');
                    }else{
                        window.location.href = '/group/'+data.groupname+'/'+data.postId;
                    }
                },
                error: function(data){
                    console.log(data)
                }
            })
        });
        //关注群组
        $('body').on('click','#groupfollow_btn',function(){
            var $this = $(this);
            var groupName = $this.attr('data-groupname');
            $.ajax({
                url: 'http://localhost:3000/user/followgroup',
                data: {
                    groupName:groupName
                },
                type: 'POST',
                success: function(data){
                    if(data.success===1){
                        $this.html('已关注');
                        window.location.href = window.location.href;
                    }else if(data.success === 2){
                        $this.html('关注');
                        window.location.href = window.location.href;
                    }else{
                        alert('关注失败')
                    }
                },
                error: function(data){
                    console.log(data)
                    alert('关注失败')
                }
            });
        });
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
            done: function(data){
                console.log(data)
            }
        });
    });
});

