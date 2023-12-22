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
        let user = await userSchema.findOne({_id:userId});
        const email = user.email;
        if(cart){
            const charge=await stripe.charges.create({
                amount: cart.bill,
                currency:'inr',
                source:source,
                receipt_email:email
            })
            if(!charge) throw Error('Payment Failed');
            if(charge){
                //save the payment details to database
                const order = await order.create({
                    userId,
                    items:cart.items,
                    bill:cart.bill
                })
                //empty the cart after successful purchase
                await cartSchema.findByIdAndDelete({_id:cart.id});
                return res.status(201).send(order);
            }
        }else{
            return res.status(404).json({message:"Cart not found."})
        }

    }catch(err){
        console.log("Error in Checkout :", err)
        return res.status(422).json({"error":"Invalid Data!"});
    }
}

module.exports={get_orders,checkout}

