import Note from "./Note";
import React, { useContext, useMemo, useState, useRef } from 'react'
import { NotesContext } from "./NoteContext";

const NoteList = () => {
  const notes = useContext(NotesContext)
  const [search, setSearch] = useState("")
  const searchInput = useRef(null)

  const filteredNotes = useMemo(() => {
    console.info("Filtering notes")
    return notes.filter(note => note.text.includes(search))
  }, [notes, search])

  function handleSearch(){
    console.info('Search')
    setSearch(searchInput.current.value)
  }

  return (
    <div>
      <input type="text" placeholder="search" ref={searchInput}/>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id}>
            <Note note={note}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NoteList