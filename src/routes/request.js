const express=require("express");
const { userAuth } = require("../Middlewares/auth");
const requestRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>
{
    try{
          const fromUserId=req.user._id;
          const toUserId=req.params.toUserId;
          const status=req.params.status;
          const allowedStatus=["interested","ignored"];
          console.log(fromUserId);
          console.log(toUserId);
          if(!allowedStatus.includes(status))
          {
               return res.status(400).json({message:"Invalid status"});
          }
          const user=await User.findById(toUserId);
          if(!user)
          {
            throw new Error("Connection request failed user not present");
          }
          const isExisted=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {
                    fromUserId:toUserId,
                    toUserId:fromUserId
                }
            ]
          });
          if(isExisted)
          {
            return res.status(400).json({message:"Connection Request is alrady present"});
          }

          /*
          if(req.user._id.equals(toUserId))
          {
              return res.status(400).json({
                message:"You cannot send connection request to yourself!!"
              });
          }*/

          const connectionRequest=new ConnectionRequest({
              fromUserId,
              toUserId,
              status
          })
          const data=await connectionRequest.save();
          res.json({
            message:"Connection request sent successfully....",
            data
          })
    }
    catch(err)
    {
        res.status(400).send("Error : "+err.message);
    }
})


module.exports=requestRouter;




