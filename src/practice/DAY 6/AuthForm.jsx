import { useState } from "react"

export default function AuthForm({formType}){
    const [email, setEmail] = useState("Login")

    return (
        <div>
            <h2>{formType === "Login" ? "form login" : "form register"}</h2>
            <label htmlFor="">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="masukkan email"/>
            <button>{formType === "Login" ? "Masuk" : "Daftar"}</button>
        </div>
    )
}