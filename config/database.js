const mongoose = require('mongoose');

require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewURLParser: true,
    })
    .then(()=>{
        console.log("DB connection established")
    })
    .catch((error)=>{
        console.log("Error connecting to Mongo");
        console.error(error);
        process.exit(1);
    });
};