const validator=require("validator");
const validateSignupData=(req)=>
{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName)
    {
        throw new Error("Name is Invalid");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email is invalid");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password should be strong");
    }
}

module.exports={validateSignupData} ;