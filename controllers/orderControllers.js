require('dotenv').config();
const orderSchema = require('../models/order');
const cartSchema = require('../models/cart');
const userSchema = require('../models/user');

const stripe = require('stripe')(process.env.StripeAPIKey);
const get_orders = async(req,res)=>{
    try{
            const userId = req.params.id;
            orderSchema.find({userId}).sort({date:-1}).then(orders=>res.json(orders));
        }catch(err){
            console.log("Error in getting orders: ", err);
            res.status(500).json({"error": "Internal Server Error!"})
        }
}

const checkout = async(req,res)=>{
    try{
        const userId =req.params.id;
        const {source} = req.body;
        let cart = await cartSchema.findOne({userId})
        let user = await UserSche

    }catch(err){
        console.log("Error in Checkout :", err)
        return res.status(422).json({"error":"Invalid Data!"});
    }
}

