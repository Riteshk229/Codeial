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