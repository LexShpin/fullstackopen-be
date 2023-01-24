const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://root:${password}@cluster0.kun5rsk.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'HTML is easy',
//     important: true
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

const note = new Note({
  content: 'Third one',
  important: true
})

note.save()
  .then(result => {
    mongoose.connection.close()
  })

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })
