const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  let errorMessage
  if (password === undefined) {
    errorMessage = "No password given!"
  } else if (username === undefined) {
    errorMessage = "No username given!"
  } else if (password.length < 3) {
    errorMessage = "Password too short! Must have at least 3 characters!"
  } else if (await User.findOne({ username })) {
    errorMessage = "Username already taken!"
  }
  if (errorMessage) return response.status(400).send({ error: errorMessage })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get("/", async (_, res) => {
  const users = await User.find({}).populate("blogs")
  res.status(200).json(users)
})

module.exports = usersRouter
