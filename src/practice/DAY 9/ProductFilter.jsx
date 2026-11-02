import { memo, useCallback, useMemo, useState } from "react";

export const PRODUCTS = [
  { id: 1, name: "Laptop ASUS ROG", category: "Laptop", stock: 12 },
  { id: 2, name: "Laptop Lenovo ThinkPad", category: "Laptop", stock: 8 },
  { id: 3, name: "Mouse Logitech MX Master", category: "Mouse", stock: 25 },
  { id: 4, name: "Mouse Razer DeathAdder", category: "Mouse", stock: 15 },
  { id: 5, name: "Keyboard Keychron K2", category: "Keyboard", stock: 10 },
  { id: 6, name: "Keyboard Logitech G Pro", category: "Keyboard", stock: 18 },
  { id: 7, name: "Monitor LG UltraGear", category: "Monitor", stock: 7 },
  { id: 8, name: "Monitor Samsung Odyssey", category: "Monitor", stock: 9 },
  { id: 9, name: "Headset SteelSeries Arctis", category: "Headset", stock: 14 },
  { id: 10, name: "Headset HyperX Cloud II", category: "Headset", stock: 20 },
  { id: 11, name: "Webcam Logitech C920", category: "Webcam", stock: 6 },
  { id: 12, name: "Microphone Fifine K669", category: "Microphone", stock: 11 },
  { id: 13, name: "SSD Samsung 980 Pro", category: "Storage", stock: 30 },
  { id: 14, name: "RAM Kingston Fury 16GB", category: "RAM", stock: 22 },
  { id: 15, name: "Power Supply Corsair 650W", category: "Power Supply", stock: 5 },
];

/* ---------- Design tokens (static string agar aman untuk Tailwind JIT) ---------- */
const SURFACE = "bg-[#dfe3ec]";
const RAISED = "shadow-[10px_10px_22px_#b4bac6,-10px_-10px_22px_#ffffff]";
const RAISED_SM = "shadow-[5px_5px_10px_#b4bac6,-5px_-5px_10px_#ffffff]";
const PRESSED = "shadow-[inset_5px_5px_10px_#b4bac6,inset_-5px_-5px_10px_#ffffff]";

const STOCK_TIERS = [
  { max: 8, color: "text-rose-600" },
  { max: 15, color: "text-amber-600" },
  { max: Infinity, color: "text-emerald-600" },
];
const getStockColor = (stock) => STOCK_TIERS.find((t) => stock <= t.max).color;

const getTime = () => new Date().toLocaleTimeString();

/* ---------- Presentational component ---------- */
const ProductCard = memo(function ProductCard({ name, category, stock }) {
  return (
    <div className="[perspective-900px]">
      <div
        className={`${SURFACE} ${RAISED} rounded-3xl border-b-4 border-r-4 border-[#c6ccda] p-6 transition duration-300 ease-out hover:[transform-rotateX(6deg)_rotateY(-6deg)_translateY(-4px)]`}
      >
        <span
          className={`${SURFACE} ${RAISED_SM} inline-block rounded-full px-3.5 py-1 text-xs font-medium text-slate-500`}
        >
          {category}
        </span>

        <h2 className="mt-4 text-lg font-semibold leading-snug text-slate-700">{name}</h2>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">Stock</p>
          <span
            className={`${SURFACE} ${PRESSED} ${getStockColor(stock)} min-w-12 rounded-xl px-3 py-1.5 text-center text-sm font-bold`}
          >
            {stock}
          </span>
        </div>
      </div>
    </div>
  );
});

/* ---------- Container ---------- */
export default function ProductFilter() {
  const [query, setQuery] = useState("");
  const [lastUpdated, setLastUpdated] = useState(getTime);

  // Derived state: dihitung saat render, tanpa state + effect tambahan (hindari render ganda)
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)) : PRODUCTS;
  }, [query]);

  // Timestamp diset di event handler (penyebab sebenarnya), bukan di effect
  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
    setLastUpdated(getTime());
  }, []);

  return (
    <div className={`${SURFACE} min-h-screen px-4 py-10 sm:px-8`}>
      <div className="mx-auto max-w-5xl">
        <header className={`${SURFACE} ${RAISED} mb-10 rounded-4xl p-7`}>
          <h1 className="mb-5 text-2xl font-bold tracking-tight text-slate-700 sm:text-3xl">
            Katalog Produk
          </h1>

          <input
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="cari produk..."
            aria-label="Cari produk"
            className={`${SURFACE} ${PRESSED} w-full rounded-2xl px-5 py-3.5 text-slate-700 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-400/60`}
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
            <p>
              {filteredProducts.length} dari {PRODUCTS.length} produk
            </p>
            <p>terakhir diperbarui: {lastUpdated}</p>
          </div>
        </header>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(({ id, ...product }) => (
              <ProductCard key={id} {...product} />
            ))}
          </div>
        ) : (
          <div className={`${SURFACE} ${PRESSED} rounded-3xl p-10 text-center`}>
            <p className="text-lg font-semibold text-slate-700">
              Tidak ada produk untuk “{query}”
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Coba kata kunci lain, misalnya nama merek atau jenis produk.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}