const express = require("express");
const { DeviceModel } = require("../models/device.model");
const { auth } = require("../middleware/auth.middleware");

const deviceRouter = express.Router();

deviceRouter.use(auth);
deviceRouter.get("/",async(req,res)=>{

    try {
        const device = await DeviceModel.find({username:req.body.name});
        return res.status(200).send(device)
    } catch (error) {
     return res.status(400).send(error)   
    }
});

deviceRouter.post("/add",async(req,res)=>{

    try {
        const device = new DeviceModel(req.body);
        await device.save();
        return res.status(200).send({"msg":"new devies id add",device});
    } catch (error) {
     return res.status(400).send(error)   
    }
});
deviceRouter.patch("/update/:Id",async(req,res)=>{
    const {Id} = req.params;
    const deviec = await DeviceModel.findOne({_id:Id});
    try {
        if(req.body.userId=deviec.userId){
            await DeviceModel.findByIdAndUpdate({_id:Id},req.body);
            return res.status(200).send({msg:`the device of id ${Id} has been updated`})
        }
        
    } catch (error) {
     return res.status(400).send(error)   
    }
});

deviceRouter.delete("/delete/:Id",async(req,res)=>{
    const {Id} = req.params;
    const deviec = await DeviceModel.findOne({_id:Id});
    try {
        if(req.body.userId=deviec.userId){
            await DeviceModel.findByIdAndDelete({_id:Id});
            return res.status(200).send({msg:`the device of id ${Id} has been udeleted`})
        }
    } catch (error) {
     return res.status(400).send(error)   
    }
});

module.exports={deviceRouter}