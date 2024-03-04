const passport = require("passport");
const Person  = require('./models/person.js')
const LocalStrategy = require('passport-local').Strategy;


//authentication
passport.use(new LocalStrategy(async (username, password, done)=>{
    try {
        // console.log('Received credentials:', USERNAME, PASSWORD)
        const user = await Person.findOne({username})
        if(!user) return done(null, false, {message: "Incorrect username."})
        
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user)
        } else{
            return done(null, false, {message: "Incorrect password."});
        }
    } catch (error) {
        return done(error);
    }
}))

module.exports = passport;