const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mainRoute = require('./routes/main')

app.use('/', mainRoute)



const PORT = 3000 || process.env.PORT
let PASS = process.env.MONGO_DB_PASS

if(!!!PASS){
    const config = require('./config')
    PASS = config.password
}

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://user1:${PASS}@cluster0-nmc55.mongodb.net/Bookshelf`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`)
        })
    } catch(e){
        console.log(e)
    }
}

start()