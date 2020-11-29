import React from 'react'

const Todo = ({ todo, index, completeTodo, deleteTodo }) => {
  
  return (
    <div className="list-group-item">
      <span style={{ textDecoration: todo.isComplete ? 'line-through' : '' }}>
        {todo.name}
      </span>
      <div className="float-right">
        <button className="btn btn-success" onClick={() => completeTodo(index)}>
          {' '}
          Complete{' '}
        </button>{' '}
        <button className="btn btn-danger" onClick={() => deleteTodo(index)}>
          {' '}
          X{' '}
        </button>
      </div>
    </div>
  )
}

export default Todo
