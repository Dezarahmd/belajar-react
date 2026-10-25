import { useContext } from "react";
import { TemaContext } from "./TemaContext";
import { KeranjangContext } from "./KeranjangContext";

const produkKopi = [
  {
    id: 1,
    nama: "Arabika Specialty",
    harga: 45000,
    deskripsi: "Cita rasa asam segar khas pegunungan dengan aroma floral.",
  },
  {
    id: 2,
    nama: "Robusta Asik",
    harga: 50000,
    deskripsi: "Rasa pahit mantap dengan body tebal dan sentuhan cokelat.",
  },
  {
    id: 3,
    nama: "Arabika Anjay",
    harga: 60000,
    deskripsi: "Varietas premium dengan aroma karamel dan manis alami.",
  },
];

export default function DaftarProduk() {
  const [isLight] = useContext(TemaContext);
  const {tambahKeranjang} = useContext(KeranjangContext)

  return (
    <section>
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Daftar Produk Kopi
        </h2>
        <p
          className={`mt-2 text-sm ${isLight ? "text-gray-600" : "text-gray-400"}`}
        >
          Pilihan biji kopi terbaik asli dari berbagai daerah di Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produkKopi.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${
              isLight
                ? "bg-white border-gray-200 hover:border-amber-400 shadow-gray-100"
                : "bg-gray-800/60 border-gray-700 hover:border-amber-500 shadow-none"
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{item.nama}</h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 font-semibold">
                  Biji Kopi
                </span>
              </div>
              <p
                className={`text-sm mb-6 ${isLight ? "text-gray-600" : "text-gray-400"}`}
              >
                {item.deskripsi}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-300/30">
              <span className="text-lg font-bold text-amber-600">
                Rp {item.harga.toLocaleString('id-ID')}
              </span>

              {/* Tombol Tambah ke Keranjang */}
              <button className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-600 text-white hover:bg-amber-700 active:scale-95 transition" onClick={() => tambahKeranjang(item)}>
                + Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
