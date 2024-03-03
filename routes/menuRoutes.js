const express = require('express');
const router = express.Router();
const menuItem = require('../models/menu.js');

//post route to add a item in database
router.post('/', async(req, res)=>{
    try {
        const data = req.body;
        const newItem = new menuItem(data);
        const response = await newItem.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
})

//get method to get or read the data
router.get('/', async(req, res)=>{
    try {
        const data = await menuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
})


module.exports = router;