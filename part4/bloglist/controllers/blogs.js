const Blog = require("../models/blog")
const User = require("../models/user")
const { Router } = require("express")
require("express-async-errors")
const jwt = require("jsonwebtoken")

const blogsRouter = Router()

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({}).populate("user")
  response.json(blogs)
})

function extractToken(request) {
  const token = /(?<=Bearer ).*/.exec(request.get("authorization"))
  if (token) return token[0]
  return null
}

blogsRouter.post("/", async (request, response) => {
  let { title, author, url, likes = 0 } = request.body
  const { id } = jwt.verify(extractToken(request), process.env.SECRET)
  if (!id) {
    return response.status(401).json({ error: "Token invalid" })
  }
  const user = await User.findById(id)
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
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
  if (updatedBlog === null) return response.status(404).end()
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
