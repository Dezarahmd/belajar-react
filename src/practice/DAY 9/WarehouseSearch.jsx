import { useRef, useEffect, useState } from "react";

const PRODUCTS = [
  "Laptop ASUS ROG",
  "Mouse Logitech MX Master",
  "Keyboard Keychron K2",
  "Monitor LG 24 Inch",
  "Headset SteelSeries",
];

export default function WarehouseSearch() {
  const productInput = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    productInput.current.focus();
  });

  function handleFocus() {
    productInput.current.focus();
  }

  function handleClear() {
    setSearchQuery("");
    productInput.current.focus();
  }

  const filteredProducts = PRODUCTS.filter((product) =>
    product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl font-bold text-slate-800">Pencarian Produk</h1>
          <p className="text-sm text-slate-500">Cari barang yang ada di gudang</p>
        </div>

        {/* Input */}
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            ref={productInput}
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleFocus}
            className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-95 transition"
          >
            Fokus
          </button>
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-300 active:scale-95 transition"
          >
            Clear
          </button>
        </div>

        {/* Result count */}
        <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          {filteredProducts.length} produk ditemukan
        </p>

        {/* List */}
        <ul className="space-y-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <li
                key={index}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition"
              >
                <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
                {product}
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-sm text-slate-400 border border-dashed border-slate-300 rounded-lg">
              Produk tidak ditemukan
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}