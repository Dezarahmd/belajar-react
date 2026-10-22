import { useContext } from "react"
import { TemaContext } from "./TemaContext"


export default function DaftarProduk(){
    const [isLight, setIsLight] = useContext(TemaContext)
    return (
        <div className={`${isLight ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
            <h2>ini adalah daftar produk</h2>
            <ul>
                <li>Arabika - Rp 45.000</li>
                <li>Robusta asik - Rp 50.000</li>
                <li>Arabika anjay - Rp 60.000</li>
            </ul>
        </div>
    )
}