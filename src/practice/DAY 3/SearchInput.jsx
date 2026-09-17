function SearchInput(){
    return (
        <div className="flex justify-center items-center min-h-screen gap-4">
            <input type="text" placeholder="Cari produk" className="border-2 border-slate-500 rounded-md placeholder:text-slate-400 font-sm p-2" onChange={handleInputChange} onFocus={handleFocus}/>
            <button onClick={(e) => console.log(`Tombol di klik, tipe event: ${e.type}`)} className="bg-blue-500 rounded-lg px-4 py-2 text-white">Cari</button>
        </div>
    )
}

function handleInputChange(e){
    console.log(e.target.value)
}

function handleFocus(e){
    console.log(`Input di-klik/focus, target element: ${e.target}`)
}

export default function App(){
    return (
        <SearchInput/>
    )
}