const express = require("express")
const authMiddleware = require("../middleware/auth")
const { Post, User } = require("../db")
const userMiddleware = require("../middleware/user")
const router = express.Router()


router.post("/post",authMiddleware,async(req,res)=>{

    const post = await Post.create({
         userId : req.user.user._id,
        title:req.body.title,
        description:req.body.description
    })

if(post){
    res.json({msg:"post create successfully"})
}
})


router.get("/bulk",authMiddleware,async(req,res)=>{
    const userId = req.headers.id
    
    const post = await Post.find({userId})
   
      if(post){
        const mapped=post.map((post)=>({
            title:post.title,
            description:post.description
        }))

        res.json({
           post:mapped
        })
      }
    else{
        res.json({msg:"no post found"})
    }
     

})






module.exports = router;