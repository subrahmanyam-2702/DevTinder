const express=require("express");
const app=express();
const connectDB=require("./config/database");
const cookieparser=require("cookie-parser");
app.use(express.json());
app.use(cookieparser());
const authRouter=require("./routes/auth"); 
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter = require("./routes/user");
const cors=require("cors");
require("dotenv").config()


app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL,"https://devtinder-web-beryl.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"]
}));

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

const PORT = process.env.PORT || 7777

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

