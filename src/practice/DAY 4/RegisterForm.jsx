import { useState } from "react";

function RegisterForm(){
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [agreeTerms, setAgreeTerms] = useState(false)

    function handleOnChangeName(e){
        setName(e.target.value)
    }

    function handleOnChangeAge(e){
        setAge(Number(e.target.value))
    }

    function handleOnChangeTerms(e){
        setAgreeTerms(e.target.checked)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-5 border border-slate-100 max-w-md w-full">
                <h2 className="text-xl font-bold text-slate-800 text-center mb-2">Formulir Registrasi</h2>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="" className="text-sm font-semibold text-slate-600">Nama:</label>    
                    <input type="text" value={name} onChange={handleOnChangeName} placeholder="Masukkan nama..." className="border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="" className="text-sm font-semibold text-slate-600">Umur: </label>
                    <input type="text" value={age} onChange={handleOnChangeAge} placeholder="Masukkan umur..." className="border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
                </div>
                <div className="flex items-center gap-3 pt-2    ">
                    <input type="checkbox" checked={agreeTerms} onChange={handleOnChangeTerms} id="terms" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"/>
                    <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer select-none">Setuju S&K?</label>
                </div>
                <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 text-sm leading-relaxed">
                    <p className="font-medium">Halo <span className="font-bold text-indigo-600">{name || "..."}</span>, umur <span className="font-bold text-indigo-600">{age || 0}</span> tahun. Setuju S&K: <span className="font-semibold">{agreeTerms ? "Ya ✅" : "Belum ❌"}</span></p>
                </div>
            </div>
        </div>
    )
}

export default function App(){
    return (
        <RegisterForm/>
    )
}