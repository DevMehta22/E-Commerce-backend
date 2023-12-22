require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const app = express()

app.use(express.json())
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