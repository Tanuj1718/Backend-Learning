const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next)=>{
    
    //extrat jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try {
        //verify jwt token
        jwt.verify(token, process.env.JWT_SECRET);

        //attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

//function to generate jwt token
const generateToken = (userData)=>{
    //generate a new jwt token using user data
}

module.exports = {jwtAuthMiddleware, generateToken};