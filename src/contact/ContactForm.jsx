import { useState } from "react"
import { useImmer } from "use-immer"

export default function ContactForm(){
    const initialData = {
        name: "",
        message: ""
    }

    const [contact, setContact] = useImmer(initialData)

    function handleNameChange(e){
        setContact(draft => {
            draft.name = e.target.value
        })
    }

    function handleMessageChange(e){
        setContact(draft => {
            draft.message = e.target.value
        }) 
    }

    return (
        <div>
            <h1>Contact Form</h1>
            <form action="">
                <input type="text" placeholder="name" value={contact.name} onChange={handleNameChange}/>
                <br />
                <input type="text" placeholder="Message" value={contact.message} onChange={handleMessageChange}/>
            </form>
            <h1>COntact detail</h1>
            <p>Name: {contact.name}</p>
            <p>Message: {contact.message}</p>
        </div>
    )
}