const express=require("express");
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");

app.post("/signup",async (req,res)=>
{
   const user=new User({
       firstName:"Sahiti",
       lastName:"Pepakayala",
       emailId:"sahiti@gmail.com",
       password:"sahiti149"
   });
   try{
        await user.save();
        res.send("New data was added successfully");  
   }
   catch(err)
   {
      res.status(400).send(err.message);
   }
  
})

connectDB()
.then(()=>
{
    console.log("Database is connected successfully");
    app.listen(7777,()=>
{
    console.log(`Connect to the post ${7777}`);
});
})
.catch(()=>
{
    console.error("Database is not connected");
});
