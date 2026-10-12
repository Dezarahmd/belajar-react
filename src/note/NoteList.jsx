import Note from "./Note";
import React from 'react'

const NoteList = ({notes, onChange, onDelete}) => {
  return (
    <ul>
        {notes.map(note => (
            <li key={note.id}>
                <Note note={note} onChange={onChange} onDelete={onDelete}/>
            </li>
        ))}
    </ul>
  )
}

export default NoteList