import { useState } from "react";
import ProductList from "./ProductList";

const products = [
  {
    id: 1,
    name: "Kopi Susu",
    price: 18000,
    category: "Minuman",
    image: "/assets/kopi-susu.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Matcha Latte",
    price: 22000,
    category: "Minuman",
    image: "/assets/matcha.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Croissant",
    price: 20000,
    category: "Makanan",
    image: "/assets/croissant.jpg",
    available: false,
  },
  {
    id: 4,
    name: "Brownies",
    price: 25000,
    category: "Makanan",
    image: "/assets/brownies.jpeg",
    available: true,
  },
];

export default function App() {

    const [cartCount, setCartCount] = useState(0)

    function handleAddToCart(){
        setCartCount((prev) => prev +1 )
    }

  return (
    <div className="min-h-screen w-full bg-gray-100 px-6 py-12 flex flex-col items-center">
        <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Kafe Kode
        </h1>
        <p className="text-sm text-gray-500">Pilih menu favoritmu hari ini:</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 font-semibold text-gray-800">
            🛒 Keranjang: {cartCount}
            </div>
        </header>

        <div className="w-full max-w-6xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <ProductList products={products} onAddToCart={handleAddToCart}/>
        </div>
    </div>
    );
}