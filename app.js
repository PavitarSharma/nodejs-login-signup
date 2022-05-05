const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 8000
const app = express()

// mongodb connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database connection successfully..'))
.catch(err => console.log('Database connection error!', err.message))

app.use(bodyParser.json())
app.use(cors())


// routes
const userRoutes = require('./routes/userRoutes')

app.use('/user', userRoutes)

app.listen(PORT, () => console.log(`Server listening on ${PORT}....`))