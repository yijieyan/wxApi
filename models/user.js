const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: {
      type: String,
      required: true
    },
    deviceId: String,
    name: String,
    department: [],
    position: String,
    mobile: String,
    gender: String,
    email: String,
    avatar: String,
    status: {
      type: Boolean,
      default: true
    }

}, {versionKey: false, timestamps: true});
module.exports = mongoose.model('user', userSchema)
