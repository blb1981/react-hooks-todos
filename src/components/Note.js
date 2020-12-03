import React, { useEffect } from 'react'

const Note = ({ note, removeNote, index }) => {
  useEffect(() => {
		console.log('Setting up effect from Note component')
		
		// Returning a function is how to clean up effect, shown below
		return () => {
			console.log('Cleaning up effect from Note component')
		}
  }, [])

  return (
    <div>
      <h2>{note.noteText}</h2>
      <p>{note.noteBody}</p>
      <button
        className="btn btn-outline-primary mb-2"
        onClick={() => removeNote(index)}
      >
        Delete note
      </button>
    </div>
  )
}

export default Note
