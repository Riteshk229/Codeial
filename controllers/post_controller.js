const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create =  async function(req,res){

    try{
         await Post.create({
            content: req.body.content,
            user: req.user._id
         })

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