import { useContext } from "react"
import { TemaContext } from "./TemaContext"

export default function Footer(){
    const [isLight, setIsLight] = useContext(TemaContext)
    return (
        <div className={`${isLight ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
            <h3>Ini adalah footer</h3>
            {isLight ? "Tema aktif: Light mode" : "Tema Aktif: Dark Mode"}
        </div>
    )
}