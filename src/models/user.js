const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema=mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            minlength:4,
            maxlength:40
        },
        lastName:{
            type:String,
        },
        emailId:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
          /*  validate(value)
            {
                if(!validator.isEmail(value))
                {
                    throw new Error("Email is invalid "+value);
                }
            }*/
        },
        password:{
            type:String,
            required:true,
           /*  validate(value)
            {
                if(!validator.isStrongPassword(value))
                {
                    throw new Error("Your Password is not Strong"+value);validatePassword
                }
            }*/
        },
        age:
        {
            type:Number,
            min:18
        },
        gender:{
            type:String,
            validate(value)
            {
                if(!['male','female','others'].includes(value))
                {
                    throw new Error("Gender is invalid");
                }
            }
        },
        photourl:
        {
            type:String,
            default:"https://www.cielhr.com/wp-content/uploads/2020/10/dummy-image.jpg",
            validate(value)
            {
                if(!validator.isURL(value))
                {
                    throw new Error("URL is invalid "+value);
                }
            }
        },
        about:{
            type:String,
            default:"This is the default about section"
        },
        skills:
        {
            type:[String]
        }
},{
    timestamps:true 
});

userSchema.methods.getJWT=async function()
{
    const user=this;
    const token=await jwt.sign({_id:user._id},"Dev@Tinder076",{expiresIn:"1h"}); 
    return token;
}

userSchema.methods.validatePassword=async function(password)
{
    const user=this;
    const passhash=user.password;
    const isPasswordValid=await bcrypt.compare(password,passhash);

    return isPasswordValid;

}

module.exports=mongoose.model("User",userSchema);