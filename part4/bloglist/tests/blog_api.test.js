const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./helper")
const { default: mongoose } = require("mongoose")

const api = supertest(app)
const usersAPI = "/api/users"

beforeAll(async () => {
  for (let schema of [User, Blog]) {
    await schema.deleteMany({})
  }
})

beforeEach(async () => {
  await Blog.deleteMany({})

  await User.deleteMany({ username: helper.testUser.username })
})

describe("Blogs API", () => {
  describe("Getters", () => {
    test("Get all blogs", async () => {
      await Blog.insertMany(helper.initialBlogs)
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
  })

  describe("Authentication needed", () => {
    let token
    beforeAll(async () => {
      // Create new user
      const { body: user } = await api
        .post(usersAPI)
        .send(helper.permanentUser)
        .expect(201)
      // And log in
      let { body } = await api
        .post("/api/login/")
        .send({
          username: user.username,
          password: helper.permanentUser.password
        })
        .expect(200)
      token = body.token
    })

    test("Create new blog", async () => {
      const { body } = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(helper.testBlog)
        .expect(201)
        .expect("Content-Type", /json/)

      expect(body).toMatchObject(helper.testBlog)
    })

    test("Missing likes in request defaults to 0", async () => {
      // eslint-disable-next-line no-unused-vars
      const { likes: _, ...blogNoLikes } = helper.testBlog
      const { body } = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
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
          .set("Authorization", `Bearer ${token}`)
          .send(blog)
          .expect(400)
      }
    })

    test("Delete resource", async () => {
      const { body: { id } } = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(helper.testBlog)
        .expect(201)

      await api
        .delete(`/api/blogs/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204)
    })

    test("Delete resource (wrong id)", async () => {
      await api
        .delete("/api/blogs/xxx")
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
    })

    test("Missing auth", async () => {
      await api
        .delete("/api/blogs/1234")
        .expect(401)
    })

  })

  describe("Update", () => {
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

      await api
        .put(`/api/blogs/${id.toString()}`)
        .send({ likes: 456 })
        .expect(404)
    })
  })
})
describe("Users API", () => {

  test("Username must be defined", async () => {
    const { body: { error } } = await api
      .post(usersAPI)
      .send({ ...helper.testUser, username: undefined })
      .expect(400)

    expect(error).toBeDefined()
  })

  test("Password must be defined", async () => {
    const { body: { error } } = await api
      .post(usersAPI)
      .send({ ...helper.testUser, password: undefined })
      .expect(400)

    expect(error).toBeDefined()
  })

  test("Username has to be at least 3 chars long", async () => {
    const { body: { error } } = await api
      .post(usersAPI)
      .send({ ...helper.testUser, username: "Te" })
      .expect(400)

    expect(error).toBeDefined()
  })

  test("Password has to be at least 3 chars long", async () => {
    const { body: { error } } = await api
      .post(usersAPI)
      .send({ ...helper.testUser, password: "pa" })
      .expect(400)

    expect(error).toBeDefined()
  })

  test("Username must be unique", async () => {
    await api
      .post(usersAPI)
      .send(helper.testUser)
      .expect(201)

    const { body: { error } } = await api
      .post(usersAPI)
      .send(helper.testUser)
      .expect(400)

    expect(error).toBeDefined()
  })

})

afterAll(async () => {
  await User.deleteMany({})
  await mongoose.disconnect()
})
