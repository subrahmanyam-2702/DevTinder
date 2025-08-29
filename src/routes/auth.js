const express=require("express");
const authRouter=express.Router();
const {validateSignupData}=require("../utils/validate");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const validator=require("validator");
authRouter.post("/signup",async (req,res)=>
{
   
   try{
        validateSignupData(req);
        const {firstName,lastName,emailId,password}=req.body;
        const passhash=await bcrypt.hash(password,10);
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passhash
        });
        await user.save();
        res.send("New data was added successfully");  
   }
   catch(err)
   {
      res.status(400).send("ERROR : "+err.message);
   }
  
})

authRouter.post("/login",async (req,res)=>
{
    try{
        const {emailId,password}=req.body;
        if(!validator.isEmail(emailId))
        {
            throw new Error("Invalid Email");
        }
        const user=await User.findOne({emailId:emailId});
        if(!user)
        {
            throw new Error("Invalid Credentials");
        }
        const isvalid=await user.validatePassword(password);
        if(isvalid)
        {
            const token=await user.getJWT();
            res.cookie("token",token,{
                expires:new Date(Date.now()+ 8*3600000),
            });
            res.send("Login successfully");
        }
        else{
            throw new Error("Invalid Credentials");
        }

    }
    catch(err){
        res.status(400).send(err.message);
    }
})

authRouter.post("/logout",async (req,res)=>
{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send();
})
module.exports=authRouter;





