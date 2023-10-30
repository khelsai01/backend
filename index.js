const express = require("express");
const cors = require("cors");
const { connection } = require("./connection/connection");
const { userRoutter } = require("./Routes/user.routes");
const { deviceRouter } = require("./Routes/device.routes");

const app = express();

app.use(cors());
app.use(express.json())

app.use("/users",userRoutter);
app.use("/devices",deviceRouter);

app.listen(8080,async()=>{
    await connection;
    console.log("server is connected to db");
    console.log("server is running at port 8080");

})