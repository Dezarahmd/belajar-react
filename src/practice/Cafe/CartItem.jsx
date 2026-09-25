function CartItem({ item, onRemove }) {
  // Fungsi helper untuk mengubah string harga ("Rp 18.000") menjadi angka (18000)
  const parseHargaToNumber = (hargaString) => {
    return parseInt(hargaString.replace(/[^0-9]/g, ""), 10);
  };

  // Hitung subtotal (Harga satuan x Qty)
  const hargaAngka = parseHargaToNumber(item.harga);
  const subtotal = hargaAngka * item.qty;

  // Format kembali angka subtotal ke format rupiah
  const formatRupiah = (angka) => {
    return "Rp " + angka.toLocaleString("id-ID");
  };

  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      {/* Detail Item: Nama & Qty */}
      <div>
        <h4 className="font-semibold text-gray-800 text-sm">{item.nama}</h4>
        <p className="text-xs text-gray-500">
          {item.qty} x {item.harga}
        </p>
      </div>

      {/* Subtotal & Tombol Hapus */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-sm text-gray-900">
          {formatRupiah(subtotal)}
        </span>
        
        <button 
          onClick={() => onRemove(item.nama)}
          className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

export default CartItem;