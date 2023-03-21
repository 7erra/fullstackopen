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

test("Create new blog", async () => {
  const { body } = await api
    .post("/api/blogs")
    .send(helper.testBlog)
    .expect(201)
    .expect("Content-Type", /json/)

  expect(body).toMatchObject(helper.testBlog)

  const { body: allBlogs } = await api.get("/api/blogs")
  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
})

test("Missing likes in request defaults to 0", async () => {
  // eslint-disable-next-line no-unused-vars
  const { likes: _, ...blogNoLikes } = helper.testBlog
  const { body } = await api
    .post("/api/blogs")
    .send(blogNoLikes)
    .expect(201)
    .expect("Content-Type", /json/)

  expect(body.likes).toBe(0)
})

test("Missing title/url results in error code 400", async () => {
  for (let removed of ["url", "title"]) {
    const { [removed]: _, ...blog } = helper.testBlog
    await api
      .post("/api/blogs")
      .send(blog)
      .expect(400)
  }
})


test("Delete resource", async () => {
  const { id } = await helper.createTempBlog()
  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
})

test("Delete resource (wrong id)", async () => {
  await api
    .delete("/api/blogs/xxx")
    .expect(400)
})

test("Update resource", async () => {
  const newLikes = 456
  const newBlog = await helper.createTempBlog()
  const { body } = await api
    .put(`/api/blogs/${newBlog.id}`)
    .send({ likes: newLikes })
    .expect(200)
  expect(body.likes).toBe(newLikes)
})

test("Update resource (404)", async () => {
  const id = new mongoose.Types.ObjectId()
  console.log(id)

  await api
    .put(`/api/blogs/${id.toString()}`)
    .send({ likes: 456 })
    .expect(404)

})

afterAll(async () => {
  await mongoose.disconnect()
})
