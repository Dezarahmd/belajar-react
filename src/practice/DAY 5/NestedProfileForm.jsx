import React, { useState } from "react";

export default function NestedProfileForm() {
  const [user, setUser] = useState({
    name: "Budi",
    address: {
      city: "Jakarta",
      zipcode: "12345",
    },
  });

  // Handler untuk level atas (name)
  function handleNameChange(e) {
    setUser({
      ...user,
      name: e.target.value,
    });
  }

  // Handler untuk city (nested level dalam)
  function handleCityChange(e) {
    setUser({
      ...user,              // Copy level atas 
      address: {
        ...user.address,    // Copy level dalam agar zipcode tidak hilang
        city: e.target.value, // Timpa hanya nilai city
      },
    });
  }

  // Handler untuk zipcode (nested level dalam)
  function handleZipcodeChange(e) {
    setUser({
      ...user,
      address: {
        ...user.address,    // Copy level dalam agar city tidak hilang
        zipcode: e.target.value, // Timpa hanya nilai zipcode
      },
    });
  }

  /*
    CATATAN TENTANG SHALLOW COPY:
    Jika kita menulis: setUser({ ...user, address: { city: e.target.value } })
    Maka properti 'zipcode' AKAN HILANG karena operator spread (...) hanya bersifat 
    shallow copy (satu level). Objek address lama akan ditimpa total oleh objek baru 
    yang hanya memiliki key 'city'. Oleh karena itu, nested object wajib di-spread 
    di setiap levelnya (...user.address).
  */

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 border border-slate-100">
        
        {/* Header */}
        <h2 className="text-xl font-bold text-slate-800 mb-1">Form Profil Pengguna</h2>
        <p className="text-sm text-slate-500 mb-6">Contoh penanganan state nested object di React.</p>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Nama
            </label>
            <input
              type="text"
              value={user.name}
              onChange={handleNameChange}
              className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Kota (Nested Address)
            </label>
            <input
              type="text"
              value={user.address.city}
              onChange={handleCityChange}
              className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Kode Pos (Nested Address)
            </label>
            <input
              type="text"
              value={user.address.zipcode}
              onChange={handleZipcodeChange}
              className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <hr className="my-6 border-slate-200" />

        {/* Preview Box */}
        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs shadow-inner">
          <p className="text-slate-400 font-sans font-semibold text-xs mb-2 uppercase tracking-wide">
            Live Preview State:
          </p>
          <ul className="space-y-1">
            <li><span className="text-blue-400">name:</span> "{user.name}"</li>
            <li><span className="text-blue-400">address.city:</span> "{user.address.city}"</li>
            <li><span className="text-blue-400">address.zipcode:</span> "{user.address.zipcode}"</li>
          </ul>
        </div>

      </div>
    </div>
  );
}