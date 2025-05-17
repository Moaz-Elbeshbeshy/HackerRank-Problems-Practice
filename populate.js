const mongoose = require('mongoose')
const products = require('./products.json')
const Product = require('./models/products')
require('dotenv').config()

const populate = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to database')
        await Product.deleteMany()
        await Product.create(products)
        console.log('Successfully populated database')
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

populate()