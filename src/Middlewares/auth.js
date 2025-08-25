const adminAuth=(req,res,next)=>
{
    const token="xyz";
    const adminauth=token==="xyz";
    if(!adminauth)
    {
        res.status(401).send("Unauthorized user");
    }
    else{
        next();
    }
}

const userAuth=(req,res,next)=>
{
    const token="xyz";
    const adminauth=token==="xyz";
    if(!adminauth)
    {
        res.status(401).send("Unauthorized user");
    }
    else{
        next();
    }
}

module.exports={
    adminAuth,
    userAuth
}