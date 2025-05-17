const mongoose = require('mongoose')

const reminderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'Please provide name for user'],
        trim: true,
        maxlength: 50,
        minlength: 2
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: 100,
        minlength: 5,
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Please provide date']
    }
}, { timestamps: false })

module.exports = mongoose.model('Reminder', reminderSchema)