const mongoose = require('mongoose')
require('dotenv').config()

// Replace with the URL of your own database. Do not store the password on GitHub!

const url = `mongodb+srv://SL_WMP_tester:${process.env.MONGOOSE_PASSWORD}@fullstack-address-book-bxrq4.mongodb.net/fullstack-address-book`

mongoose.connect(url,  { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person