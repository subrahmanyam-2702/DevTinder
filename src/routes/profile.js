const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../Middlewares/auth");
const {validateEditProfileData}=require("../utils/validate");
const {validateEmail}=require("../utils/validate");
const validator=require("validator");
const bcrypt=require("bcrypt");
const User=require("../models/user");


profileRouter.get("/profile/view",userAuth,async (req,res)=>
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

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>
{
    try{
         if(!validateEditProfileData(req))
         {
             throw new Error("Invalid edit request");
         }
         const loggedinUser=req.user;
         Object.keys(req.body).forEach(key=> loggedinUser[key]=req.body[key]);
         console.log(loggedinUser);
         await loggedinUser.save();
         res.json({
            message:`${loggedinUser.firstName} : Your profile is updated successfully....`,
            data:loggedinUser
        });
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
})

profileRouter.patch("/profile/forgotpassword",async(req,res)=>
{
    try{
        const { emailId, newPassword } = req.body;

        if (!emailId || !newPassword) {
            return res.status(400).send("Email and new password are required");
        }
        if(!validateEmail(req))
        {
            throw new Error("User not found");
        }
        const user = await User.findOne({ emailId });
         if (!user) {
            return res.status(404).send("User not found");
        }
        if(!validator.isStrongPassword(newPassword))
        {
            throw new Error("Password is not strong enough");
        }
        const passhash=await bcrypt.hash(newPassword,10);
        user.password=passhash;
        await user.save();
        res.send(`${user.firstName} : Your password is updated successfully`);
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
   

});


module.exports=profileRouter;






