const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs.js")

const mongoUrl = "mongodb://127.0.0.1:27017/bloglist?retryWrites=true"
mongoose.connect(mongoUrl).then(() => console.log("Connected to database"))

const app = express()

app.use(
  cors(),
  express.json()
)

app.use("/api/blogs/", blogsRouter)

module.exports = app
