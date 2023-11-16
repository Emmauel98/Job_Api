const mongoose = require('mongoose');
const bcryptjs =  require('bcryptjs');
const JsonWebToken = require('jsonwebtoken');


const Users =  new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a Name"],
        maxlength:[24, "Name Must Not be too Long"],
    },
    email:{
        type: String,
        required: [true, "Please provide a Name"],
        unique: true,
        match: [ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please provide a valid email"],
    },
    password:{
        type: String,
        required: [true, "Please provide a Name"],
        minlength: 6,
    },
});

Users.pre('save', async function(error){
    try {
        this.password =  await bcryptjs.hash(this.password,10);
    } catch (error) {
        next(error);
    }
});



module.exports = mongoose.model('Users',Users);