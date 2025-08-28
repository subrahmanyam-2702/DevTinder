const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../Middlewares/auth");

profileRouter.get("/profile",userAuth,async (req,res)=>
{
    try{
        const {user}=req;
        if(user)
        {
            res.send(user);
        }
        else{
            throw new Error("User not found");
        }
    }
    catch(err){
        res.status(400).send(err.message);
    }
   
})


module.exports=profileRouter;






