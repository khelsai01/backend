const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");

const userRoutter = express.Router();

userRoutter.post("/register", async (req, res) => {
    const { name, email, password, gender, age, city, is_married } = req.body;

    try {
        const exituser = await UserModel.find({ email });
        if (exituser.length > 0) {
            return res.status(400).send({ msg: "User already exist, please login" })
        }
        const hashing = bcrypt.hashSync(password, 5)
        const user = new UserModel({
            name,
            email,
            gender,
            password: hashing,
            age,
            city,
            is_married
        })

        await user.save();
        return res.status(200).send({ msg: "New user has been registed", "new_user": user })
    } catch (error) {
        return res.status(400).send(error)
    }
});
userRoutter.post("/login", async(req, res) => {
    const { name, email, password, gender, age, city, is_married } = req.body;


    try {
        const user = await UserModel.findOne({email});

        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({username:user.name,userId:user._id},"masai",{expiresIn:"7 days"})
                    return res.status(200).send({msg:"User has been login","token":token})
                }
                else{
                    return res.status(400).send({err:err.message})
                }
            })
        }
    } catch (error) {
        return res.status(400).send(error)
    }
});
userRoutter.post("/logout", async(req, res) => {

    const token = req.headers.authorization?.split(" ")[1];

    try {
        const newToken = new BlacklistModel({
            token
        })
        await newToken.save();
        return res.status(200).send({msg:"User has been logout"})
    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = { userRoutter }