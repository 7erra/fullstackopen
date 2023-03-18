const mongoose = require("mongoose")
require("dotenv").config()
const [, , password, name, number] = process.argv
const url = process.env.MONGODB_URI

if (password == undefined) {
  console.log("No password given!")
  process.exit(1)
}

mongoose.set('strictQuery', false)
console.log("Connecting to ", url)
mongoose.connect(url)
  .then(() => console.log("Connected!"))
  .catch(error => console.log("Error trying to connect to database: ", error.message))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
personSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})
const Person = mongoose.model("Person", personSchema)

module.exports = Person
