import React, { useState } from "react";
import { useImmer } from "use-immer";

export default function UserSettings() {
  // Menggunakan useImmer sebagai pengganti useState untuk state yang sangat nested
  const [user, setUser] = useImmer({
    name: "Sarah",
    address: {
      city: "Bandung",
      coordinates: { lat: -6.9, lng: 107.6 },
    },
    hobbies: ["Membaca", "Coding"],
  });

  // State lokal untuk input hobi baru
  const [newHobbyInput, setNewHobbyInput] = useState("");

  // 1. Handler untuk update city (nested 2 level)
  function handleCityChange(e) {
    setUser((draft) => {
      draft.address.city = e.target.value; // Terlihat seperti mutasi langsung, tapi AMAN karena "draft"
    });
  }

  // 2. Handler untuk update lat (nested 3 level: user.address.coordinates.lat)
  function handleLatChange(e) {
    setUser((draft) => {
      draft.address.coordinates.lat = parseFloat(e.target.value) || 0;
    });
  }

  // Handler tambahan untuk lng agar preview koordinat lengkap
  function handleLngChange(e) {
    setUser((draft) => {
      draft.address.coordinates.lng = parseFloat(e.target.value) || 0;
    });
  }

  // 3. Handler untuk menambah item baru ke array hobbies menggunakan Immer (.push())
  function handleAddHobby(e) {
    e.preventDefault();
    if (!newHobbyInput.trim()) return;

    setUser((draft) => {
      draft.hobbies.push(newHobbyInput); // push() LANGSUNG dipakai — dan ini AMAN di dalam Immer!
    });
    setNewHobbyInput("");
  }

  // Handler untuk menghapus hobby
  function handleRemoveHobby(indexToRemove) {
    setUser((draft) => {
      draft.hobbies.splice(indexToRemove, 1); // .splice() juga aman karena berjalan di atas draft!
    });
  }

  /*
    ===================================================================
    BUKTI PEMAHAMAN: KENAPA draft.hobbies.push() AMAN DI DALAM useImmer?
    ===================================================================
    
    Di Tantangan 4, kita belajar bahwa method seperti .push() dan .splice() 
    berbahaya pada state biasa karena memutasi (mengubah) array asli secara langsung 
    (in-place), sehingga React gagal mendeteksi perubahan referensi memori.
    
    Namun, di dalam `useImmer`, `draft` bukanlah state asli React, melainkan sebuah 
    "Proxy" (objek perantara) yang disediakan oleh pustaka Immer. 
    
    Apa yang dilakukan Immer di balik layar:
    1. Proxy memantau setiap perubahan (mutasi) yang Anda lakukan pada objek/array `draft`.
    2. Saat fungsi updater selesai, Immer secara otomatis membuat *salinan baru* 
       (immutable copy) dari data tersebut berdasarkan "rekaman" perubahan yang terjadi.
    3. State asli React akhirnya digantikan oleh objek/array baru tersebut secara aman 
       tanpa Anda perlu menulis manual spread (`...`) level demi level.
  */

  /*
    ===================================================================
    ANALISIS PERBANDINGAN: MANUAL SPREAD VS IMMER & TITIK EFEKTIFNYA
    ===================================================================
    
    Jika kita menggunakan pattern manual untuk nested 3 level (seperti `lat`), kodenya akan sangat panjang:
    
    setUser({
      ...user,
      address: {
        ...user.address,
        coordinates: {
          ...user.address.coordinates,
          lat: e.target.value
        }
      }
    })
    
    Sedangkan dengan Immer, kodenya menjadi sangat ringkas:
    `draft.address.coordinates.lat = e.target.value`
    
    **Menurut Anda, di titik nesting seberapa dalam Immer mulai terasa jauh lebih worth dipakai dibanding manual spread?**
    Immer mulai terasa jauh lebih *worth* (paling lambat) pada **nested 2 level**, dan **sangat wajib** digunakan pada **nested 3 level atau lebih** atau ketika state melibatkan array kompleks di dalam objek. Pada kedalaman 2 level ke atas, manual spread sudah mulai rentan terhadap human error (lupa menyertakan salah satu spread di level menengah yang mengakibatkan properti terhapus/undefined), sedangkan Immer menghilangkan kerumitan sintaksis tersebut sepenuhnya dan membuat kode jauh lebih bersih serta mudah dibaca.
  */

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800">User Settings (Immer)</h2>
          <p className="text-sm text-slate-500">Manajemen nested state kompleks dengan mudah dan bersih.</p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Nama
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => {
                setUser((draft) => {
                  draft.name = e.target.value;
                });
              }}
              className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Kota (Nested 2 Level)
            </label>
            <input
              type="text"
              value={user.address.city}
              onChange={handleCityChange}
              className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Latitude (Nested 3 Level)
              </label>
              <input
                type="number"
                step="any"
                value={user.address.coordinates.lat}
                onChange={handleLatChange}
                className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Longitude (Nested 3 Level)
              </label>
              <input
                type="number"
                step="any"
                value={user.address.coordinates.lng}
                onChange={handleLngChange}
                className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Hobbies Form */}
          <form onSubmit={handleAddHobby} className="pt-2">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Tambah Hobi Baru (Array dalam Object)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newHobbyInput}
                onChange={(e) => setNewHobbyInput(e.target.value)}
                placeholder="Misal: Bersepeda"
                className="flex-1 px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg shadow-md transition-all cursor-pointer"
              >
                Tambah
              </button>
            </div>
          </form>
        </div>

        <hr className="my-6 border-slate-200" />

        {/* Live Preview Box */}
        <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs shadow-inner">
          <p className="text-slate-400 font-sans font-semibold text-xs mb-2 uppercase tracking-wide">
            Live Preview State:
          </p>
          <ul className="space-y-1.5">
            <li><span className="text-blue-400">name:</span> "{user.name}"</li>
            <li><span className="text-blue-400">address.city:</span> "{user.address.city}"</li>
            <li>
              <span className="text-blue-400">coordinates:</span> lat: {user.address.coordinates.lat}, lng: {user.address.coordinates.lng}
            </li>
            <li>
              <span className="text-blue-400">hobbies:</span> 
              <div className="flex flex-wrap gap-1.5 mt-1">
                {user.hobbies.map((hobby, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-1 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-200"
                  >
                    {hobby}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveHobby(index)}
                      className="text-red-400 hover:text-red-300 font-bold ml-1"
                      title="Hapus hobi"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}