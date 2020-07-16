const express = require('express');
const router = express.Router();
const Task = require('../models/task')

router.get('/getTasks',async function(req, res) {
    const tasks = await Task.find({})
    try{
        res.json(tasks)
        res.end()
    }
    catch(e){
        console.log(e)
    }
    

    
});


module.exports = router