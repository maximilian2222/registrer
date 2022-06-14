const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000
const app = express()



app.use(express.json())  // щоб парсити json, тепер сервер може парсити json який приходить в запитах.
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect( 'mongodb+srv://qwerty:12345@cluster0.vu6zqpz.mongodb.net/auth_roles?retryWrites=true&w=majority')
        app.listen(PORT,  () => console.log(`server started on port ${PORT} `))

    } catch (e) {
        console.log(e)
    }
}

start()