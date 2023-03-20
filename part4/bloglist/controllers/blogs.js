const Blog = require("../models/blog")
const { Router } = require("express")

const blogsRouter = Router()

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  let body = { ...request.body, likes: request.body.likes ?? 0 }
  if (body.url === undefined || body.title === undefined) {
    response.status(400).end()
    return
  }
  const blog = new Blog(body)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
