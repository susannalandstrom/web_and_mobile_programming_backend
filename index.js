const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())

app.use(bodyParser.json())

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Please visit <a>https://agile-crag-45594.herokuapp.com/api/persons</a></h1>')
})

//return all resources
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

//return a single resource
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

//delete a resource
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

//add a resource
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'name or number missing'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandomInt(1,99999999)
    }

    const notUniquePerson = persons.find(persona => persona.name === person.name)

    if (notUniquePerson) {
        return response.status(400).json({error: 'name must be unique'})
    }
    else {
        persons = persons.concat(person)
        response.json(person)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
