import React, { useState } from 'react';
import Header from './Header';
import MenuList from './MenuLIst';
import Cart from './Cart';

function App() {
  // State utama untuk keranjang pesanan
  const [cart, setCart] = useState([]);

  // Data menu awal sesuai client request
  const dataMenu = [
    { nama: "Kopi Susu Gula Aren", kategori: "Minuman", harga: "Rp 18.000", status: "tersedia" },
    { nama: "Es Teh Manis", kategori: "Minuman", harga: "Rp 8.000", status: "tersedia" },
    { nama: "Nasi Goreng Kafe", kategori: "Makanan", harga: "Rp 25.000", status: "habis" },
    { nama: "Roti Bakar Coklat Keju", kategori: "Makanan", harga: "Rp 15.000", status: "tersedia" },
    { nama: "Americano", kategori: "Minuman", harga: "Rp 16.000", status: "habis" },
    { nama: "Croissant", kategori: "Makanan", harga: "Rp 20.000", status: "tersedia" },
  ];

  // Fungsi untuk menambah menu ke keranjang (atau menambah qty jika sudah ada)
  const handleAddToCart = (menu) => {
    // Cek apakah menu sudah ada di dalam cart
    const existingIndex = cart.findIndex((item) => item.nama === menu.nama);

    if (existingIndex > -1) {
      // Jika sudah ada, update qty-nya secara immutable (tanpa mutasi langsung)
      const updatedCart = cart.map((item, index) => {
        if (index === existingIndex) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      // Jika belum ada, tambahkan item baru dengan qty 1
      setCart([...cart, { ...menu, qty: 1 }]);
    }
  };

  // Fungsi untuk menghapus item dari keranjang berdasarkan nama
  const handleRemoveFromCart = (namaItem) => {
    const updatedCart = cart.filter((item) => item.nama !== namaItem);
    setCart(updatedCart);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Kafe */}
        <Header />

        {/* Layout Utama: Daftar Menu di Kiri/Atas, Keranjang di Kanan/Bawah */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bagian Daftar Menu (Mengambil 2 kolom di layar besar) */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Menu 📋</h2>
            <MenuList 
              daftarMenu={dataMenu} 
              onAddToCart={handleAddToCart} 
            />
          </div>

          {/* Bagian Keranjang Pesanan (Mengambil 1 kolom di layar besar) */}
          <div>
            <Cart 
              cartItems={cart} 
              onRemoveItem={handleRemoveFromCart} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;