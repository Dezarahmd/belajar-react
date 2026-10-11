import { useState } from "react";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main>
      {/* Tampilkan salah satu secara kondisional agar tidak bertumpuk */}
      {isLoggedIn ? (
        <UserProfile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      )}
    </main>
  );
}