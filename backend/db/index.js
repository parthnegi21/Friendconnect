const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://friendconnet:parthnegi21@cluster0.k7n3l.mongodb.net/friendconnect")

const userSchema=new mongoose.Schema({
    email:String,
    username:String,
    name:String,
    password:String,
    bio:String
})

const postSchema=new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User schema
    createdAt: { type: Date, default: Date.now }
  

})

const Post = mongoose.model('Post',postSchema)
const User=mongoose.model('User',userSchema)


module.exports = {User,Post};
