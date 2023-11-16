const mongoose = require('mongoose');



const JobListing =  new mongoose.Schema({
    Title:{
        type: String,
        required: [true, "Please provide a Name"],
    },
    Description:{
        type: String,
        required: [true, "Please provide a Name"],
        minlength:[12, "Name Must Not be too short"],
    },
    Company:{
        type: String,
        required: [true, "Please provide a Name"],
    },
    Location:{
        type: String,
        required: [true, "Please provide a Name"],
    },
    Salary:{
        type: String,
        required: [true, "Please provide a Name"],
    },
    Requirements:{
        type: [],
        required: [true, "Please provide a Name"],
    },
    Responsibilities:{
        type: [],
        required: [true, "Please provide a Name"],
    },
    PostedDate:{
        type: Date,
        default: Date.now(),
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
},
{ timestamps: true },
);

module.exports = mongoose.model("JobListing",JobListing)





