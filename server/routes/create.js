const express = require('express');
const router = express.Router();
const Task = require('../models/task')

router.post('/addTask', async function (req, res) {


    try {
        await Task.create({
            label: req.body.label,
            text: req.body.text,
            date: new Date()
        })
        res.status(201).send()
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router