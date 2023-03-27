import PropTypes from "prop-types"
const BlogField = ({ text, blog, prop, setNewBlog }) => {
  const defaultBlog = {
    title: "",
    author: "",
    url: ""
  }
  const blogToUse = blog ? blog : defaultBlog
  return (
    <div>{text}: <input type="text" value={blogToUse[prop]} onChange={(event) => setNewBlog({ ...blogToUse, [prop]: event.target.value })} /></div>
  )
}

BlogField.propTypes = {
  text: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  setNewBlog: PropTypes.func.isRequired
}

export default BlogField
