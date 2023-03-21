const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String
})

userSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret.passwordHash
    delete ret.__v
    delete ret._id
  }
})

module.exports = mongoose.model("User", userSchema)
