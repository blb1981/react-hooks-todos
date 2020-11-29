import React, { useState } from 'react'

import './App.css'

import Form from './components/Form'
import Todo from './components/Todo'

const App = () => {
  const [todos, setTodos] = useState([])
  const addTodo = (text) => {
    const newTodos = [
      ...todos,
      {
        name: text,
        isComplete: false,
      },
    ]
    setTodos(newTodos)
  }
  const completeTodo = (index) => {
    const newTodos = [...todos]
    newTodos[index].isComplete = !newTodos[index].isComplete
    setTodos(newTodos)
  }

  const deleteTodo = (index) => {
    setTodos(
      todos.filter((todo, i) => {
        return index !== i
      })
    )
  }

  return (
    <div className="container">
      <h1 className="display-4 mx-auto">To Do List</h1>
      <hr />
      <div className="row">
        <div className="className col-md-6 offset-md-3">
          <Form addTodo={addTodo} />
          <ul className="list-group">
            {todos.map((todo, index) => {
              return (
                <Todo
                  completeTodo={completeTodo}
                  deleteTodo={deleteTodo}
                  index={index}
                  todo={todo}
                  key={index}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
