const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    product_id : String,
    title : String,
    price : String,
    category : [String],
    company_id : String,
    seller_id : [String],
});
const productModel = mongoose.model("product",productSchema,"product");

module.exports = productModel;