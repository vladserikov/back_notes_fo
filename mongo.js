const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give pass as arument');
    process.exit()
}
const str = `qwerty1234`
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-rrpmz.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true
})

const noteShchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model("Note", noteShchema);

// const note = new Note({
//     content: "Define note",
//     date: new Date(),
//     important: true,
// })

// note.save().then(res => {
//     console.log('note save');
//     console.log(res);
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.map(note => {
        console.log(note);
    })
    mongoose.connection.close()
})