const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true, unique: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  userType: { type: String, required: true, enum: ["printer", "printee"] },
  createdOn: { type: Date, default: Date.now() },
  password:{type: String, required: true},
  token:{type:String}
});

module.exports = mongoose.model('User', userSchema)