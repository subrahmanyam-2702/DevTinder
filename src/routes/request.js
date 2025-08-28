const express=require("express");
const { userAuth } = require("../Middlewares/auth");
const requestRouter=express.Router();

requestRouter.post("/sendconnection",userAuth,(req,res)=>
{
    const user=req.user;
    res.send(user.firstName +" sent you a connection");
})

module.exports=requestRouter;




