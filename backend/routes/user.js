const express = require("express")
const router = express.Router()
const {User, FriendRequest} = require("../db")
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

router.get("/check",authMiddleware,(req,res)=>{
res.json({msg:"hello"})

})




router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const userId = req.user.user._id;
    
    try {
        // Fetch all users except the current user with the search filter
        const users = await User.find({
            _id: { $ne: userId }, // Exclude current user
            username: { "$regex": filter, "$options": "i" }  // Apply filter to usernames
        });

        // Fetch all friend requests involving the current user
        const friendRequests = await FriendRequest.find({
            $or: [
                { fromUserId: userId }, // Requests sent by the current user
                { toUserId: userId }    // Requests received by the current user
            ]
        });

        // Create a map to store the friend request status for each user
        const friendStatusMap = {};
        friendRequests.forEach(request => {
            // Current user sent the request (outgoing request)
            if (request.fromUserId.toString() === userId) {
                friendStatusMap[request.toUserId] = request.status;
            }
            // Current user received the request (incoming request)
            else if (request.toUserId.toString() === userId) {
                friendStatusMap[request.fromUserId] = request.status;
            }
        });

        // Map users to include their friend request status
        const userList = users.map(user => {
            const status = friendStatusMap[user._id.toString()] || 'none'; // Default to 'none' if no request found
            return {
                _id: user._id,
                username: user.username,
                name: user.name,
                status: status
            };
        });

        res.json({
            users: userList
        });
    } catch (error) {
        console.error("Error fetching users and friend requests:", error);
        res.status(500).json({ error: "Server error" });
    }
});

  




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