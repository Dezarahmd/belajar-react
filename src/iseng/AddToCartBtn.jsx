export default function AddToCartBtn({ productName, onAddToCart, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={() => onAddToCart(productName)}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
    >
      {disabled ? "Tidak Tersedia" : "Tambah ke Keranjang"}
    </button>
  );
}