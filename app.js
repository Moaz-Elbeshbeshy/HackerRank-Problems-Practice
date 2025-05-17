const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connect')
require('dotenv').config()

// router
const productsRouter = require('./routes/products')

const app = express()
port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())


app.use('/products', productsRouter)

const start = async (port) => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port,
            console.log(`Server listenning on port ${port}...`)
        )
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

start(port)