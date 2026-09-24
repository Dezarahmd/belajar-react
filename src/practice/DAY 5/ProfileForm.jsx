import { useState } from "react"

export default function ProfileForm(){

    const [user, setUser] = useState({
        name: "Andi",
        email: "andi@gmail.com",
        bio: "Halo, saya andi"
    })

    function handleNameChange(e){
        setUser({...user, name: e.target.value})
    }

    function handleEmailChange(e){
        setUser({...user, email: e.target.value})
    }

    function handleBioChange(e){
        setUser({...user, bio: e.target.value})
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Form Profile</h2>

            <form action="" onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Nama: </label>
                    <input type="text" value={user.name} onChange={handleNameChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"/>
                </div>
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Email: </label>
                    <input type="email" value={user.email} onChange={handleEmailChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"/>
                </div>
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Bio: </label>
                    <textarea value={user.bio} onChange={handleBioChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"></textarea>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-700">Simpan</button>
            </form>
            
            <hr className="my-6 border-gray-600"/>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Preview Data User:</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-sm text-gray-400">
                    <p><strong className="text-gray-900">Nama: </strong>{user.name}</p>
                    <p><strong className="text-gray-900">Email: </strong>{user.email}</p>
                    <p><strong className="text-gray-900">Bio: </strong>{user.bio}</p>
                </div>
            </div>

        </div>
    )
}