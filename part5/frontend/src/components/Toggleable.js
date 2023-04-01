import { useState, useImperativeHandle, forwardRef } from "react"

const Toggleable = forwardRef((props, ref) => {
  const { defaultVisibility = false } = props
  const [visible, setVisible] = useState(defaultVisibility)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Toggleable.displayName = "Toggleable"

export default Toggleable
