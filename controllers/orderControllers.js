require('dotenv').config();
const orderSchema = require('../models/order');
const cartSchema = require('../models/cart');
const userSchema = require('../models/user');

const stripe = require('stripe')(process.env.StripeAPIKey);

const get_orders = async (req, res) => {
    try {
        const userId = req.params.id;
        orderSchema.find({ userId }).sort({ date: -1 }).then(orders => res.json(orders));
    } catch (err) {
        console.log("Error in getting orders: ", err);
        res.status(500).json({ "error": "Internal Server Error!" });
    }
}

const checkout = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                token:'tok_visa'
            }
    });
    console.log("payment Mehtod\n",paymentMethod);

        
        let cart = await cartSchema.findOne({ userId });
        let user = await userSchema.findOne({ _id: userId });
        const email = user.email;

        if (cart) {
            
            const paymentIntent = await stripe.paymentIntents.create({
                amount: cart.bill * 100,  
                currency: 'inr',
                payment_method: paymentMethod.id,
                receipt_email: email,
                metadata: {
                    userId: userId,
                    orderId: `order_${new Date().getTime()}`
                },
                
                confirm:true,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never'  
                }
            });
            console.log("payment Intent\n",paymentIntent)

           
            if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
                
                return res.status(200).json({
                    requiresAction: true,
                    clientSecret: paymentIntent.client_secret
                });
            } else if (paymentIntent.status === 'succeeded') {
                
                const order = await orderSchema.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill,  
                    date: new Date(), 
                });


                
                await cartSchema.findByIdAndDelete({ _id: cart._id });

                return res.status(201).json(order);
            } else {
                throw new Error('Payment failed');
            }

        } else {
            return res.status(404).json({ message: "Cart not found." });
        }

    } catch (err) {
        console.log("Error in Checkout: ", err);
        return res.status(422).json({ "error": "Invalid Data!" });
    }
}

module.exports = { checkout, get_orders };
