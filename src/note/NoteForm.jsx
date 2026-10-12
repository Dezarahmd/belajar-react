import { useState } from "react";

const NoteForm = ({ onAddNote }) => {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleClick() {
    setText("");
    onAddNote(text);
  }

  return (
    <div>
        <input type="text" placeholder="add note" value={text} onChange={handleChange}/>
        <button onClick={handleClick}>Add</button>
    </div>
  )
};

export default NoteForm;
