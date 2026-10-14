import React, { useReducer } from "react"; // <- Ganti useImmer jadi useReducer
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { useImmer, useImmerReducer } from "use-immer";

let id = 0;

const initialNotes = [
  { id: id++, text: "learn html", done: false },
  { id: id++, text: "learn css", done: true },
  { id: id++, text: "learn js", done: false },
  { id: id++, text: "learn react", done: false },
];

function noteReducer(notes, action) {
  if (action.type === "ADD_NOTE") {
    notes.push({
      id: id++,
      text: action.text,
      done: false,
    });
  } else if (action.type === "CHANGE_NOTE") {
    const index = notes.findIndex(note => note.id == action.id)
    notes[index].text = action.text
    notes[index].done = action.done

  } else if (action.type === "DELETE_NOTE") {
    const index = notes.findIndex(note => note.id == action.id)
    notes.splice(index, 1)
  }
}

const NoteApp = () => {
  const [notes, dispatch] = useImmerReducer(noteReducer, initialNotes);

  function handleAddNote(text) {
    dispatch({
      type: "ADD_NOTE",
      text: text,
    });
  }

  function handleChangeNote(note) {
    dispatch({
      type: "CHANGE_NOTE",
      id: note.id,
      text: note.text,
      done: note.done,
    });
  }

  function handleDeleteNote(note) {
    dispatch({
      type: "DELETE_NOTE",
      id: note.id,
    });
  }

  return (
    <div>
      <h1>Note App</h1>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList
        notes={notes}
        onChange={handleChangeNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default NoteApp;
