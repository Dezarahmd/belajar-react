function ProductCard({productName}){

    const handleCardClick = () => {
        console.log(`Membuka detail produk: ${productName}`)
    }

    const handleButtonClick = (e) => {
        e.stopPropagation();
        console.log("Ditambahkan ke keranjang")
    }

    return (
        <div onClick={handleCardClick} className="flex justify-center items-center min-h-screen">
            <div className="flex-row bg-slate-100 shadow-lg p-6 rounded-lg">
                <h1 className="font-bold text-2xl">Produk 1</h1>
                <p className="font-light text-md text-slate-500">Deskripsi Produk</p>
                <button className="bg-blue-500 p-2 mt-2 texxt-white rounded-lg text-white text-sm" onClick={handleButtonClick}>Tambah Ke Keranjang</button>
            </div>
        </div>
    )
}


export default function App(){
    return (
        <ProductCard productName="kondom"/>
    )
}