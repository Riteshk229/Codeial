const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const postSchema = new moongoose.Schema({

    content: {
        type : String,
        required : true
    },

    user:{
        type : moongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    // include the ids of all comment in this post schema itself
    comments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
   
},{
    timestamps: true
});

const Post = mongoose.model("Post",postSchema);

module.exports = Post;