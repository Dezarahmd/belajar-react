import { useContext } from "react";
import { TemaContext } from "./TemaContext";
import { KeranjangContext } from "./KeranjangContext";

export default function Header() {
  const [isLight, setIsLight] = useContext(TemaContext);
  const {keranjang} = useContext(KeranjangContext)

  function handleClick() {
    setIsLight(!isLight);
  }

  return (
    <header className={`border-b transition-colors duration-300 sticky top-0 backdrop-blur-md z-10 ${
      isLight ? "border-gray-200 bg-white/80" : "border-gray-800 bg-gray-900/80"
    }`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">☕</span>
          <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Kopi Nusantara
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Badge Jumlah Produk Keranjang */}
          <div className={`relative p-2 rounded-full border ${
            isLight ? "bg-gray-100 border-gray-300 text-gray-700" : "bg-gray-800 border-gray-700 text-gray-200"
          }`}>
            <span className="text-xl">🛒</span>
            {/* Indikator Angka Jumlah Produk */}
            <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {keranjang.length}
            </span>
          </div>

          {/* Tombol Toggle Tema */}
          <button
            onClick={handleClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 shadow-sm active:scale-95 ${
              isLight
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300"
                : "bg-gray-800 text-amber-400 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            <span>{isLight ? "🌙" : "☀️"}</span>
            <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}