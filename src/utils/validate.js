const validator=require("validator");
const User=require("../models/user");
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

const validateEditProfileData =async (req) => {
    const allowedFields = [
        "firstName",
        "lastName",
        "emailId",
        "age",
        "gender",
        "about",
        "photourl",
        "skills"
    ];

    const updateFields = Object.keys(req.body);

    if (updateFields.length === 0) {
        throw new Error("No data provided for update");
    }

    const isValid = updateFields.every(field => allowedFields.includes(field));
    if (!isValid) {
        throw new Error("Invalid fields in update request");
    }

    if (req.body.emailId && !validator.isEmail(req.body.emailId)) {
        throw new Error("Invalid email format");
    }

    if (req.body.age && req.body.age < 18) {
        throw new Error("Age must be at least 18");
    }

    if (req.body.gender && !["male", "female", "others"].includes(req.body.gender)) {
        throw new Error("Invalid gender");
    }

    if (req.body.photourl && !validator.isURL(req.body.photourl)) {
        throw new Error("Invalid photo URL");
    }

    if (req.body.skills && req.body.skills.length > 10) {
        throw new Error("Too many skills (max 10 allowed)");
    }

    return true;
};
const validateEmail=async (req)=>
{
    const {emailId}=req.body;
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email format");
    }
    const user=await User.findOne({emailId:emailId});
    if(user)
    {
        return true;
    }
    return false;
}

module.exports={
    validateSignupData,
    validateEditProfileData,
    validateEmail
};