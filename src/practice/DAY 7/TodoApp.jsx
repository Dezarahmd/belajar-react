import React, { useState, useReducer } from 'react';

// Data awal (initialTodos)
const initialTodos = [
  { id: 1, text: 'Belajar konsep useReducer di React', done: true },
  { id: 2, text: 'Membuat aplikasi Todo dengan payload reducer', done: false }
];

// Reducer function untuk mengatur state (harus berupa pure function)
function todoReducer(state, action) {
  switch (action.type) {
    case 'added':
      return [...state, action.payload];
    case 'toggled':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case 'deleted':
      return state.filter(todo => todo.id !== action.payload);
    default:
      throw new Error(`Action type tidak dikenal: ${action.type}`);
  }
}

export default function TodoApp() {
  // useReducer hook
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  
  // Satu useState untuk teks input
  const [text, setText] = useState('');

  // Handler untuk menambah todo
  function handleAdd(e) {
    e.preventDefault();
    if (!text.trim()) return; // Abaikan jika kosong

    const newTodo = {
      id: Date.now(), // id dibuat di handler, bukan di reducer
      text: text.trim(),
      done: false
    };

    dispatch({ type: 'added', payload: newTodo });
    setText(''); // Kosongkan input setelah ditambah
  }

  // Hitung ringkasan tugas selesai
  const completedCount = todos.filter(todo => todo.done).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-50 mb-4">Todo App Reducer</h2>
        
        {/* Form Input */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tambahkan tugas baru..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Tambah
          </button>
        </form>

        {/* Ringkasan */}
        <p className="text-xs font-medium text-slate-400 mb-4">
          {completedCount} dari {totalCount} tugas selesai
        </p>

        {/* Daftar Todo */}
        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-slate-950/50 border border-slate-800/60 rounded-lg px-3 py-2.5 transition-all hover:border-slate-700"
            >
              <div className="flex items-center gap-3">
                {/* Toggle dipasang di checkbox saja untuk menghindari double-toggle */}
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => dispatch({ type: 'toggled', payload: todo.id })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
                />
                <span
                  className={`text-sm transition-colors ${
                    todo.done ? 'line-through text-slate-500' : 'text-slate-200'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              
              <button
                onClick={() => dispatch({ type: 'deleted', payload: todo.id })}
                className="text-slate-500 hover:text-red-400 text-xs font-medium px-2 py-1 rounded transition-colors cursor-pointer"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/*
Komentar Wajib:
1. Kenapa id dibuat di handler, bukan di reducer?
   Reducer harus berupa fungsi murni (pure function). Artinya, untuk input (state dan action) yang sama, reducer harus selalu menghasilkan output yang sama persis tanpa efek samping (side effects). Fungsi seperti Date.now() bersifat non-deterministic karena nilainya selalu berubah seiring waktu. Jika ditaruh di dalam reducer, hal ini dapat melanggar prinsip pure function dan menyebabkan masalah inkonsistensi (terutama saat React melakukan render ganda pada mode StrictMode development).

2. Apa keuntungan reducer dibanding versi useState dari Day 5? Sebutkan minimal satu.
   Keuntungan utamanya adalah logika pembaruan state terpusat dan terstruktur (predictable state management). Semua aturan modifikasi data (tambah, toggle, hapus) dikumpulkan di dalam satu fungsi reducer, membuat komponen utama (`TodoApp`) lebih bersih dari logika bisnis yang kompleks serta membuat proses pengujian (testing) logika state menjadi jauh lebih mudah.
*/