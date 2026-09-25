// Komponen MenuItem dengan Tailwind CSS
export default function MenuItem({ nama, kategori, harga, status, onAddToCart }) {
  const isHabis = status === "habis";

  const handlePesan = () => {
    alert(`Berhasil memesan: ${nama}! Silakan lanjutkan ke kasir.`);
  };

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      isHabis 
        ? "bg-gray-100 border-gray-200 opacity-60" 
        : "bg-white border-gray-200 shadow-sm hover:shadow-md"
    }`}>
      {/* Header Card: Kategori & Status */}
      <div className="flex justify-between items-center text-xs mb-2">
        <span className="font-medium text-gray-500 uppercase tracking-wider">
          {kategori}
        </span>
        <span className={`px-2 py-0.5 rounded-full font-semibold ${
          isHabis 
            ? "bg-red-100 text-red-600" 
            : "bg-emerald-100 text-emerald-600"
        }`}>
          {isHabis ? "Habis" : "Tersedia"}
        </span>
      </div>

      {/* Nama Menu */}
      <h3 className={`text-lg font-bold mb-1 ${
        isHabis ? "text-gray-400 line-through" : "text-gray-800"
      }`}>
        {nama}
      </h3>

      {/* Harga & Tombol Aksi */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-900 font-semibold">{harga}</span>

        {/* Tombol Pesan: Dirender kondisional */}
        {!isHabis ? (
          <button 
            onClick={() => onAddToCart({nama, kategori, harga,status})}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Pesan
          </button>
        ) : (
          <span className="text-xs italic text-red-500 font-medium">
            Tidak tersedia
          </span>
        )}
      </div>
    </div>
  );
}