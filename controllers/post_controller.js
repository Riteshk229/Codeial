const Post = require('../models/post');

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