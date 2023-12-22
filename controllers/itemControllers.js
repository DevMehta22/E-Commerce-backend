const itemSchema = require('../models/item')

const get_item =(req,res)=>{
    itemSchema.find().sort({Date:-1}).then(items=>res.json(items));
}

 const add_item = (req,res)=>{
    const{title,discription,imageUrl,price,category,date} = req.body;
    if(!title || !discription||!imageUrl||!price||!category) 
        return res.status(400).json('enter complete information');
    const newItem = new itemSchema({
        title,
        discription,
        imageUrl,
        price,
        date,
        category
    })
    newItem.save().then(item => res.json(item));
 }

 const update_item = (req,res)=>{
    itemSchema.findByIdAndUpdate({_id:req.params.id},req.body).then(item=>{
        itemSchema.findOne({_id:req.params.id}).then(item =>{
            res.json(item);
        })
    })
 }

 const delete_item = (res,req)=>{
    itemSchema.findByIdAndDelete({_id:req.params.id}).then(()=>{
        res.json({success:true});
    });
 }
 module.exports={get_item,add_item,update_item,delete_item};