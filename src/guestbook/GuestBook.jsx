import { useRef, useState } from "react"

export default function GuestBook(){
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const nameInput = useRef(null)

    function handleSubmit(e){
        e.preventDefault()
        setName("")
        setMessage("")
        nameInput.current.focus()
        alert(`Name: ${name}, message: ${message}`)
    }
    return (
        <>
            <h1>Guest book</h1>
            <form action="">
                <label htmlFor="name">Name</label><br/>
                <input ref={nameInput} type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/><br/>
                <label htmlFor="message">Message</label><br/>
                <textarea name="message" id="" value={message} onChange={(e) => setMessage(e.target.value)}></textarea><br/>
                <button type="submit" onClick={handleSubmit}>Submit</button>

            </form>
        </>
    )
}