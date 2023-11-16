const express = require('express');
const router = express.Router();
const User = require('../models/user');
const JsonWebToken = require('jsonwebtoken');
router.use(express.json());
const bcryptjs =  require('bcryptjs');




router.get('/', async(req,res)=>{
    try {
        const user = await User.find({});
        res.status(200).json({msg:"Jobify users", data:user});
    } catch (error) {
        res.status(500).json({errormsg:error.message});
    }
})


router.post("/register",async(req,res)=>{
    try {
        // const {name,email,password} = req.body;
        const user = await User.create({...req.body});
        res.status(200).json({msg:"User created",data:user});
    } catch (error) {
        res.status(500).json({errormsg:error.message});
    }
});

router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.find({email});

        //validate user
        if (!user.length > 0) {
            res.status(404).json({msg:"user is not found"});
        }

        // authenticate user
        if (user.length > 0) {
            const comparePassword = await bcryptjs.compare(password, user[0].password);
            console.log(user[0]._id);
            if (comparePassword) {
                const token = JsonWebToken.sign({name: user[0].name, id: user[0]._id}, process.env.ACCESS_TOKEN,{expiresIn:"30m"})
                res.status(200).json({msg: "logged in successfull", token})
                // res.json(user)
            }
        }
    } catch (error) {
        res.status(500).json({errormsg:error.message});
    }
})


module.exports = router;