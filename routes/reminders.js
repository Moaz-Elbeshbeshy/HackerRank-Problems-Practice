const express = require('express')
const router = express.Router()

const {
    getAllReminders,
    getReminder,
    createReminder,
    updateReminder,
    deleteReminder
} = require('../controller/reminders')

router.route('/').post(createReminder).get(getAllReminders)
router.route('/:id').get(getReminder).patch(updateReminder).delete(deleteReminder)

module.exports = router