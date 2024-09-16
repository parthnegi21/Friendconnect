const express = require("express")
const router = express.Router()
const {User} = require("../db")
const userMiddleware = require("../middleware/user")
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middleware/auth");



router.post("/signup",async(req,res)=>{

    const check = await User.findOne({
        username:req.body.username
    })
    console.log(check)
    if(check)
    {
        res.json({msg:"user already exist, Try a differne username"})
    }
    else{

const user = await User.create({
    username :req.body.username,
     email : req.body.email,
     password :req.body.password
})
res.json(user)
    }
    
})

router.post("/signin",userMiddleware,async(req,res)=>{
    const user = req.user
 
const token = jwt.sign({user},"secreat")
res.json({msg:"sign in successfully",
    token:token

})


})

router.post("/check",authMiddleware,(req,res)=>{
res.json("correct token")

})



// router to add bio and name
router.post("/details", authMiddleware, async (req, res) => {
    const { myname, bio } = req.body;
    const user = req.user
  
    console.log(user.user.username)

    const updatedUser = await User.findByIdAndUpdate(user.user._id, {
        name: myname,
        bio: bio
    }, { new: true });

    if (updatedUser) {
        res.json({ msg: "Profile updated", user: updatedUser });
    } else {
        res.status(400).json({ msg: "Error updating profile" });
    }
});








module.exports = router;