const mongoose = require('mongoose')
require('dotenv').config();
//define mongodb connection url
//const mongoURL = process.env.MONGODB_URL
const mongoURL = process.env.MONGODB_URL_LOCAL

//set up mongoose connection
mongoose.connect(mongoURL,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})

//Get the default connection
//mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;
db.on('connected', ()=>{
    console.log('Connected to MongoDB server...');
})

db.on('error', ()=>{
    console.log('MongoDB connection error: ', err);
})

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
})

//export database connection
module.exports = db