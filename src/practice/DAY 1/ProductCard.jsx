    function ProductCard({ name, price, stock, onAddCart}) {
        const isOutOfStock = stock === 0;

        return (
            <div className="w-64 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-600">{name}</h3>
                <p className="mt-1 text-sm text-gray-600">
                    Harga: <span className="font-bold text-gray-900">Rp. {price.toLocaleString('id-ID')}</span>
                </p>

                <div className="my-3 text-sm">
                    {isOutOfStock ? (
                        <span className="inline-block rounded-md bg-red-100 px-2.5 py-1 font-medium text-red-700">
                            Stok Habis
                        </span>
                    ) : (
                        <span className="text-gray-500">Stok: {stock}</span>
                    )}
                </div>

                <button
                    onClick={() => onAddCart(name)}
                    disabled={isOutOfStock}
                    className={`w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
                    isOutOfStock
                    ? 'cursor-not-allowed bg-gray-300'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }`}
                >
                    Tambah ke Keranjang
                </button>

            </div>
        )
    }

    export default function App(){
        const handleAddToCart = (productName) => {
            alert(`Produk ${productName} berhasil ditambahkan ke keranjang!`);
        }

        return (
            <div className="min-h-screen bg-gray-50 pt-8 font-sans">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">Daftar Produk</h1>
                <div className="flex flex-wrap gap-4">
                    <ProductCard 
                        name="Fender Stratocaster"
                        price={15000000}
                        stock={5}
                        onAddCart={handleAddToCart}
                    />
                    <ProductCard
                        name="Gibson Les Paul"
                        price={20000000}
                        stock={0}
                        onAddCart={handleAddToCart}
                    />
                </div>
            </div>
        )
    }

