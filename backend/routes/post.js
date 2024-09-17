const express = require("express")
const authMiddleware = require("../middleware/auth")
const { Post, User } = require("../db")
const userMiddleware = require("../middleware/user")
const router = express.Router()


router.post("/post",authMiddleware,async(req,res)=>{

    const post = await Post.create({
         userId : req.user.user._id,
         name:req.user.user.name,
         username:req.user.user.username,
        title:req.body.title,
        description:req.body.description
    })

if(post){
    res.json({msg:"post create successfully"})
}
else{
    res.json({msg:"some internal error occured"})
}
})





router.get('/bulk', authMiddleware, async (req, res) => {
    try {
        const Id = req.user.user._id
       
          console.log(Id)
        
        const posts = await Post.find({ userId: { $ne: Id } }); 
        

        res.status(200).json({
            success: true,
            posts:posts,
          
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error, could not fetch posts',
        });
    }
});




router.get('/mypost', authMiddleware, async (req, res) => {

        const Id = req.user.user._id; 
        const username = req.user.user.username
        const name = req.user.user.name 
        
        const posts = await Post.find({userId:Id}); 
        
        if(posts){
            res.json({posts:posts,
                username:username,
                name:name
            })
        }
        else{
            res.json({
                msg:"no posts uploaded"
            })
        }
    
});


router.get("/userpost",authMiddleware,async(req,res)=>{
const userId = req.headers["user-id"]


const response = await Post.find({userId})

if(response){
    res.json({
        posts:response
    })
}
else{
    res.json("no post uploaded")
}

})



module.exports = router;