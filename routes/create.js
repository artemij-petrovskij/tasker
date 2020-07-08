const express = require('express');
const router = express.Router();
const Task = require('../models/task')

router.post('/addTask',async function(req, res) {
    console.log(req.body)
    const task = new Task({
        label: req.body.label,
        text: req.body.text,
    })

    try{
        await task.save()
    }
    catch(e){
        console.log(e)
    }  
})


module.exports = router