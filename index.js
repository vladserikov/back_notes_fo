require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Note = require('./note');

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())


app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {    
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        if (note) {
            res.json(note.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).send({error: 'malformed id'});
    })
})


app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

app.post('/api/notes', (req, res) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({error: 'content missing'})
    }

    const note = new Note( {
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    
    note.save().then(noteSave => {
        res.json(noteSave.toJSON())
    })
})

app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body;

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, {new: true})
        .then(updateNote => {
            res.json(updateNote.toJSON())
        })
        .catch(err => next(err))
})

const uknowEndPoint = (req, res) => {
    res.status(400).send({ error: 'unknow endpoint' })
}

app.use(uknowEndPoint)

const errorHandle = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id'})
    }
    next(error)
}

app.use(errorHandle)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Start server on ${PORT}`)
})