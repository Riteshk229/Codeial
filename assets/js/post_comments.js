import {NotyS, NotyE} from './noty.js';
{
    // method to create comment by AJAX using submitted form data
    let createComment = function(){

        let newCommentForm = $('#new-comment-form');

        // console.log(newCommentForm.serialize());
        newCommentForm.submit(function(e){
            console.log(newCommentForm.serialize());
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: newCommentForm.serialize(),
                success:function(data){
                    // console.log(data);
                    let newComment = newCommentDOM(data.data.comment,data.data.post._id,data.data.user);
                    $(`#post-comment-by-users-${data.data.post._id}`).prepend(newComment);
                    deleteComment($(' .delete-comment-btn', newCommentDOM));
                    // console.log(data.data.comment._id);
                    NotyS("Comment Added by AJAX");
                }, error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    // method to create comment in DOM
    let newCommentDOM = function(comment,post,user){
        return $(` 
        <div class = 'comments' id="comment-${comment._id}">
            <p>
                ${comment.content}

                <small>
                    <a class = 'delete-comment-btn' href="/comment/destroy/${comment._id}/${post}"> 
                        close
                    </a>
                </small>
                <br>
                <small>
                    ${user}
                </small>
            </p>
        </div>`);
    };

    // method to delete comments via AJAX
    let deleteComment = function(deleteLink){
        // const myTimeout = setTimeout("Hello", 15000);
        $(deleteLink).click(function(e){
            console.log(1);
            e.preventDefault();
            console.log(2);
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data.data.comment);
                    $(`#comment-${data.data.comment}`).remove();
                    NotyS("Comment Deleted via AJAX");
                },error : function(err){
                    console.log(err.responseText)
                }
            });
        })
    };

    createComment();
}