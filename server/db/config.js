const mongoose = require("mongoose")
module.exports = mongoose.connect("mongodb://127.0.0.1:27017/portal").then(()=> console.log("server is connected")).catch((err)=>{
    console.log("error in connection", err)
})