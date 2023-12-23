const cartSchema = require('../models/cart');
const itemSchema = require('../models/item');

const get_cartItems = async(req,res)=>{
    const userId = req.params.id;
    try{
        let items = await cartSchema.findOne({userId});
        if(!items){
            res.status(401).json("No Items in the Cart");
        }
        else{
            res.status(200).json(items);
        }
    }catch(err){
        console.log("Error in getting Cart Items : ", err);
        res.status(500).json({"error": "Internal Server Error!"})
    }
}

const add_cartItems = async(req,res)=>{
    const userId = req.params.id;
    const{productId,quantity} = req.body;
    //Checking whether product is already added or not
    try {
        let cart = await cartSchema.findOne({userId});
        let item = await itemSchema.findOne({_id:productId});
        console.log(item)
         if(!item){
            return res.status(404).send("Product Not Found!");
         }
         const price = item.price;
         const name = item.title;
         const imageUrl = item.imageUrl;
         if (cart) {
            let existItemIndex = cart.items.findIndex((val)=> val.productId==productId);
            if(existItemIndex!=-1){
                //If Item Already Exists then just update its quantity
                cart.items[existItemIndex].quantity+=quantity;
                
            }else{
                //If Item doesnot exists then push it into items array of cart
                cart.items.push({productId,name,quantity,price,imageUrl});
                
            }
            cart.bill +=quantity*price;
            cart = await cart.save();
            res.status(201).send(cart);
         }
         else{
            let newCart=new cartSchema({
                userId,
                items:[{productId,name,quantity,price,imageUrl}],
                bill:quantity*price
                });
                newCart.save().then(cart=>{res.status(201).send(cart);})
         }
        
    } catch (error) {
        console.log('Error in adding to cart ', error);
        res.status(500).json({"error":"Internal server error!"});
    }
}

const delete_cartItems = async(req,res)=>{
    const userId = req.params.userId;
    const productId = req.params.itemId;
    // console.log(userId,'\n',productId);
    try {
        let cart  = await cartSchema.findOne({userId});
        // console.log("cart:",cart);
        let existItemIndex = cart.items.findIndex((val)=> val.productId==productId);
            if(existItemIndex!=-1){
                cart.bill-=cart.items[existItemIndex].quantity*cart.items[existItemIndex].price;
                cart.items.splice(existItemIndex,1);
            }
            await cart.save()
                return res.status(201).send(cart);
           

    }catch(err){
        console.log(err);
        return res.status(500).json({"error": "Server Error!"});
    }

}

module.exports = {get_cartItems,add_cartItems,delete_cartItems};