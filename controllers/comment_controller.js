const Comment = require('../models/comments');
const Post = require('../models/post');


module.exports.create = function(req,res){

    Post.findById(req.body.post).then(function(post,err){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            }).then(function(comment,err){
                console.log(comment);

                if(err){
                    console.log("Error is Commenting");
                    return;
                }

                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            });
        }
    });

};

module.exports.destroy = function(req,res){

    console.log(req.params)

    Comment.findById(req.params.id).then(function(comment,err){
        if(err){
            console.log("Error in deleting the comment",err);
        }

        if(comment.user == req.user.id || req.user.pid == Post.findById(req.user.id).user){

            let postID = comment.post;
            comment.deleteOne();

            Post.findByIdAndUpdate(postID , {$pull : {comment : req.params.id}}).then(function(post,err){
                if(err){
                    console.log(post.content+ "    " + comment.content);
                    console.log("Error in deleting the comment from the array in post",err);
                }

                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    });
};