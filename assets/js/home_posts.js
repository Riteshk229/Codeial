{
    
    // method for submitting the form data for new post using AJAX 
    let createPost = function(){
        
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            // console.log(data);
            $.ajax({
                type: "post",
                url : "/post/create",
                data : newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDOM(data.data.post);
                    $(`#post-container`).prepend(newPost);
                },
                error : function(error){
                    console.log(error.reponseText);
                }
            });
        });
    };
    
    // method to create a post in DOM
    
    let newPostDOM = function(post){
        return $(
            `<div class="post-list" id="post-${post._id}">
                <p>
                    ${post.content}
                    <small>
                        <a class="delete-btn" href="/post/destroy/ ${post.id}"> close </a>
                    </small>
                    <br>
                    <small> 
                        ${post.user.name}
                    </small>
                </p> 

                <div class="post-comment">

                    <form action="/comment/create" method="post">
                        <input type="text" name="content" placeholder="Type here to Add comment">
                        <input type="hidden" name="post" value="${post._id}">
                        <button type="submit"> Add Comment</button>
                    </form>

                    <div class="post-comment-by-users">
                        <div id="post-comment-by-users- ${post._id}">
                        </div>
                    </div>  
                </div>                   
            </div>`);
        };
        
        createPost();
    }