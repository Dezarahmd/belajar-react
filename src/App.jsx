import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold text-red-400">
        Belajar React + Tailwind CSS v4
      </h1>
      <p className="text-slate-300">
        Edit <code className="bg-slate-800 px-2 py-1 rounded">src/App.jsx</code> dan simpan untuk mencoba Hot Reload.
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-colors font-medium cursor-pointer"
      >
        Hitungan: {count}
      </button>
    </div>
  )
}

export default App
