import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");

  const clearMessage = () => setMessage("");

  return (
    <NotificationContext.Provider value={{ message, setMessage, clearMessage }}>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start p-6 relative font-sans">
        <div className="w-full max-w-2xl space-y-6">
          {children}
        </div>
      </div>
    </NotificationContext.Provider>
  );
}