import React, { useState, useEffect } from 'react'

const Form = ({ addTodo }) => {
  const [value, setValue] = useState('')
  const handleSubmit = (e) => {
    if (!value) return
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  useEffect(() => {
    console.log('useEffect launched')
  })
  return (
    <form onSubmit={handleSubmit} className="form-group">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="form-control mb-2"
        placeholder="Add todo"
      />
      <button className="btn btn-primary btn-block" type="submit">
        Add
      </button>
    </form>
  )
}
export default Form
