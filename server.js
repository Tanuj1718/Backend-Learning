const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //store in req.body
require('dotenv').config();
const passport = require('./auth.js');
const PORT = process.env.PORT || 3000;


//middleware function
const logRequest = (req, res, next)=>{
    console.log(`${[new Date().toLocaleString()]
    } `)
    //Request Made to: ${req.originalUrl}
    next();
}

app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

//------------------------------------------------------------//

app.get('/', localAuthMiddleware, logRequest, (req, res) =>{
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

