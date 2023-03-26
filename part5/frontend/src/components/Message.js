import "./Message.css"
const Message = ({ content, setMessage }) => {
  if (!content) return null
  const { text, type } = content
  setTimeout(() => setMessage(null), 2000)
  return <div className={`message ${type}`}>{text}</div>
}

export default Message
