import { useContext } from "react";
import { TemaContext } from "./TemaContext";

export default function Footer() {
  const [isLight] = useContext(TemaContext);

  return (
    <footer className={`border-t py-6 transition-colors duration-300 ${
      isLight ? "border-gray-200 bg-gray-50 text-gray-600" : "border-gray-800 bg-gray-950 text-gray-400"
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p>© 2026 Kopi Nusantara. Hak Cipta Dilindungi.</p>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          <span>Status Tema: <strong className={isLight ? "text-gray-900" : "text-white"}>{isLight ? "Light Mode" : "Dark Mode"}</strong></span>
        </div>
      </div>
    </footer>
  );
}