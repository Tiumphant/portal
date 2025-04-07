const User = require("../model/userModel")
const express = require("express")
const route = express.Router()
route.use(express.json())

route.get("/registration", async(req, res)=>{
   try{
    let result = await User.find()
    res.status(200).send({"result":"done", data: result})
   }catch(err){
    res.status(500).send({message: "error in fetching", error:err}) 
   }
})
route.get("/registration/:id", async(req, res)=>{
    try{
     let result = await User.findOne({ _id: req.params.id })
     res.status(200).send({"result":"done", data: result})
    }catch(err){
     res.status(500).send({message: "error in fetching", error:err}) 
    }
 })
 route.get("/registration/search/:key", async (req, res) => {
    try {
        const key = req.params.key;        
        const insensitive = new RegExp(key, "i");
        const result = await User.find({
            $or: [
                { firstName: { $regex: insensitive } },
                { email: { $regex: insensitive } },
                { lastName: { $regex: insensitive } }
            ]
        });
        
        res.status(200).json({ result: "done", data: result });
    } catch (err) {
        res.status(500).send({ message: "error in fetching", error: err });
    }
});


 
route.post("/registration", async(req, res)=>{
    try{
     let result = new User(req.body)
     await result.save()
     res.status(200).send({"result":"done", data: result})
    }catch(err){
    res.status(500).send({message: "error in posting", error:err})
    }
 })
 route.post("/login" , async(req,res)=>{
    console.log("Login route hit", req.body); 
    try{
      if(req.body.email && req.body.password){
        let result = await User.findOne(req.body).select("-password")
        if(result == null){
            res.send({message: "no result found"})
        }else{
            res.status(200).send({message:"succesefully login", data: result})
        }
      }
    }catch(err){
        res.status(500).send({message:"error in login", error:err})
    }
 })
       


 route.put("/registration/:id", async(req, res)=>{
    try{
        let result = await User.updateOne(req.params, {$set: req.body})
    
        res.status(200).send({"result":"done", data: result})
    }catch(err){
        res.status(500).send({message: "error in posting", error:err})
    }
 })
 route.delete("/registration/:id", async(req, res)=>{
    try{
        let { id } = req.params;
        let result = await User.deleteOne({_id:id})
        res.status(200).send({"result":"done", data: result})
    }catch(err){
        res.status(500).send({message: "error in delete", error:err})
    }
 })
 module.exports = route
 