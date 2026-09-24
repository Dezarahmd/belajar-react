import React, { useState } from 'react';

function MutationBug() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 1. HANDLER SALAH: Mutasi langsung (direct mutation)
  function handleMoveWrong() {
    position.x = position.x + 10;   // Mutasi object state yang ada di memori secara langsung
    setPosition(position);          // Mengirim reference object yang SAMA persis ke React
    console.log("Console (Salah):", position); // Nilai di console akan bertambah, tapi UI tidak re-render
  }

  /*
    PREDIKSI & PENJELASAN (SALAH):
    Setelah tombol "Gerak (SALAH)" diklik berkali-kali, angka di UI **TIDAK AKAN BERUBAH** (tetap 0), 
    meskipun `console.log` menunjukkan nilai `position.x` terus bertambah.
    
    Kenapa ini terjadi?
    React mendeteksi perubahan state dengan cara melakukan **shallow comparison** (perbandingan dangkal) 
    antara reference (alamat memori) object state yang lama dengan object state yang baru (`Object.is(oldState, newState)`).
    
    Karena kita memutasi object yang sama tanpa membuat object baru, `position` lama dan `position` baru 
    menunjuk ke alamat memori yang **sama**. Akibatnya, React mengira **tidak ada perubahan state**, 
    sehingga React **tidak memicu re-render component** (tampilan UI tidak diperbarui).
  */

  // 2. HANDLER BENAR: Membuat object baru dengan spread operator
  function handleMoveCorrect() {
    setPosition({ ...position, x: position.x + 10 }); // Membuat object BARU di alamat memori berbeda
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Demo Mutation Bug di React</h2>
      
      {/* Tampilan Posisi di UI */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-center">
        <p className="text-sm text-gray-600 mb-1">Posisi Saat Ini:</p>
        <p className="text-xl font-mono font-bold text-blue-600">
          X: {position.x} | Y: {position.y}
        </p>
      </div>

      {/* Tombol Kontrol */}
      <div className="space-y-3">
        <button 
          onClick={handleMoveWrong}
          className="w-full py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition shadow-sm"
        >
          Gerak (SALAH - mutasi langsung)
        </button>

        <button 
          onClick={handleMoveCorrect}
          className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition shadow-sm"
        >
          Gerak (BENAR - buat object baru)
        </button>
      </div>
    </div>
  );
}

export default MutationBug;