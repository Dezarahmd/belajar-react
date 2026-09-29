import AddToCartBtn from "./AddToCartBtn";
import SoldOut from "./SoldOut";

export default function ProductCard({ name, price, category, image, available, onAddToCart }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {category}
        </span>
      </div>

      <div className="p-5 flex flex-col grow gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-800 truncate">{name}</h2>
            <p className="text-indigo-600 font-semibold text-lg">
              Rp {price.toLocaleString("id-ID")}
            </p>
          </div>

          {available ? (
            <span className="shrink-0 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md text-xs font-semibold">
              Tersedia
            </span>
          ) : (
            <SoldOut />
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <AddToCartBtn
            productName={name}
            onAddToCart={onAddToCart}
            disabled={!available}
          />
        </div>
      </div>
    </div>
  );
}