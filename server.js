const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //store in req.body
require('dotenv').config();

const PORT = process.env.PORT || 3000;


app.get('/', (req, res)=>{
    res.json(`Welcome to our Hotel!!`)
})

//import the router files
const personRoutes = require('./routes/personRoutes.js')
//use the routers
app.use('/person', personRoutes)

//import the menu router file
const menuRoutes = require('./routes/menuRoutes.js')
//use the routers
app.use('/menuItem', menuRoutes)


app.listen(3000, ()=>{
    console.log('listening on port 3000')
})

