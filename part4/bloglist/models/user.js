const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  }]
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
