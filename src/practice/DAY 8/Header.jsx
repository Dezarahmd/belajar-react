import { useContext } from "react"
import { TemaContext } from "./TemaContext"

export default function Header(){
    const [isLight, setIsLight] = useContext(TemaContext)

    function handleClick(){
        setIsLight(!isLight)
    }
    return (
        <div>
            <h1>Kopi nusantara</h1>
            <button onClick={handleClick}>{isLight ? "Ganti ke Dark Mode" : "Ganti ke light mode"}</button>
        </div>
    )
}