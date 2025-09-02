const express=require("express");
const { userAuth } = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter=express.Router();
const User=require("../models/user");


const USER_SAFE_DATA="firstName lastName photourl about skills gender age";

userRouter.get("/user/requests/received",userAuth,async (req,res)=>
{
    try{
          const loggedInUser=req.user;
          const connectRequests=await ConnectionRequest.find({
             toUserId:loggedInUser._id,
             status:"interested"
          }).populate("fromUserId",USER_SAFE_DATA);
        //   .populate("fromUserId",["firstName","lastName"]);
         
          if(!connectRequests)
          {
             return res.status(400).json({
                    message:"No Connection requests exist"
                });
          }
          console.log(connectRequests);
          res.json({
            message:"Data fetched successfully",
            data:connectRequests
          })

    }catch(err)
    {
        res.status(400).send("Error : "+err.message);
    }

})

userRouter.get("/user/connections",userAuth,async (req,res)=>
{
    try{

        const loggedInUser=req.user;
        const connections=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"},
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
        const data=connections.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString())
            {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({
            data
        })
    }catch(err)
    {
        res.status(400).send("Error : "+err.message);
    }
})

userRouter.get("/user/feed",userAuth,async (req,res)=>
{
   try
   {
       const loggedInUser=req.user;

       const page=parseInt(req.query.page) || 1;
       let limit=parseInt(req.query.limit) || 10;
       const skip=(page-1)*limit;
       limit=limit>50 ? 50:limit;

       const connectionRequest=await ConnectionRequest.find({
          $or:[
            {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
       }).select("fromUserId toUserId");


       const hideUsers=new Set();
       connectionRequest.forEach((req)=>{
          hideUsers.add(req.fromUserId.toString());
          hideUsers.add(req.toUserId.toString());
       });

       const users=await User.find({
              $and:[
                {_id:{$nin:Array.from(hideUsers)}},
                {_id:{$ne:loggedInUser._id}}
              ]
       }).select(USER_SAFE_DATA).skip(skip).limit(limit);
       res.send(users);

   }catch(err){
    res.status(400).json({
        Error:err.message
    })
   }
})

module.exports=userRouter;