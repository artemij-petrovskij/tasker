const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const mainRoute = require('./routes/main')
const getTask = require('./routes/posts')
const addTask = require('./routes/create')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/', mainRoute)
app.use('/', getTask)
app.use('/api', addTask)


const PORT = 3000 || process.env.PORT
let PASS = process.env.MONGO_DB_PASS

if(!!!PASS){
    const config = require('./config')
    PASS = config.password
}

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://user1:${PASS}@cluster0-nmc55.mongodb.net/Tasks`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        app.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`)
        })
    } catch(e){
        console.log(e)
    }
}

start()