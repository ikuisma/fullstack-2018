const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/user')

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult,
            blogs: [],
            passwordHash
        })
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'Server error. ' })
    }
})

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({}).populate('blogs')
        response.json(users.map(User.format))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'Server error. ' })
    }
})

module.exports = usersRouter