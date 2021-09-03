import React, { useState, useEffect } from 'react'

import './App.css'

import Form from './components/Form'
import Todo from './components/Todo'
// import Note from './components/Note'

const App = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [notes, setnotes] = useState([])
  const [noteText, setNoteText] = useState('')
  const [noteBody, setNoteBody] = useState('')
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
    console.log('Always runs (from top level App component)')
  })
  // Will always run since no dependency array was provided

  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem('notes'))
    if (localNotes) {
      setnotes(localNotes)
    }
    const localTodos = JSON.parse(localStorage.getItem('todos'))
    if (localTodos) {
      setTodos(localTodos)
    }
  }, [])
  // Fetches data, only runs once

  useEffect(() => {
    console.log('Runs only once')
  }, [])
  // Empty array as a depndency signals to run only once.
  // Without a dependency list it will run when anything changes.
  // With empty array, it will run only when mounted

  useEffect(() => {
    console.log('Count changed')
  }, [count])
  // Only runs when count is changed

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('notes', JSON.stringify(notes))
    // document.title = noteText || 'hello'
    //}, [count])
    // This won't work because the effect makes changes to other state than count
    // All dependencies affected in the callback function you provide must be in the dependency array
  }, [todos, notes, noteText])

  return (
    <div className="container mt-3">
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
          {/* Counter */}
          {/* <div>
            <p>
              Current {text || 'count'} is {count}
            </p>
            <p>
              <button
                className="btn btn-outline-primary"
                onClick={() => setCount(count - 1)}
              >
                -1
              </button>{' '}
              <button
                className="btn btn-outline-primary"
                onClick={() => setCount(0)}
              >
                Reset
              </button>{' '}
              <button
                className="btn btn-outline-primary"
                onClick={() => setCount(count + 1)}
              >
                +1
              </button>
            </p>
            <p>
              <input
                className="form-control"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={text || 'count'}
              />
            </p>
          </div> */}
          {/* Notes */}
          {/* <div>
            <h1 className="display-4">Notes</h1>
            <hr />
            {notes.map((note, index) => {
              return (
                <Note
                  key={index}
                  index={index}
                  note={note}
                  removeNote={removeNote}
                />
              )
            })}
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Note title"
              />
              <textarea
                className="form-control mb-2"
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Note body"
              />
              <button className="btn btn-outline-primary" type="submit">
                Add Note
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default App
