const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    }
})

personSchema.pre('save', async function(next){
    const person = this;
    //hash the password only if it has been modified or it is new
    if(!person.isModified('password')) return next();
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);
        
        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err)
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch (err) {
        throw err;
    }
}


//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;