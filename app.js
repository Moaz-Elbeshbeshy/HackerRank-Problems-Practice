const express = require('express')
const connectDB = require('./db/connectDB')
const path = require('path')
require('dotenv').config()
const remindersRouter = require('./routes/reminders')
const homeRouter = require('./routes/index')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use('/', homeRouter)
app.use('/reminders', remindersRouter)



const start = async (port) => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,
            console.log(`Server listenning on port ${port}...`)
        )
    } catch (error) {
        console.error(error)
    }
}

start(port)