const mongoose=require("mongoose");
Schema = mongoose.Schema;
 require("./user.model");

const PostSchema=new mongoose.Schema({
    
    user:{
        type:Schema.Types.ObjectId, ref:'User'
    },
    post:{
        type:String,
        required:[true,"This field must not be Empty"]
    },
}, {timestamps: true});
const Post=mongoose.model("Post",PostSchema);
module.exports=Post;