const mongoose = require("mongoose")

const [, , password, name, number] = process.argv

if (password == undefined) {
  console.log("No password given!")
  process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1:27017/phonebook?retryWrites=true&w=majority")
const Person = mongoose.model("Person", new mongoose.Schema({
  name: String,
  number: String
}))

if (name == undefined) {
  Person
    .find({})
    .then(result => {
      result.forEach(p => {
        console.log(p.name, p.number)
      })
      mongoose.connection.close()
    })
  return
}

const person = new Person({
  name: name,
  number: number
})

person
  .save()
  .then(result => {
    console.log("Created new person: ", result)
    mongoose.connection.close()
  })

