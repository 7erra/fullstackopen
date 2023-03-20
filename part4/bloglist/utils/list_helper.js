const lodash = require("lodash")
function dummy() {
  return 1
}

function totalLikes(blogs) {
  return lodash(blogs)
    .sumBy("likes")
}

function favoriteBlog(blogs) {
  return lodash(blogs)
    .maxBy("likes")
}

function mostBlogs(blogs) {
  return lodash(blogs)
    .groupBy("author")
    .map((value, key) => ({ author: key, blogs: value.length }))
    .maxBy("blogs")
}

function mostLikes(blogs) {
  return lodash(blogs)
    .groupBy("author")
    .map((value, key) => {
      return {
        author: key,
        likes: lodash.sumBy(value, "likes")
      }
    })
    .maxBy("likes")
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

