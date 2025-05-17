const express = require('express')
const app = express()
require('dotenv').config()
const bookRouter = require('./routes/books')

const port = process.env.PORT || 3000

app.use(express.json())

// Router
app.use('/books', bookRouter)




const start = (port) => {
    app.listen(port,
        console.log(`Server listenning on port ${port}...`)
    )
}

start(port)