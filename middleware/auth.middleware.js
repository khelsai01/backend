const {BlacklistModel}= require("../models/blacklist.model")
const jwt = require("jsonwebtoken")

const auth=async(req,res,next)=>{

    const token = req.headers.authorization?.split(" ")[1]
    const blacklist = await BlacklistModel.find({token:token})
    try {
        if(blacklist.length>0){
            return res.status(400).send({msg:"login again"})
        }

        const decode = jwt.verify(token,"masai");
        console.log(decode)
        req.body.username=decode.username,
        req.body.userId = decode.userId
       return next();
        
    } catch (error) {
     return res.status(400).send(error)   
    }
}

module.exports ={auth}