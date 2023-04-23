const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create =  function(req,res){
    Post.create ({
        content : req.body.content,
        user : req.user._id
    }).then(function(post,err){
        if(err){
            console.log("Error in creating a Post");
            return;
        }

        return res.redirect('back');
    });

};

module.exports.destroy = function(req,res){

    Post.findById(req.params.id).then(function(post,err){

        // .id is used to convert objects into strings
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post : req.params.id}).then(function(comment,err){
                if(err){
                    console.log('Error in deleting the comment')
                    return;
                }

                return res.redirect('back');
            });
        }
        else{
                
            return res.redirect('back');
        }
    });
};