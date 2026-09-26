import BuyButton from "./BuyButton"

export default function ProductCard({name, price, category, image}){
    return (
        <div className="flex flex-col bg-slate-100 p-6 rounded-lg shadow-md text-black w-72">
                <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-4"/>
                <h2 className="text-indigo-500 text-lg font-semibold">{name}</h2>
                <p className="text-slate-800 text-sm">Rp {price.toLocaleString('id-ID')}</p>
                <p className="text-slate-500 text-xs italic pt-1">{category}</p>
                <BuyButton/>
        </div>
    )
}