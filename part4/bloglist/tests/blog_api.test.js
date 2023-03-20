const supertest = require("supertest")
const app = require("../app")
const Note = require("../models/blog")
const helper = require("./helper")
const { default: mongoose } = require("mongoose")

const api = supertest(app)
const newBlog = {
  title: "Fullstack",
  url: "fullstackopen.com",
  likes: 123,
  author: "University of Helsinki"
}

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

test("Create new blog", async () => {
  const { body } = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /json/)

  expect(body).toMatchObject(newBlog)

  const { body: allBlogs } = await api.get("/api/blogs")
  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
})

test("Missing likes in request defaults to 0", async () => {
  // eslint-disable-next-line no-unused-vars
  const { likes: _, ...blogNoLikes } = newBlog
  const { body } = await api
    .post("/api/blogs")
    .send(blogNoLikes)
    .expect(201)
    .expect("Content-Type", /json/)

  expect(body.likes).toBe(0)
})

test("Missing title/url results in error code 400", async () => {
  for (let removed of ["url", "title"]) {
    const { [removed]: _, ...blog } = newBlog
    await api
      .post("/api/blogs")
      .send(blog)
      .expect(400)
  }
})

test("Delete resource", async () => {
  const { body } = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)

  await api
    .delete(`/api/blogs/${body.id}`)
    .expect(204)
})

test("Delete resource (wrong id)", async () => {
  await api
    .delete("/api/blogs/xxx")
    .expect(400)
})

afterAll(async () => {
  await mongoose.disconnect()
})
