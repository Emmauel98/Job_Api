const express = require('express');
const routeNotFound = require('../middlewares/NotFound');
const connectToDB = require('../Database/db');
const Userroute = require('../routes/user');
const JobListingroute = require('../routes/job');
const authentication = require('../middlewares/authentication');
const app = express();
require('dotenv').config();


// parse json middleware
app.use(express.json());


//User route
app.use("/api/v1/user",Userroute);

//JobListing route
app.use("/api/v1/job", authentication ,JobListingroute);

//Middleware for unknown routes 
app.use(routeNotFound);

const PORT =  3007 || process.env.PORT;

const start = async() =>{
    try {
        connectToDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`server is running on port ${PORT}`));
    } catch (error) {
        console.log(error.message)
    }
};
start();