const express=require("express");
const app=express();
const {adminAuth,userAuth}=require("./Middlewares/auth")


//app.use("/admin",adminAuth);

//app.use("/user",userAuth);

app.get("/user/data",userAuth,(req,res)=>
{
    res.send("User was authorized");
})

app.post("/user/login",(req,res)=>
{
    res.send("user was loggedin");
})

app.get("/admin/deleteAllData",adminAuth,(req,res,next)=>
{
    res.send("All Data was Deleted");
});
app.get("/admin/getAllData",adminAuth,(req,res)=>
{
       res.send("All data about the admin was gathered");
});

app.listen(8080,()=>
{
    console.log("This is node by the akshay");
});