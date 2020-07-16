const express = require('express');
const router = express.Router();
const Task = require('../models/task')

router.post('/delTask', async function (req, res) {
    const tasks = await Task.deleteOne({ _id: req.body.id })
    try {
        res.json(tasks)
        res.end()
    }
    catch (e) {
        console.log(e)
    }
});

module.exports = router