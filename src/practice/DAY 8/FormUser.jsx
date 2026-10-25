import React, { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

export function FormUser() {
  const { setMessage } = useContext(NotificationContext);

  return (
    <div className="w-full bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-lg space-y-5">
      <div className="border-b border-slate-700/60 pb-3">
        <h2 className="text-md font-semibold text-slate-200">Simulasi Aksi Pengguna</h2>
        <p className="text-xs text-slate-400">Klik tombol di bawah untuk memicu Notifikasi Toast Global.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setMessage("Berhasil menyimpan data!")}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          Set Sukses
        </button>

        <button
          onClick={() => setMessage("Gagal mengunggah berkas.")}
          className="w-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          Set Gagal
        </button>

        <button
          onClick={() => setMessage("")}
          className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          Kosongkan Notif
        </button>
      </div>
    </div>
  );
}