const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorTypeSchema =  new Schema({
    typeName:{type:String, required:true, unique:true},
    typeId:{type:String, required:true, unique:true}
})

module.exports = mongoose.model("VendorType", vendorTypeSchema)