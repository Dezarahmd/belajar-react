import React, { useReducer } from 'react' // <- Ganti useImmer jadi useReducer
import NoteForm from './NoteForm'
import NoteList from './NoteList'

let id = 0

const initialNotes = [
    {id: id++, text: "learn html", done: false},
    {id: id++, text: "learn css", done: true},
    {id: id++, text: "learn js", done: false},
    {id: id++, text: "learn react", done: false},
]

function noteReducer(notes, action){
    switch (action.type) {
        case "ADD_NOTE":
            return [
                ...notes,
                {
                    id: id++,
                    text: action.text,
                    done: false
                }
            ]

        case "CHANGE_NOTE":
            return notes.map(note => 
                note.id === action.id ? {...note, text: action.text, done: action.done} : note
            )

        case "DELETE_NOTE":
            return notes.filter(note => note.id !== action.id)

        default: 
            return notes
    }
}

const NoteApp = () => {
    const [notes, dispatch] = useReducer(noteReducer, initialNotes) 

    function handleAddNote(text){
        dispatch({
            type: "ADD_NOTE",
            text: text
        })
    }

    function handleChangeNote(note){
        dispatch({
            type: "CHANGE_NOTE",
            id: note.id,
            text: note.text,
            done: note.done
        })
    }

    function handleDeleteNote(note){
        dispatch({
            type: "DELETE_NOTE",
            id: note.id
        })
    }

    return (
        <div>
            <h1>Note App</h1>
            <NoteForm onAddNote={handleAddNote}/>
            <NoteList notes={notes} onChange={handleChangeNote} onDelete={handleDeleteNote}/>
        </div>
    )
}

export default NoteApp