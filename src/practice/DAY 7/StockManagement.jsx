import { useState, useReducer } from "react";

const barang = {
    nama: "Helm",
    jumlah: 1
};

function stokReducer(state, action) {
    switch (action.type) {
        case "tambah_stok":
            return {
                ...state,
                jumlah: state.jumlah + action.jumlah
            };

        case "kurangi_stok":
            if (action.jumlah > state.jumlah) {
                alert("Gagal: Jumlah barang keluar melebihi stok yang tersedia!");
                return state;
            }
            return {
                ...state,
                jumlah: state.jumlah - action.jumlah
            };
        
        default:
            return state;
    }
}

export default function StockManagement() {
    const [stock, dispatch] = useReducer(stokReducer, barang);
    const [jumlahMasuk, setJumlahMasuk] = useState("");
    const [jumlahKeluar, setJumlahKeluar] = useState("");

    function handleTambah() {
        const jumlahInput = Number(jumlahMasuk);
        
        // Validasi: pastikan input adalah angka bulat dan lebih dari 0
        if (!Number.isInteger(jumlahInput) || jumlahInput <= 0) {
            return;
        }

        dispatch({
            type: "tambah_stok",
            jumlah: jumlahInput
        });
        
        // Reset input setelah berhasil
        setJumlahMasuk("");
    }

    function handleKurang() {
        const jumlahInput = Number(jumlahKeluar);
        
        // Validasi: pastikan input adalah angka bulat dan lebih dari 0
        if (!Number.isInteger(jumlahInput) || jumlahInput <= 0) {
            return;
        }

        dispatch({
            type: "kurangi_stok",
            jumlah: jumlahInput
        });
        
        // Reset input setelah berhasil
        setJumlahKeluar("");
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 font-sans text-gray-500">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-slate-800 font-bold text-2xl">Manajemen Stok</h1>
                    <p className="mt-1 text-sm">Pantau persediaan barang dengan mudah</p>
                </div>
                
                {/* Status Stok */}
                <div className="flex flex-col items-center gap-2 border border-gray-200 bg-gray-50 mx-6 my-6 rounded-xl p-6">
                    <h2 className="font-semibold text-xl text-slate-800">{stock.nama}</h2>
                    <p className="text-sm">Stok saat ini</p>
                    <h3 className="font-bold text-4xl text-slate-800 my-2">{stock.jumlah} Unit</h3>
                    
                    {/* Badge Kondisional: Hijau kalau ada stok, Merah kalau habis */}
                    {stock.jumlah > 0 ? (
                        <span className="bg-green-100 text-green-700 font-medium rounded-full px-4 py-1 text-sm border border-green-200">
                            Stok Tersedia
                        </span>
                    ) : (
                        <span className="bg-red-100 text-red-700 font-medium rounded-full px-4 py-1 text-sm border border-red-200">
                            Stok Habis
                        </span>
                    )}
                </div>
                
                {/* Form Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
                    
                    {/* Tambah Stok */}
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-slate-800">Barang Masuk</h2>
                        <p className="mb-3 text-sm">Input jumlah barang yang masuk</p>
                        <input 
                            type="number" 
                            min="1"
                            placeholder="Jumlah barang..."
                            className="border border-gray-300 w-full rounded-lg h-11 px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={jumlahMasuk}
                            onChange={(e) => setJumlahMasuk(e.target.value)}
                        />
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                            onClick={handleTambah}
                        >
                            + Tambah stok
                        </button>
                    </div>
                    
                    {/* Kurangi Stok */}
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-slate-800">Barang Keluar</h2>
                        <p className="mb-3 text-sm">Input jumlah barang yang keluar</p>
                        <input 
                            type="number" 
                            min="1"
                            placeholder="Jumlah barang..."
                            className="border border-gray-300 w-full rounded-lg h-11 px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            value={jumlahKeluar}
                            onChange={(e) => setJumlahKeluar(e.target.value)}
                        />
                        <button 
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg transition-colors"
                            onClick={handleKurang}
                        >
                            - Kurangi stok
                        </button>
                    </div>

                </div>
                
                {/* Warning Footer */}
                <div className="bg-amber-50 border-t border-amber-200 p-4 text-center">
                    <p className="text-amber-700 text-sm font-medium">
                        ⚠️ Pastikan stok mencukupi sebelum memproses penjualan
                    </p>
                </div>
                
            </div>
        </div>
    );
}