const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        default:""
        },
    imageUrl:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
},{timestamps:true});

module.exports  = mongoose.model("Item",itemSchema);