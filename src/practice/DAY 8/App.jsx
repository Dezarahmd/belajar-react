import React from 'react';
import NotificationProvider  from './NotificationContext';
import Toast  from './Toast';
import HeaderNotification  from './HeaderNotification';
import {FormUser}  from './FormUser';

export default function App() {
  // Nanti handler & state dari Context akan dihubungkan di sini atau di dalam Provider

  return (
    <NotificationProvider>
      <Toast/>
      <HeaderNotification/>
      <main className="w-full">
        <FormUser />
      </main>
    </NotificationProvider>
  );
}