const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../../pd_users/models/user')
const VendorType = require('./vendorTypes');
const Service = require('./services')

const vendorSchema = new Schema({
    vendorId:{type:String, reqired: true, unique:true},
    vUid:{type: mongoose.Schema.Types.ObjectId, reqired: true, unique:true, ref: User},
    vendorName:{type:String, reqired: true},
    vendorDesc:{type:String, required:true},
    vendorAddress:{type:String, reqired: true},
    vendorOpsCity:[{type:String, reqired: true}],
    vendorOpsLocality:[{type:String}],
    vendorOpsState:[{type:String, reqired: true}],
    vendorOpsCountry:[{type:String, reqired: true}],
    vendorType: [{ type: mongoose.Schema.Types.ObjectId, ref: VendorType}],
    services:[{type: mongoose.Schema.Types.ObjectId, ref: Service}],
    phoneNumbers:[{type:Number, required: true}],
    email:[{type:String}],
    mapCor:[{type:String}],
    images:[{type:String}]
})

module.exports = mongoose.model("Vendor", vendorSchema)