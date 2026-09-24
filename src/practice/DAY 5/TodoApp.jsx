import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Belajar React", done: false },
    { id: 2, text: "Kerjakan tugas", done: false },
  ]);
  
  const [inputValue, setInputValue] = useState("");

  // 1. Tambah item baru menggunakan spread operator array
  function handleAddTodo(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = { id: Date.now(), text: inputValue, done: false };
    setTodos([...todos, newTodo]); // Spread array lama + item baru, BUKAN todos.push(newTodo)
    setInputValue("");
  }

  // 2. Hapus item menggunakan .filter()
  function handleDeleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id)); // BUKAN todos.splice(index, 1)
  }

  // 3. Update status done menggunakan .map()
  function handleToggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  /*
    ===================================================================
    BUKTI PEMAHAMAN: KENAPA .push(), .splice(), DAN .sort() TIDAK BOLEH 
    DIPAKAI LANGSUNG PADA STATE ARRAY DI REACT?
    ===================================================================
    
    Secara JavaScript murni (vanilla JS), method-method tersebut sah-sah saja 
    digunakan. NAMUN, di React, hal itu melanggar prinsip *Immutability* 
    (tidak boleh mengubah state secara langsung atau in-place).
    
    Alasannya:
    1. Mutasi In-Place: Method seperti .push(), .splice(), dan .sort() mengubah 
       (memutasi) array yang ada di memori secara langsung tanpa membuat wadah baru. 
    2. Referensi Memori Sama: Karena elemennya diubah di wadah yang sama, referensi 
       memori (pointer) dari variabel `todos` tidak berubah.
    3. Gagal Re-render: React mendeteksi perubahan state dengan membandingkan 
       referensi memori (misal: `prevState !== nextState`). Jika referensinya 
       tetap sama, React mengira tidak ada perubahan apa pun, sehingga UI 
       tidak akan melakukan re-render (tampilan layar tidak berubah).
       
    Oleh karena itu, kita wajib menggunakan method yang mengembalikan ARRAY BARU 
    (seperti spread operator `[...]`, `.filter()`, dan `.map()`) agar React 
    tahu bahwa state telah berubah dan UI perlu diperbarui.
  */

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Todo App (CRUD)</h1>
          <p className="text-sm text-slate-500">Kelola daftar tugas harian Anda secara immutable.</p>
        </div>

        {/* Form Tambah Todo */}
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tambah tugas baru..."
            className="flex-1 px-4 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            Tambah
          </button>
        </form>

        {/* List Todos */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-6">Belum ada tugas saat ini. 🎉</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  todo.done
                    ? "bg-slate-50 border-slate-200 opacity-75"
                    : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                {/* Toggle Status Checkbox & Teks */}
                <div 
                  className="flex items-center gap-3 cursor-pointer select-none flex-1 pr-2" 
                  onClick={() => handleToggleTodo(todo.id)}
                >
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span
                    className={`text-sm transition-all ${
                      todo.done ? "line-through text-slate-400" : "text-slate-700 font-medium"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                {/* Tombol Hapus */}
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Hapus Tugas"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Statistik */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-400">
          <span>Total: {todos.length} tugas</span>
          <span>Selesai: {todos.filter(t => t.done).length}</span>
        </div>

      </div>
    </div>
  );
}