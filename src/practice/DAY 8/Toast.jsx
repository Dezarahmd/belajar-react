import React, { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

export default function Toast() {
  const { message, setMessage } = useContext(NotificationContext);

  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-fade-in">
      <div className="flex items-center justify-between gap-3 bg-slate-800/90 backdrop-blur-md border border-cyan-500/30 text-slate-100 px-4 py-3 rounded-xl shadow-2xl shadow-cyan-950/50">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <p className="text-sm font-medium">{message}</p>
        </div>

        <button
          onClick={() => setMessage("")}
          className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 p-1.5 rounded-lg transition-colors text-xs font-semibold"
          aria-label="Close Toast"
        >
          ✕
        </button>
      </div>
    </div>
  );
}