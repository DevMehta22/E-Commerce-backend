require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');

const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        //check if email and password are provided
        if(!email || !password) 
        return res.status(400).send({msg:"Please provide an email and a password"});
    //find the user by email
    const user = await userSchema.findOne({email:email});
    if(user){
        //if user exists check the password
        const isMatch =await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).send({ msg: 'Invalid Password' });
        //create token
        jwt.sign(
            {id:user._id},
            process.env.SECRET_KEY ,
            {expiresIn:'3d'},
            (err,token)=> {
                if (err) throw err;
                res.json({
                    token,
                    user:{
                        id : user.id,
                        name : user.name,
                        email : user.email
                        }
                });
            }
        )
    }else{
        return res.status(400).send({msg:"User does not exist!"})
    }
}catch(err){
    console.log(err);
}
}

const signup = async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).send("please include Name, Email and Password");
    }

    const ifUser = await userSchema.findOne({email});
    if(ifUser) return res.status(400).send("Email already in use");
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) throw err;
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err;
            const user = new userSchema({
                name,
                email,
                password:hash
                })
                user.save()
                .then(data=>{
                    jwt.sign(
                        {id:user._id},
                        process.env.SECRET_KEY,
                        { expiresIn: "3d" },
                        (err,token)=>{
                            if(err)throw err;
                            res.json({
                                token,
                                user:{
                                    name:data.name,
                                    email:data.email
                                }
                            })
                        }
                    )
                })
        })
    })
}

const get_user = (req,res)=>{
    userSchema.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user));
}
module.exports = {login,signup,get_user}

