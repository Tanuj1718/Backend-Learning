const express = require('express')
const router = express.Router();
const Person = require('../models/person.js')
const {jwtAuthMiddleware, generateToken} = require('./../jwt.js')

//post route to add a person
router.post('/signup', async(req, res)=>{
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        
        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is: ", token);
        res.status(200).json({response: response, token: token});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
})

//get method to get the data
router.get('/', async(req, res)=>{
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
})

router.get('/:workType', async(req, res)=>{
    try {
        const workType = req.params.workType; //extract the worktype from url parameter
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response = await Person.find({work: workType});
            console.log('data fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: "Invalid work type"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
})

module.exports = router
