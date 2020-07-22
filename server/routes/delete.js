const express = require('express');
const router = express.Router();
const Task = require('../models/task')

router.post('/delTask', async function (req, res) {
    await Task.deleteOne({ _id: req.body.id })
    try {

        res.status(201).send()
    }
    catch (e) {
        console.log(e)
    }
});

module.exports = router