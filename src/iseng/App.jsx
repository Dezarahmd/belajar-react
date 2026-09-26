import ProductCard from "./ProductCard";

export default function App(){
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
            <div className="flex flex-row gap-6">
                <ProductCard name="Kopi Susu" price={18000} category="Minuman" image="/assets/kopi-susu.jpg"/>
                <ProductCard name="Croissant" price={22000} category="Makanan" image="/assets/croissant.jpg"/>
            </div>
        </div>
    )
}