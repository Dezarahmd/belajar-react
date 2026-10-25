import { useContext } from "react";
import { TemaContext } from "./TemaContext";
import { KeranjangContext } from "./KeranjangContext";

export default function Keranjang() {
  const [isLight] = useContext(TemaContext);
  const {keranjang, tambahJumlah, kurangiJumlah, hapusProduk} = useContext(KeranjangContext)
  const totalHarga = keranjang.reduce((total, item) => {
    return total + (item.quantity * item.harga)
  }, 0)

  return (
    <section className={`mt-12 p-6 rounded-2xl border transition-colors duration-300 ${
      isLight ? "bg-white border-gray-200 shadow-sm" : "bg-gray-800/80 border-gray-700"
    }`}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span>🛒</span> Keranjang Belanja
      </h2>

      {/* Daftar Item di Keranjang */}
      <div className="divide-y divide-gray-200/20">
        {keranjang.map((item) => (
          <div key={item.id} className="py-3 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm">{item.nama}</h4>
              <p className="text-xs text-amber-600 font-medium">Rp {(item.quantity * item.harga).toLocaleString('id-ID')}</p>
            </div>

            {/* Kontrol Quantity & Hapus */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center rounded-lg border ${
                isLight ? "border-gray-300 bg-gray-50" : "border-gray-600 bg-gray-700"
              }`}>
                <button className="px-2 py-1 text-xs font-bold hover:bg-gray-200/50 rounded-l-lg" onClick={() => kurangiJumlah(item.id)}>-</button>
                <span className="px-3 text-xs font-bold">{item.quantity}</span>
                <button className="px-2 py-1 text-xs font-bold hover:bg-gray-200/50 rounded-r-lg" onClick={() => tambahJumlah(item.id)}>+</button>
              </div>

              <button className="text-xs text-red-500 hover:text-red-700 font-medium" onClick={() => hapusProduk(item.id)}>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Tombol Checkout */}
      <div className="mt-6 pt-4 border-t border-gray-300/30 flex items-center justify-between">
        <div>
          <p className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}>Total Estimasi</p>
          <p className="text-lg font-bold text-amber-600">Rp {totalHarga.toLocaleString('id-ID')}</p>
        </div>
        <button className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-md transition">
          Checkout
        </button>
      </div>
    </section>
  );
}