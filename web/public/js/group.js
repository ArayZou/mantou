require([
    'jquery',
    'bootstrap',
    '/js/marked.js',
    '/js/editor.js',
    '/js/common.js'
    ],
function(
    $,
    bootstrap,
    marked
) {
    $(function() {
        if($('#post_content').length>0){
            var postEditor = new Editor({
                element: document.getElementById('post_content')
            });
            postEditor.render();
        }
        //发文章
        $('body').on('click','#postsubmit',function(){
            var postTitle = $('#post_title').val(),
                postContent = postEditor.codemirror.getValue(),
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
        if($('#reply_content').length>0){
            var replyEditor = new Editor({
                element: document.getElementById('reply_content')
            });
            replyEditor.render();
        }
        $('#reply-model').on('show.bs.modal', function (event) {
            var $button = $(event.relatedTarget);
            // var recipient = $button.data('whatever');

            var $this = $(this)
            // $this.find('.modal-title').text('New message to ' + recipient)
            // $this.find('.modal-body input').val(recipient)
        })
        //跟帖
        $('body').on('click','#replysubmit',function(){
            var articleid = $('#articleid').val(),
                replyContent = replyEditor.codemirror.getValue();
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

