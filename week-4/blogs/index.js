const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notes')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', notesRouter)

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})