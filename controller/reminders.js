const Reminder = require('../models/reminders')
const { StatusCodes } = require('http-status-codes')


const getAllReminders = async (req, res) => {
    const { user, after, sortBy } = req.query

    const userSearch = user ? new RegExp(user, 'i') : null
    const afterDate = after ? new Date(after) : null

    let allReminders = await Reminder.find({})

    // filter by user
    if (user) {
        allReminders = allReminders.filter(({ user }) => userSearch.test(user))
    }

    // filter by date
    if (afterDate && !isNaN(afterDate)) {
        allReminders = allReminders.filter(({ date }) => new Date(date) > afterDate)
    }

    // sort results
    if (sortBy === 'user') {
        allReminders.sort((a, b) => a.user.localeCompare(b.user))
    } else if (sortBy === 'date') {
        allReminders.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    res.status(StatusCodes.OK).json({ count: allReminders.length, allReminders })
}


const getReminder = async (req, res) => {
    const { id } = req.params
    const reminder = await Reminder.findById(id)

    if (!reminder) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No reminder found with id ${id}` })
    }
    res.status(StatusCodes.OK).json(reminder)
}

const createReminder = async (req, res) => {
    try {
        const { user, description, date } = req.body
        const reminder = await Reminder.create({ user, description, date })
        const { _id, data } = reminder

        res.status(StatusCodes.CREATED).json({
            id: _id,
            user,
            description,
            date
        })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
    }
}

const updateReminder = async (req, res) => {
    const { user, description, date } = req.body
    const { id } = req.params
    if (!user || user.trim() === '' || !description || description.trim() === '') {
        throw new Error('cannnot update reminder without user and description')
    }

    const reminder = await Reminder.findOneAndUpdate({ _id: id }, { user, description, date }, { new: true, runValidators: true })

    if (!reminder) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No reminder found with id ${id}` })
    }
    res.status(StatusCodes.OK).json(reminder)
}


const deleteReminder = async (req, res) => {
    const { id } = req.params
    const reminder = await Reminder.findOneAndDelete({ _id: id })

    if (!reminder) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No reminder found with id ${id}` })
    }
    res.status(StatusCodes.OK).json({ msg: 'Job successfully deleted.' })
}


module.exports = {
    getAllReminders,
    getReminder,
    createReminder,
    updateReminder,
    deleteReminder
}
