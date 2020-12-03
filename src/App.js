import React, { useState, useEffect } from 'react'

import './App.css'

import Form from './components/Form'
import Todo from './components/Todo'

const App = () => {
  const localTodos = JSON.parse(localStorage.getItem('todos'))
  const localNotes = JSON.parse(localStorage.getItem('notes'))
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [notes, setnotes] = useState(localNotes)
  const [noteText, setNoteText] = useState('')
  const [noteBody, setNoteBody] = useState('')
  const [todos, setTodos] = useState(localTodos || [])

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
  const handleSubmit = (e) => {
    e.preventDefault()
    setnotes([...notes, { noteText, noteBody }])
    setNoteText('')
    setNoteBody('')
  }
  const removeNote = (index) => {
    console.log(index)
    setnotes(
      notes.filter((note, i) => {
        return index !== i
      })
    )
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('notes', JSON.stringify(notes))
    document.title = noteText || 'hello'
  }, [todos])

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
          <p>
            Current {text || 'count'} is {count}
          </p>
          <p>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count + 1)}>+1</button>
          </p>
          <p>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </p>
          <h1>Notes</h1>
          {notes.map((note, index) => {
            return (
              <div key={index}>
                <h2>{note.noteText}</h2>
                <p>{note.noteBody}</p>
                <button onClick={() => removeNote(index)}>Delete note</button>
              </div>
            )
          })}
          <form onSubmit={handleSubmit}>
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <textarea
              cols="30"
              rows="10"
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
              placeholder="type your stuff here"
            />
            <button type="submit">Add Note</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
