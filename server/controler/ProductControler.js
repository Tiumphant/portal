const express = require('express')
const Product = require('../model/ProductModel')
const multer = require('multer')


const route = express.Router();
route.use(express.json())


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }),
})


//get routes

route.get("/product", async (req, resp) => {
    console.log(req.body, 'this is body form')
    try {
        let result = await Product.find();
        // result = await result.save();
        console.log(result, 'this is result  code')

        // resp.send("succesfull and server", result)
        resp.status(201).send({ message: "Role created successfully", data: result });

    } catch (err) {
        console.log(err)
        resp.send("server err :", err)

    }
})



// post method
route.post("/product", upload.single('image'), async (req, resp) => {
      try{
        let formData = {...req.body}
        formData.image = req.file.filename;
        let result = new Product(formData);
        await result.save();
         resp.send(result)
      } catch(err){
        
        resp.status(500).send({ message: "Server error", error: err });
      }
})
// put data edit
route.put("/product/:_id", async (req, resp) => {
    console.log("THis is a put method", req.params)
    try {
        let result = await Product.updateOne(req.params, { $set: req.body });
        // result = await result.save();
        resp.status(201).send({ message: "This is a update", data: result })
    } catch (err) {
        console.log("first,", err)
        //   resp.send('sever', err)

    }
})

// delete folder


route.delete('/product/:_id', async (req, resp) => {
    // console.log(req.params)
    try {
        let result = await Product.deleteOne(req.params);
        console.log(req.params)
        resp.status(201).send({ message: ' delete succesfully', data: result })
    } catch (err) {
        console.log('first', err)

        resp.status(500).send({ message: 'Server error', error: err });
    }
})

module.exports = route