const mongoose = require("mongoose")
const ProductSchema = mongoose.Schema(
    {
        name: {type: String},
        description: {type: String},
        price: {type:Number, required: true},
        image: {type: String}
    }
)

const Product = mongoose.model("product", ProductSchema)

module.exports = Product