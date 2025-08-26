const mongoose=require("mongoose");

const connectDB=async ()=>
{
   await mongoose.connect(
        "mongodb+srv://Subbu:Subbu2702@cluster0.bbkihai.mongodb.net/DevTinder"
    );
};

module.exports=connectDB;