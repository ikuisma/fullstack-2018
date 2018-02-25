const supertest = require('supertest')
const { app, server } = require('../index')
const User = require('../model/user')
const api = supertest(app)
const { usersInDb } = require('./test_helper')


describe('when there is only one user in the database', () => {

    beforeAll(async () => {
        await User.remove({})
        const user = new User({username: 'PaavoUser', name:'Paavo', password: 'Ovaap', adult: true})
        await user.save()
    })
    
    test('GET /api/users returns all users in the database', async () => {
        const usersBefore = await usersInDb()
        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.length).toBe(usersBefore.length)
    })

    test('POST /api/users succeeds with a new username', async () => {
        const newUser = {
            username: 'MasiUser',
            name: 'Masi',
            password: 'Isam',
            adult: true
        }
        const usersBefore = await usersInDb()
        await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const usersAfter = await usersInDb()
        expect(usersAfter.length).toBe(usersBefore.length + 1)
    })
        
    afterAll(async () => {
        await server.close()
    })
})
