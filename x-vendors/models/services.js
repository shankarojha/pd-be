const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema =  new Schema({
    serviceName:{type:String, required:true, unique:true},
    serviceId:{type:String, required:true, unique:true},
    
})

module.exports = mongoose.model("Service", servicesSchema)