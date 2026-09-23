import { useState } from "react";

function LikeCounter(){
    const [likes, setLikes] = useState(0)
    // KALAU PAKE LET ITU DIA HARUS MANIPULASI DOM NYA SECARA MANUAL LAAGI, TETAPI KALAU USESTATE DIA OTOMATIS
    function handlePlusClick(){
        setLikes(likes + 1)
    }

    function handleResetClick(){
        setLikes(0)
    }

    return (
        <div className="flex flex-col justify-center min-h-screen items-center bg-slate-50 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center gap-6 border border-slate-100 max-w-sm w-full">
                <div className="flex items-center gap-2 bg-pink-50 px-5 py-2.5 rounded-full border border-pink-100">
                    <span className="text-pink-500 text-xl">❤️</span>
                    <p className="text-slate-700 font-medium text-lg">Suka: <span className="font-bold text-pink-600">{likes}</span></p>
                </div>
                <div className="flex flex-row gap-3 w-full">
                    <button onClick={handlePlusClick} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-pink-200 transition-all duration-200 active:scale-95">Sukai</button>
                    <button onClick={handleResetClick} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 active:scale-95">Reset</button>
                </div>
            </div>
        </div>

    )
}

export default function App() {
    return (

        <LikeCounter/>
    )
}