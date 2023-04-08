import PropTypes from "prop-types"
const BlogField = ({ text, blog, prop, setNewBlog, placeholder }) => {
  const defaultBlog = {
    title: "",
    author: "",
    url: ""
  }
  const blogToUse = blog ? blog : defaultBlog
  return (
    <div>{text}: <input id={`blog-${prop}`} type="text" value={blogToUse[prop]} onChange={(event) => setNewBlog({ ...blogToUse, [prop]: event.target.value })} placeholder={placeholder} /></div>
  )
}

BlogField.propTypes = {
  text: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  setNewBlog: PropTypes.func.isRequired
}

export default BlogField
