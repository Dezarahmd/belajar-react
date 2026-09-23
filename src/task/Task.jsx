import { useState } from "react"
import { useImmer } from "use-immer"

export default function Task(){
    const [item, setItem] = useState("")
    const [items, setItems] = useImmer([])

    function handleChange(e){
        setItem(e.target.value)
    }

    function handleClick(e){
        e.preventDefault()
        setItems((draft) => {
            draft.push(item)
        })
        setItem("")
    }

    return (
        <div>
            <h1>Create Task</h1>
            <form action="">
                <input type="text" value={item} onChange={handleChange}/>
                <button onClick={handleClick}>Add</button>
            </form>
            <h1>List Task</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}