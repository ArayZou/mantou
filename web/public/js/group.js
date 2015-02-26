require([
    'jquery',
    'bootstrap',
    '/js/common.js'
    ],
function(
    $,
    bootstrap
) {
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
        //跟帖
        $('body').on('click','#replysubmit',function(){
            var articleid = $('#articleid').val(),
                replyContent = $('#reply_content').val();
            $.ajax({
                url: 'http://localhost:3000/post/reply',
                data: {
                    articleid:articleid,
                    replyContent:replyContent
                },
                type: 'POST',
                success: function(data){
                    if(data.success){
                        window.location.href = window.location.href;
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
    });
});

