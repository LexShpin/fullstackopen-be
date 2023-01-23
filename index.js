require('dotenv').config()
const express = require('express')
const requestLogger = require('./middleware/requestLogger')
const uknownEndpoint = require('./middleware/uknownEndpoint')
const cors = require('cors')
const Note = require('./models/note')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(requestLogger)
app.use(errorHandler)



let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
]

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

app.get('/', (req, res) => {
    res.send('<h1>Hello, world!</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        console.log(notes)
        res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))

})

app.delete('/api/notes/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

app.post('/api/notes', (req, res, next) => {

    const body = req.body

    if (!body.content) {
        return res.status(404).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save()
        .then(savedNote => {
            res.json(savedNote)
        })
        .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, {new: true, runValidators: true, context: 'query'})
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(err => next(err))
})

const PORT = process.env.PORT || 3002 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
