const supertest = require("supertest")
const app = require("../app")
const Note = require("../models/blog")
const helper = require("./helper")
const { default: mongoose } = require("mongoose")

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialBlogs)
})

test("Get all blogs", async () => {
  const { body } = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
  expect(body).toHaveLength(helper.initialBlogs.length)
})

test("Correct ID", async () => {
  const { body } = await api.get("/api/blogs")
  body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})
