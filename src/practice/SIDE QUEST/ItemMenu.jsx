import Promo from "./Promo";

export default function ItemMenu({ nama, harga, tersedia, diskon }) {
  return (
    <div className="my-2 text-base">
      <span
        className={`font-medium ${
          // Jika tersedia false, teks jadi abu-abu. Jika true, teks hitam/gelap.
          tersedia ? "text-gray-900" : "text-gray-400 line-through"
        }`}
      >
        {nama}{" "}
        {/* Ternary operator untuk menampilkan teks (Habis) jika tersedia bernilai false */}
        {tersedia ? ("") : (<span className="text-xs text-red-500 font-normal ml-1">(Habis)</span>)}
        <p>{harga.toLocaleString('id-ID')}</p>
        {diskon > 0 && (<span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Diskon: {diskon}%</span>)}
        <Promo aktif={true}/>
      </span>
    </div>
  );
}
