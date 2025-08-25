const express=require("express");
const app=express();



app.use("/home",(req,res)=>
{
    res.send("This is home page");
});
app.use("/test",(req,res)=>
{
    res.send("This is a test route");
})
app.use("/",(req,res)=>
{
    res.send("Hiii");
})
app.listen(8080,()=>
{
    console.log("This is node by the akshay");
});