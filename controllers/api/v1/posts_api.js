const Post = require('../../../models/post');
const Comment = require('../../../models/comments');
const User = require('../../../models/user');

module.exports.index = async function(req,res){

     // Populate the user of posts
     let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
        path: 'comments',
        populate :{
            path : 'user'
        }
    });

    return res.status(200).json({
        message : "Lists of Post",
        posts : posts
    })
};

module.exports.destroy = async function(req,res){

    try{
        let post = await Post.findById(req.params.id);

        // .id is used to convert objects into strings
        // if(post.user == req.user.id){
            console.log(`Deleted post \n ${post}`);

            post.deleteOne();

            await Comment.deleteMany({post:req.params.id});

            return res.status(200).json({
                message : "Post and Associated Comments Deleted succesfully",

            });
        // }
        // else{
        //     req.flash("error",err)
        //     return res.redirect('back');
        // }
    }catch(err){
        console.log("****",err);
        return res.status(500).json({
            message : "Internal Sever Error"
        });
    };
};