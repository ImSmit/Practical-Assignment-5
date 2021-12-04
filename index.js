const { response } = require("express");

const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;

//------------------ mongoose ----------------
const mongoose = require("mongoose");
const { update, findOneAndUpdate } = require("./module/company");
const companyModel = require("./module/company");
const productModel = require("./module/product");
const sellerModel = require("./module/seller");
require("dotenv").config();
mongoose
.connect(process.env.MONGOURL)
.then(() => console.log("MongoDB Is connected"));
//--------------------------------------------

app.get("/", (req,res) => {
    res.json("Hello World");
})

//------------- Add Company ------------------
app.post("/add-company", (req,res) => {
    const { newCompany } = req.body;
    const addCompany = companyModel.create(newCompany);
    return res.json({data:"Company inserted"});
})
//--------------------------------------------

//------------- Add Product ------------------
app.post("/add-product", (req, res) => {
    const { newProduct } = req.body;
    const addProduct = productModel.create(newProduct);
    return res.json({data: "Product Inserted"})
})
//--------------------------------------------

//------------- Add seller -------------------
app.post("/add-seller", (req,res) => {
    const { newSeller } = req.body;
    const addSeller = sellerModel.create(newSeller);
    return res.json({data: "Seller Inserted"});
})

//------------- Update product -------------------
app.put("/update-product/:id",async (req,res) => {
        const pid = req.params.id;
        const cat = req.body.category;
        const updateproduct = await productModel.findOneAndUpdate(
            {product_id: pid},
            {$addToSet: {category : cat},},
            {new : true}
    )
    return res.json({data: "updated"})
})
//------------------------------------------------

//------------- Update seller -------------------
app.put("/update-seller/:id",async (req,res) => {
    const sid = req.params.id;
    const pid = req.body.product_ids;
    const updateseller = await sellerModel.findOneAndUpdate(
        {seller_id: sid},
        {$addToSet: {product_ids: pid},},
        {new : true}
    )
    res.json({data: "Updated"})
})
//------------------------------------------------

//------------- Update Company --------------------
app.put("/update-company/:id", async (req,res) => {
    const cid = req.params.id;
    const pid = req.body.product_ids;
    const updatecomany = await companyModel.findOneAndUpdate(
        {company_id : cid},
        {$addToSet: {product_ids : pid},},
        {new : true}
    )
    res.json({data: "updated"})
})
//------------------------------------------------

//------------- delete product -------------------
app.delete("/delete-product/:id", async (req, res) => {
    const pid = req.params.id;
    const deleteProduct = await productModel.findOneAndDelete(
        {product_id : pid}
    )
    return res.json({data: "record deleted"})
})
//------------------------------------------------

//------------- delete company -------------------
app.delete("/delete-company/:id", async (req, res) => {
    const cid = req.params.id;
    const deletecompany = await companyModel.findOneAndDelete(
        {company_id : cid}
    )
    return res.json({data: "record deleted"})
})
//------------------------------------------------

//------------- delete seller -------------------
app.delete("/delete-seller/:id", async (req, res) => {
    const sid = req.params.id;
    const deleteseller = await sellerModel.findOneAndDelete(
        {seller_id : sid}
    )
    return res.json({data: "record deleted"})
})
//------------------------------------------------


//------------- Fetch user -----------------------
app.get("/fetch-company/:pname", async (req, res) => {
    try{
        const pn = req.params.pname;
        const getcompanyid = await productModel.find({ title: pn });
        res.send(getcompanyid);
        
        // const q = {company_id: getcompanyid.company_id}
        // const getCompany = await companyModel.find(q)
        // res.send(getCompany);
    }catch(err){
        res.send('Error '+ err);
    }
    // const getcompanyid = productModel.find(nam => nam.title == req.params.pname);
    // // const companydata = companyModel.findById(com => com.product_ids.includes(getcompanyid.product_id));
    // if(getcompanyid.length == 0){
    //     return res.json({data:"no data found"})
    // }else{
    //     return res.json({data: getcompanyid});
    // }
});


app.listen(port,() => console.log("App is running on port 5000"));
