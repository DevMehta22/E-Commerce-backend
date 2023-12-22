require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const app = express()
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json())
app.use('/e-commerce/auth',authRoutes);
app.use('/e-commerce/product',itemRoutes);
app.use('/e-commerce/cartproduct',cartRoutes);
app.use('/e-commerce/orderproduct',orderRoutes);
// Connect to MongoDB database using Mongoose
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to DB!");
    const port = process.env.PORT || 3300;
    app.listen(port,(err)=>{
        if (err) throw err;
        console.log(`server is listening on port ${port}`)
    })
}).catch((err)=>{
    console.log(err);
})