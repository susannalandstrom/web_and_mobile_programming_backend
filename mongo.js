const Person = require('./models/person')
const mongoose = require('mongoose')

if (process.argv.length === 4) {
    const name = process.argv[2]
    const number = process.argv[3]
    const person = new Person({name: name, number: number})
    person
        .save()
        .then(() => {
            console.log(`adding person ${name} number ${number} to the directory`)
            mongoose.connection.close()
        })
}
else if (process.argv.length === 3 || process.argv.length > 4) {
    console.log('You must give name and number')
    mongoose.connection.close()
}
else {
    console.log('puhelinluettelo:')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}
