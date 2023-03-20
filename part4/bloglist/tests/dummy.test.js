const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require("../utils/list_helper")

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]
const testBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]
describe("Dummy tests", () => {
  test("Dummy is always 1", () => {
    const blogs = []
    expect(dummy(blogs)).toBe(1)
  })
})

describe("Total likes", () => {
  test("sum of likes of list with one blog entry is the amount of likes of that entry", () => {
    expect(totalLikes(listWithOneBlog))
      .toBe(5)
  })
})
describe("Most liked", () => {
  test("Most liked blog (one element list)", () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test("Most liked blog (test data)", () => {
    expect(favoriteBlog(testBlogs).likes).toBe(12)
  })
})

describe("Most blogs", () => {
  test("Author with most blogs (one element list)", () => {
    expect(mostBlogs(listWithOneBlog))
      .toEqual({
        author: "Edsger W. Dijkstra",
        blogs: 1
      })
  })

  test("Author with most blogs (test data)", () => {
    expect(mostBlogs(testBlogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe("Most likes", () => {
  test("Author with most likes (one element list)", () => {
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5
    })
  })

  test("Author with most likes (test data)", () => {
    expect(mostLikes(testBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})
