const mongoose = require('mongoose')
const reminders = require('./reminders.json')
const Reminder = require('./models/reminders')
const connectDB = require('./db/connectDB')
require('dotenv').config()

const populate = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Reminder.deleteMany()
        await Reminder.create(reminders)
        console.log('Data populated successfully')
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

populate()