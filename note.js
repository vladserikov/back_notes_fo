const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URL

console.log('conection to', url);

mongoose.connect(url, { useUnifiedTopology: true,useNewUrlParser: true})
    .then(result => {
        console.log("Conection to Mongodb")
    })
    .catch(error => {
        console.log('error conection', error.message)
    })


const noteShchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
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