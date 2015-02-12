require(['jquery','bootstrap','/js/common.js'], function($,bootstrap) {
    $(function() {
        $('body').on('click','#creatgroup_submit',function(){
            var groupName = $('#group_name').val(),
                groutHoster = $('#group_hoster').val(),
                groupIntro = $('#group_intro').val();
            $.ajax({
                url: 'http://localhost:3000/group/creatgroup',
                data: {
                    groupName:groupName,
                    groupIntro:groupIntro
                },
                type: 'POST',
                success: function(data){
                    if(data.message){
                        alert('存在相同名称文章');
                    }else{
                        window.location.href = '/group/'+data.groupname;
                    }
                },
                error: function(data){
                    console.log(data)
                }
            })
        });
    });
});

