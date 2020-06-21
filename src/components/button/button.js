import React from 'react'
import './button.css'

const Button = ({onToggle}) => {
  return (
    <button
      onClick={()=> onToggle()}
      type="button"
      className="btn btn-primary">Toggle random character</button>
  )
}

export default Button