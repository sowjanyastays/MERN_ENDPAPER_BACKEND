require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bookRoute = require('./routes/booksRoute')

const app = express()
const PORT = 3500


app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', errorMessage =>console.log(errorMessage))
db.once('open',()=>console.log("Connected to db"))


app.get('/',(request, response)=>{
    response.send("Its working!")
})
app.use('/api/v1/books', bookRoute)


app.listen(PORT,()=>console.log(`Listening to port ${PORT}`))
