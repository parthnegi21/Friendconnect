const express = require("express")
const { User } = require("../db")

async function userMiddleware(req,res,next){
const user = await User.findOne({
    username:req.body.username,
    password:req.body.password
})



if(!user){
    res.json({msg:"Wrong Credentials"})
}
else{
    req.user=user;
    next();
}
}



module.exports=userMiddleware