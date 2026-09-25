import React from 'react';
import CartItem from './CartItem';

function Cart({ cartItems, onRemoveItem }) {
  // Fungsi helper untuk mengubah string harga ("Rp 18.000") menjadi angka
  const parseHargaToNumber = (hargaString) => {
    return parseInt(hargaString.replace(/[^0-9]/g, ""), 10);
  };

  // Hitung total keseluruhan dari semua item di keranjang
  const totalKeseluruhan = cartItems.reduce((total, item) => {
    const hargaAngka = parseHargaToNumber(item.harga);
    return total + (hargaAngka * item.qty);
  }, 0);

  // Format angka ke Rupiah
  const formatRupiah = (angka) => {
    return "Rp " + angka.toLocaleString("id-ID");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
        Keranjang Pesanan 🛒
      </h3>

      {/* Kondisi jika keranjang kosong */}
      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-6">
          Belum ada pesanan
        </p>
      ) : (
        <div>
          {/* List item di keranjang */}
          <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto mb-4">
            {cartItems.map((item) => (
              <CartItem 
                key={item.nama}
                item={item}
                onRemove={onRemoveItem}
              />
            ))}
          </div>

          {/* Bagian Total Keseluruhan */}
          <div className="pt-3 border-t border-gray-200 flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-700">Total Keseluruhan:</span>
            <span className="font-extrabold text-emerald-600 text-lg">
              {formatRupiah(totalKeseluruhan)}
            </span>
          </div>

          {/* Tombol Checkout (Opsional/Bonus interaksi) */}
          <button 
            onClick={() => alert("Pesanan berhasil dikirim ke kasir!")}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer"
          >
            Pesan Sekarang
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;