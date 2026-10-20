import React, { useReducer, useState } from "react";

const initialProducts = [
  { id: 1, nama: "Keyboard Mechanical", jumlah: 10 },
  { id: 2, nama: "Mouse Wireless", jumlah: 15 },
  { id: 3, nama: "Headset Gaming", jumlah: 5 },
];

function updateStok(inventaris, action) {
  return inventaris.map((produk) => {
    if (produk.id === action.id) {
      return {
        ...produk,
        jumlah: produk.jumlah + action.jumlah,
      };
    } else {
      return produk;
    }
  });
}

function inventoryReducer(state, action) {
  switch (action.type) {
    case "tambah_stok":
      return updateStok(state, action);

    case "kurangi_stok": {
      const produk = state.find((item) => item.id === action.id);

      if (!produk) {
        alert("id produk tidak ditemukan");
        return state;
      } else if (action.jumlah > produk.jumlah) {
        alert("stok tidak mencukupi");
        return state;
      } else {
        return updateStok(state, {
          ...action,
          jumlah: -action.jumlah,
        });
      }
    }

    case "tambah_produk": {
      if (!action.nama || action.nama.trim() === "") {
        alert("Nama produk tidak boleh kosong");
        return state;
      }
      const newProduct = {
        id: state.length > 0 ? Math.max(...state.map((p) => p.id)) + 1 : 1,
        nama: action.nama.trim(),
        jumlah: 0,
      };
      return [...state, newProduct];
    }

    case "hapus_produk":
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
}

export default function InventoryManagement() {
  const [products, dispatch] = useReducer(inventoryReducer, initialProducts);
  const [namaBaru, setNamaBaru] = useState("");
  // Menyimpan jumlah per item berdasarkan ID produk
  const [inputJumlah, setInputJumlah] = useState({});

  const handleJumlahChange = (id, value) => {
    const val = parseInt(value, 10);
    setInputJumlah((prev) => ({
      ...prev,
      [id]: isNaN(val) || val < 1 ? 1 : val,
    }));
  };

  const handleTambahProduk = (e) => {
    e.preventDefault();
    if (!namaBaru.trim()) {
      alert("Masukkan nama produk terlebih dahulu");
      return;
    }
    dispatch({ type: "tambah_produk", nama: namaBaru });
    setNamaBaru("");
  };

  const totalProduk = products.length;
  const totalStok = products.reduce((acc, curr) => acc + curr.jumlah, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header & Metric Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Inventaris Toko
            </h1>
            <p className="text-sm text-gray-500">
              Kelola jumlah dan daftar produk toko elektronik Anda
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-center">
              <span className="text-xs text-gray-500 block font-medium">
                Total Produk
              </span>
              <span className="text-lg font-bold text-blue-600">
                {totalProduk}
              </span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-center">
              <span className="text-xs text-gray-500 block font-medium">
                Total Stok
              </span>
              <span className="text-lg font-bold text-emerald-600">
                {totalStok}
              </span>
            </div>
          </div>
        </div>

        {/* Fitur 4 — Form Tambah Produk Baru */}
        <form
          onSubmit={handleTambahProduk}
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
        >
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Tambah Produk Baru
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={namaBaru}
              onChange={(e) => setNamaBaru(e.target.value)}
              placeholder="Masukkan nama produk baru (contoh: Monitor 24 Inch)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
            >
              + Tambah Produk
            </button>
          </div>
        </form>

        {/* Fitur 1, 2, 3, 5 — Daftar Inventaris & Aksi Per Produk */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-semibold text-gray-900">
              Daftar Inventaris
            </h2>
            <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
              Data Aktif
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-medium">ID</th>
                  <th className="px-6 py-3 font-medium">Nama Barang</th>
                  <th className="px-6 py-3 font-medium">Stok Saat Ini</th>
                  <th className="px-6 py-3 font-medium">
                    Kelola Stok (Kurangi / Tambah)
                  </th>
                  <th className="px-6 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      Tidak ada produk dalam inventaris.
                    </td>
                  </tr>
                ) : (
                  products.map((item) => {
                    const qty = inputJumlah[item.id] ?? 1;

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono text-xs text-gray-400">
                          #{item.id}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {item.nama}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            {item.jumlah} unit
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {/* Controls Jumlah, Tambah, & Kurangi */}
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={qty}
                              min="1"
                              onChange={(e) =>
                                handleJumlahChange(item.id, e.target.value)
                              }
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                dispatch({
                                  type: "kurangi_stok",
                                  id: item.id,
                                  jumlah: qty,
                                })
                              }
                              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-medium transition-colors"
                            >
                              - Kurangi
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                dispatch({
                                  type: "tambah_stok",
                                  id: item.id,
                                  jumlah: qty,
                                })
                              }
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition-colors"
                            >
                              + Tambah
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {/* Tombol Hapus Produk */}
                          <button
                            type="button"
                            onClick={() =>
                              dispatch({
                                type: "hapus_produk",
                                id: item.id,
                              })
                            }
                            className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded text-xs font-medium transition-colors"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}