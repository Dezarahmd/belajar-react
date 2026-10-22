import Note from "./Note";
import React, { useContext } from 'react'
import { NotesContext } from "./NoteContext";

const NoteList = () => {
  const notes = useContext(NotesContext)
  return (
    <ul>
        {notes.map(note => (
            <li key={note.id}>
                <Note note={note}/>
            </li>
        ))}
    </ul>
  )
}

export default NoteList