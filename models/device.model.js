const mongoose = require("mongoose");


const deviceSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    username:String,
    userId:String
},
    {
        versionKey: false
    });

const DeviceModel = mongoose.model("device", deviceSchema);

module.exports = { DeviceModel };