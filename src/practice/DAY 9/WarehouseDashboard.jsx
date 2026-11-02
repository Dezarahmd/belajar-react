import React, { useState, useRef, useEffect } from 'react';
import { Activity, Play, Pause, RotateCcw, Warehouse } from 'lucide-react';

export default function WarehouseDashboard() {
  const [activityCount, setActivityCount] = useState(0);
  const [isActive, setIsActive] = useState(false)
  const timerRef = useRef(null)

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setActivityCount(0)
  }

  useEffect(() => {
    if (isActive) {
        timerRef.current = setInterval(() => {
            setActivityCount((prev) => prev + 1)
        }, 1000)
    }
    return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
    }
  }, [isActive])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Warehouse className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Monitoring Gudang</h1>
              <p className="text-xs text-slate-400">Real-time Warehouse Activity Monitor</p>
            </div>
          </div>

          {/* Status Badge (Ubah style/teks sesuai state nanti) */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Aktif</span>
            {isActive ? <span className="w-2 h-2 rounded-full bg-slate-500"></span> : <span className="text-slate-400">Diberhentikan</span>}
          </div>
        </div>

        {/* Display Counter Card */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 right-4 text-slate-800">
            <Activity className="w-16 h-16 opacity-20" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Total Aktivitas Terdeteksi
          </span>

          {/* Angka Counter */}
          <div className="text-6xl font-black tracking-tight text-white font-mono my-2">
            {activityCount}
          </div>

          <p className="text-xs text-slate-500">Update otomatis setiap 1.0 detik</p>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {/* Tombol Mulai / Lanjutkan */}
          <button
            onClick={handleStart}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 text-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mulai</span>
          </button>

          {/* Tombol Pause */}
          <button
            onClick={handlePause}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/30 font-medium rounded-xl transition-all active:scale-[0.98] text-sm"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </button>

          {/* Tombol Reset */}
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium rounded-xl transition-all active:scale-[0.98] text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
}