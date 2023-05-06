const Comment = require('../models/comments');
const Post = require('../models/post');
const User = require('../models/user');


module.exports.create = async function(req,res){
    try{
        // console.log(req.body.post);
        let post = await Post.findById(req.body.post);
        
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            
            let user = await User.findById(req.user._id);
            
            console.log(comment);
            post.comments.push(comment);
            post.save();
            
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post: post,
                        comment : comment,
                        user: user.name
                    },
                    message:'Comment Added !!'
                });
            }
            
            req.flash("succes","Comment Created");
            return res.redirect('/');
        }
    } catch (err){
        req.flash("error",err);
    }
    
    // Post.findById(req.body.post).then(function(post,err){
    //     if(post){
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id,
    //         }).then(function(comment,err){
    //             console.log(comment);
    
    //             if(err){
    //                 console.log("Error is Commenting");
    //                 return;
    //             }
    
    //             post.comments.push(comment);
    //             post.save();
    
    //             return res.redirect('/');
    //         });
    //     }
    // });
    
};

module.exports.destroy = async function(req,res){
    
    // console.log(req.params)
    try{
        
        let comment = await Comment.findById(req.params.id);   
        
        if(comment.user == req.user.id || req.user.pid == Post.findById(req.post.id).user){
            
            
            let postID = comment.post;
            comment.deleteOne();
            // comment.remove();
            
            await  Post.findByIdAndUpdate(postID ,
                { $pull : 
                    {comment : req.params.id}
                });
                
                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            comment : req.params.id
                        },
                        message:'Comment Deleted !!'
                    });
                }
                    
                    req.flash("success","Comment Deleted")
                    return res.redirect('back');
                }
                else{
                    return res.redirect('back');
                }
            }
            catch(err){
            req.flash("error",err);
            return res.redirect('back');
            
        };
        
        // Comment.findById(req.params.id).then(function(comment,err){
        //     if(err){
        //         console.log("Error in deleting the comment",err);
        //     }
        
        //     if(comment.user == req.user.id || req.user.pid == Post.findById(req.user.id).user){
        
        //         let postID = comment.post;
        //         comment.deleteOne();
        
        //         Post.findByIdAndUpdate(postID , {$pull : {comment : req.params.id}}).then(function(post,err){
        //             if(err){
        //                 console.log(post.content+ "    " + comment.content);
        //                 console.log("Error in deleting the comment from the array in post",err);
        //             }
        
        //             return res.redirect('back');
        //         });
        //     }
        //     else{
        //         return res.redirect('back');
        //     }
        // });
    };