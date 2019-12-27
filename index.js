require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Note = require('./note');


// if (process.argv.length < 3) {
//     console.log('give pass as arument');
//     process.exit()
// }


// mongoose.connect(url, {
//     useNewUrlParser: true
// })

// const Note = mongoose.model("Note", noteShchema);


app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))


// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>')
// })

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        console.log('send data');        
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        res.json(note.toJSON())
    })
    .catch(err => {
        console.log(err);
        res.status(404).end();
    })
})

app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0
    return maxId + 1
}

app.post('/notes', (req, res) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({error: 'content missing'})
    }

    const note = new Note( {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    })
    
    note.save().then(noteSave => {
        res.json(noteSave.toJSON())
    })
})

// app.put('/notes/:id', (req, res) => {
//     const body = req.body;

// })

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Start server on ${PORT}`)
})