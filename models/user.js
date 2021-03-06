const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,'firstName field is required']
    },
    email:{
        type:String,
        required:[true,'email field is required']
    },
     password:{
        type:String,
        required:[true,'password field is required']
    }, type:{
        type:String,
        required:[true,'type field is required']
    }
},
{ timestamps: true ,versionKey: false });
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


const User = mongoose.model('user', UserSchema);

module.exports=(User);