const Blog = require("../models/blog")
const { Router } = require("express")
require("express-async-errors")

const blogsRouter = Router()

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  let body = { ...request.body, likes: request.body.likes ?? 0 }
  const blog = new Blog(body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
  if (updatedBlog === null) return response.status(404).end()
  console.log(updatedBlog)
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
