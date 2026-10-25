import React from 'react';
import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

export default function HeaderNotification(){
    const {setMessage} = useContext(NotificationContext)
  return (
    <header className="w-full bg-slate-800 border border-slate-700/60 rounded-2xl p-5 shadow-lg flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-white tracking-wide">Dashboard Admin</h1>
        <p className="text-xs text-slate-400">Sistem Manajemen Notifikasi Global</p>
      </div>

      <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700 px-3 py-1.5 rounded-lg">
        <span className="text-xs text-slate-400">Status Toast:</span>
        <span className="text-xs font-semibold text-cyan-400 max-w-37.5 truncate">
          <button onClick={() => setMessage("Selamat datang di aplikasi")}>
            Tampilkan Notifikasi
          </button>
        </span>
      </div>
    </header>
  );
};