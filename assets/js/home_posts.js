
function NotyS(notif){
    new Noty({
        theme: 'relax',
        text : notif,
        type: "success",
        layout : "topRight",
        timeout : 1500
    }).show();
};

function NotyE(notif){
    new Noty({
        theme: 'relax',
        text : notif,
        type: "error",
        layout : "topRight",
        timeout : 1500
    }).show();
};

{
    
    // method for submitting the form data for new post using AJAX 
    let createPost = function(){
        
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            console.log(newPostForm);
            $.ajax({
                type: "post",
                url : "/post/create",
                data : newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDOM(data.data.post,data.data.user);
                    $(`#post-container`).prepend(newPost);
                    deletePost($(` .delete-post-btn`,newPost));
                    NotyS("Post Created via AJAX");
                },
                error : function(error){
                    console.log(error.reponseText);
                }
            });
        });
    };
    
    // method to create a post in DOM
    let newPostDOM = function(post,user){
        return $(
            `<div class="post-list" id="post-${post._id}">
                <p>
                    ${post.content}
                    <small>
                        <a class="delete-post-btn" href="/post/destroy/${post._id}"> close </a>
                    </small>
                    <br>
                    <small> 
                        ${user}
                    </small>
                </p> 

                <div class="post-comment">

                    <form action="/comment/create" method="post">
                        <input type="text" name="content" placeholder="Type here to Add comment">
                        <input type="hidden" name="post" value="${post._id}">
                        <button type="submit"> Add Comment</button>
                    </form>

                    <div class="post-comment-by-users">
                        <div id="post-comment-by-users-${post._id}">

                        </div>
                    </div>  
                </div>                   
            </div>`);
        };
        

        // method to delete a post from DOM
        let deletePost = function(deleteLink){
            // console.log(deleteLink);
            $(deleteLink).click(function(e){
                // console.log(deleteLink);
                e.preventDefault();
                console.log("after prevent");
                $.ajax({
                    type: "get",
                    url : $(deleteLink).prop('href'),
                    success: function(data){
                        console.log(data.data.post_id);
                        $(`#post-${data.data.post_id}`).remove();
                        NotyS("Post Deleted via AJAX");
                    }, error : function(error){
                        console.log(error.reponseText);
                    }
                });
            });
        }

        createPost();
    }