const express = require('express');
const router = express.Router();
const Task = require('../models/task')

const date = require('../functions/date')

router.post('/addTask', async function (req, res) {


    try {
        await Task.create({
            label: req.body.label,
            text: req.body.text,
            date: date.formattedDate()
        })
        res.status(201).send()
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router