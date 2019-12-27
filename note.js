const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URL || 'mongodb+srv://fullstack:qwerty1234@cluster0-rrpmz.mongodb.net/note-app?retryWrites=true&w=majority'

console.log('conection to', url);

mongoose.connect(url, { useUnifiedTopology: true,useNewUrlParser: true})
    .then(result => {
        console.log("Conection to Mongodb")
    })
    .catch(error => {
        console.log('error conection', error.message)
    })


const noteShchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteShchema.set('toJSON', {
    transform: (document, returnObj) => {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
    }
})


module.exports = mongoose.model('Note', noteShchema);