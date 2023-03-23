const Blog = require("../models/blog")
const User = require("../models/user")
const { Router } = require("express")
require("express-async-errors")

const blogsRouter = Router()

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({}).populate("user")
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  let { title, author, url, likes = 0 } = request.body
  const user = await User.findById(request.user)
  if (!user) {
    response.status(404).end()
  }
  const blog = new Blog({ title, author, url, likes, user: user.id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  const fSuccess = () => response.status(204).end()
  const { id } = request.params
  const blog = await Blog.findById(id)
  if (!blog) {
    fSuccess()
    return
  }
  if (blog.user.toString() !== request.user) {
    return response.status(401).send({ error: "Can't delete note that belongs to another user!" })
  }
  await Blog.findByIdAndDelete(id)
  fSuccess()
})

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
  if (updatedBlog === null) return response.status(404).end()
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
