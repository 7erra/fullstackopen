const mongoose = require("mongoose")
require("dotenv").config()

const [, , password] = process.argv
const url = process.env.MONGODB_URI

if (password === undefined) {
  console.log("No password given!")
  process.exit(1)
}

mongoose.set("strictQuery", false)
console.log("Connecting to ", url)
mongoose.connect(url)
  .then(() => console.log("Connected!"))
  .catch((error) => {
    console.log("Error trying to connect to database: ", error.message)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => /^\d{2,3}-\d+$/.test(v),
      message: (props) => `${props.value} is not a valid phone number. Must have format: 12[3]-4567...`,
    },
  },
})
personSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})
const Person = mongoose.model("Person", personSchema)

module.exports = Person
