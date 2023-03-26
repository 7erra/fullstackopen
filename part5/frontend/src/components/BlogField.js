const BlogField = ({ text, blog, prop, setNewBlog }) => {
  const defaultBlog = {
    title: "",
    author: "",
    url: ""
  }
  const blogToUse = blog ?? defaultBlog
  return (
    <div>{text}: <input type="text" value={blogToUse[prop]} onChange={(event) => setNewBlog({ ...blogToUse, [prop]: event.target.value })} /></div>
  )
}

export default BlogField
