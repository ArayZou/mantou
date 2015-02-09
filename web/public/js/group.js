require(['jquery','bootstrap','/js/common.js'], function($,bootstrap) {
    $(function() {
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
    });
});

