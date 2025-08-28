const jwt=require("jsonwebtoken");
const User= require("../models/user");
const userAuth=async(req,res,next)=>
{
   try
   {
      const {token}=req.cookies;
      if(!token)
      {
        throw new Error("Invalid Token");
      }
      const decodedmsg=await jwt.verify(token,"Dev@Tinder076");
      const {_id}=decodedmsg;
      const user=await User.findById({_id:_id});
      if(user)
      {
        req.user=user;
        next();
      }
      else
      {
        throw new Error("User not found");
      }
   }
   catch(err){
         res.status(400).send(err.message);
   }
}

module.exports={userAuth};