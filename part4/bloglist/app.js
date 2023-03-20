const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs.js")
const config = require("./utils/config")
const logger = require("./utils/logger")

logger.info(config.MONGO_URL)
mongoose.connect(config.MONGO_URL).then(() => logger.info("Connected to database"))

const app = express()

app.use(
  cors(),
  express.json()
)

app.use("/api/blogs/", blogsRouter)

module.exports = app
