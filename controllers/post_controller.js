const Post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/user');

module.exports.create =  async function(req,res){

    try{
        let post =  await Post.create({
            content: req.body.content,
            user: req.user._id
         })

         let user = await User.findById(req.user.id);

         if(req.xhr){;
            return res.status(200).json ({
                data: {
                    post : post,
                    user : user.name
                },
                message : " Poste Created !!!"
            });
         }

         req.flash("success","Posted!!")
         return res.redirect('back');
    }
    catch(err){
        req.flash("error",err);
        return res.redirect('back');
    };

    // Post.create ({
    //     content : req.body.content,
    //     user : req.user._id
    // }).then(function(post,err){
    //     if(err){
    //         console.log("Error in creating a Post");
    //         return;
    //     }

    //     return res.redirect('back');
    // });

};

module.exports.destroy = async function(req,res){

    try{
        let post = await Post.findById(req.params.id);

        // .id is used to convert objects into strings
        if(post.user == req.user.id){
            console.log(`Deleted post \n ${post}`);

            post.deleteOne();

            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
            
                return res.status(200).json({
                    data: {
                        post_id : req.params.id,
                    },
                    message: "Post deleted"
                });
            }

            req.flash("success","Post and Comments Deleted")
            return res.redirect('back');
        }
        else{
            req.flash("error",err)
            return res.redirect('back');
        }
    }catch(err){
        req.flash("error",err);
        return res.redirect('back');
    };

    // Post.findById(req.params.id).then(function(post,err){

    //     // .id is used to convert objects into strings
    //     if(post.user == req.user.id){
    //         console.log(post);

    //         // instead of post.remove() use the down cmd
    //         post.deleteOne();

    //         Comment.deleteMany({post : req.params.id}).then(function(comment,err){
    //             if(err){
    //                 console.log('Error in deleting the comment')
    //                 return;
    //             }

    //             return res.redirect('back');
    //         });
    //     }
    //     else{
                
    //         return res.redirect('back');
    //     }
    // });
};