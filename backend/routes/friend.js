const express = require("express")
const authMiddleware = require("../middleware/auth")
const { FriendRequest } = require("../db")
const userMiddleware = require("../middleware/user")
const router = express.Router()



router.post("/send-request",authMiddleware,async(req,res)=>{
    const toUserId = req.body.toUserId
    const fromUserId = req.user.user._id
   const fromUsername = req.user.user.username
    
 console.log(fromUsername)


    const existingRequest = await FriendRequest.findOne({ fromUserId: fromUserId, toUserId: toUserId });

    if (existingRequest) {
      return res.status(400).json({ msg: 'Request already sent.' });
    }
    

    const Request = new FriendRequest({
        fromUserId:fromUserId,
      
        fromUsername: fromUsername,
        toUserId:toUserId
    })
   


    if(Request){
        res.json({msg:"friend request send successfully"})
    }
    await Request.save();
})





router.get("/incoming-request",authMiddleware,async(req,res)=>{
    const userId = req.user.user._id
  
    const incomingRequests = await FriendRequest.find({ toUserId: userId, status: 'pending' });

    if (incomingRequests.length > 0) {
      res.json({
        msg: "Incoming friend requests",
        requests: incomingRequests.map(request => ({
          from: 
          {id:request.fromUserId,
       
         username:request.fromUsername
          }

        })),
      });
    } else {
      res.json({ msg: "No incoming friend requests" });
    }
})




router.post("/respond-request", authMiddleware, async (req, res) => {
    const userId = req.body.userId;
    const response = req.body.response;

 
     
        const check = await FriendRequest.findOne({
            fromUserId: userId, 
            status: 'pending',
            toUserId: req.user.user._id  
        });

        if (!check) {
            return res.status(404).json({ msg: "No pending friend request found" });
        }


        const updatedRequest = await FriendRequest.findByIdAndUpdate(check._id, {
            status: response ? "accepted" : "rejected"
        }, { new: true }); 

       

        

        res.json({
            msg: response ? "Friend request accepted" : "Friend request rejected",
            status: updatedRequest.status
        });
    } 
);


router.post("/friendlist",authMiddleware,async(req,res)=>{
    userId = req.user.user._id
    const friends = await FriendRequest.find({toUserId:userId,status:"accepted"})
    console.log(friends)

    if (!friends || friends.length === 0) {
        return res.json({ msg: "No friends found" });
    }

    const friendList = friends.map(friend => ({
        username: friend.fromUsername
    }));

    res.json({ friends: friendList });
})

module.exports=router