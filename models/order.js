const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:[{
        productId:{
            type:String,
            required: true
        },
        name:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:[1,'Quantity cannot be less than 1'],
            default:1
        },
        price:{
            type:Number,
            required:true,
            min:[0,'Price cannot be Negative']

        },
        imageUrl:{
            type: String
        }
    }],
    bill:{
        type:Number,
        required:true,
        min:[0,'Bill cannot be Negative']
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports  = mongoose.model("Order",orderSchema);