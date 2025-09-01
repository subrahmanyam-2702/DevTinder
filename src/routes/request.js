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

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{

   try{
        const allowedStatus=["accepted","rejected"];
        const status=req.params.status;
        const reqId=req.params.requestId;
        const loggedInUserId=req.user._id;
        if(!allowedStatus.includes(status))
        {
          return res.status(400).json({
            message:"Invalid status",
          });
        }
        /*const isvalidRequest=await ConnectionRequest.findOne({_id:reqId});
        if(!isvalidRequest)
        {
          return res.status(400).json({
            message:"Invalid id!!!"
          })
        }*/
        const connectionRequest=await ConnectionRequest.findOne({
           _id:reqId,
           toUserId:loggedInUserId,
           status:"interested"
        });
        if(!connectionRequest)
        {
          return res.status(400).json({
            message:"Invalid request"
          })
        }
        connectionRequest.status=status;
        const data=await connectionRequest.save();
        res.json({
          message:"Connection request is "+status,
          data
        })
   }
   catch(err)
   {
    res.status(400).send("Error : "+err.message);
   }
})

module.exports=requestRouter;



