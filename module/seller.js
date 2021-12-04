const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
    seller_id : String,
    name : String,
    product_ids : [String],
})

const sellerModel = mongoose.model("seller",sellerSchema,"seller");

module.exports = sellerModel;