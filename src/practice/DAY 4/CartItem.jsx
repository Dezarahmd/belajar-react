import { useState } from "react";

function CartItem({name, price}){
    const [qty, setQty] = useState(1)

    function handleDecrease(){
        setQty(prevQty => prevQty + 1)
    }

    function handleIncrease(){
        setQty(prevQty => (prevQty > 1 ? prevQty - 1 : 1))
    }

    const totalPrice = price * qty

    return (
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm mb-3 flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-semibold text-slate-800 text-base">{name}</h4>
                    <p className="text-sm text-slate-500">Rp {price.toLocaleString('id-ID')}</p>
                </div>
                <div className="text-right">
                    <span className="text-xs text-slate-600 block">Subtotal</span>
                    <span className="font-bold text-indigo-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="text-sm text-slate-600">Jumlah: <strong className="text-slate-800">{qty}</strong></span>
                <div className="flex items-center gap-2">
                    <button onClick={handleIncrease} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transtition-color cursor-pointer">-</button>
                    <button onClick={handleDecrease} className="w-8 h-8 flex-items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold rounded-lg transition-colors cursor-pointer">+</button>
                </div>
            </div>
        </div>
    )
}

export default function Cart(){
    const products = [
        {id: 1, name: 'Kopi Hitam', price: 15000},
        {id: 2, name: 'Cokelat', price: 25000},
        {id: 3, name: 'Matcha', price: 35000}
    ]
    return (
        <div className="max-w-md mx-auto p-6 bg-slate-50 min-h-screen font-sans">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">Keranjang Belanja</h2>
            <div className="space-y-3">
                {products.map(product => (
                    <CartItem key={product.id} name={product.name} price={product.price}/>
                ))}
            </div>
        </div>
    )
}