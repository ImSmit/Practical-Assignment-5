const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    company_id : String,
    name : String,
    product_ids : [String],
});

const companyModel = mongoose.model("company",companySchema,"company");
//export
module.exports = companyModel;