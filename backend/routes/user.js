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
     name:req.body.name,
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


router.get("/bulk",authMiddleware,async(req,res)=>{
    const filter = req.query.filter || "";
    const userId = req.user._id;  
    
    
      const users = await User.find({
        $and: [
          { _id: { $ne: userId } },  
          {
            $or: [
                { username: { "$regex": filter, "$options": "i" } },
             
            ]
          }
        ]
      });
    
      res.json({
        users: users.map(user => ({
          username: user.username,
         name:user.name,
          _id: user._id
        }))
      });
    
  });
  



// router to add bio and name
router.post("/details", authMiddleware, async (req, res) => {
    const { firstname ,lastname,profession, bio } = req.body;
    const user = req.user
  
    console.log(user.user.username)

    const updatedUser = await User.findByIdAndUpdate(user.user._id, {
        profession:profession,
        bio: bio
    }, { new: true });

    if (updatedUser) {
        res.json({ msg: "Profile updated", user: updatedUser });
    } else {
        res.status(400).json({ msg: "Error updating profile" });
    }
});








module.exports = router;