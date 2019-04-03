const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')
const mongoose = require('mongoose')

app.use(express.static('build'))
app.use(cors())

app.use(bodyParser.json())

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function formatPerson(person){
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

//return all resources
app.get('/api/persons', (request, response) => {
    console.log('puhelinluettelo:')
    Person
        .find({})
        .then(result => {
            let persons = []
            result.forEach(person => {
                persons = persons.concat(formatPerson(person))
            })
            response.json(persons)
            console.log(persons)
        })
})

//return a single resource
app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(formatPerson(person))
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error: 'malformatted id'})
        })
})

//delete a resource
app.delete('/api/persons/:id', (request, response) => {
    console.log(request.params.id)
    Person
        .findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(() => {
            response.status(400).send({error: 'malformatted id'})
        })
})

//add a resource
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'name or number missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: getRandomInt(1,99999999)
    })
    Person
        .find({name: person.name})
        .then(result => {
            if (result == null) {
                return response.status(400).json({error: 'name must be unique'})
            }
        else {
            person
                .save()
                .then(savedPerson => {
                    response.json(formatPerson(savedPerson))
                })
            }
        }).catch(error => console.log(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
