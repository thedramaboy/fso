import { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  //  if visible is true the hideElement display is set to none (so hide element)
  //  if visible is set to false (default) the showElement display is set to empty string
  const hideElement = { display: visible ? 'none' : '' }
  const showElement = { display: visible ? '' : 'none' }

  //   This is a switch with set the visible status which is falsy value as default
  //    default setVisible is false
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideElement}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showElement}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
