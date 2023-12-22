const mongoose = require('mongoose');
const {isEmail,} = require('validator'); 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide your name']
    },
    email:{
        type:String,
        unique: true,
        required:[true,'Please provide your email'],
        lowercase:true,
        validate:[isEmail,'please enter a valid email']
    },
    password:{
        type: String,
        required:[true,'please enter password'],
        minlength:[8,'Password should be at least 8 characters']
    }
});

module.exports = mongoose.model('User',userSchema);