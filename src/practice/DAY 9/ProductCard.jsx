import React from 'react'

const ProductCard = React.memo(({ name, category, stock }) => {
    return (
        <li className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md">
            <div className="min-w-0 pr-4">
                <h3 className="truncate font-semibold text-slate-900">{name}</h3>
                <span className="mt-1 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {category}
                </span>
            </div>
            <div className="shrink-0 text-right">
                <span className="block text-xs text-slate-500">Stok</span>
                <span className={`text-sm font-bold ${stock > 10 ? 'text-slate-800' : 'text-amber-600'}`}>
                    {stock} unit
                </span>
            </div>
        </li>
    )
})

ProductCard.displayName = "ProductCard"

export default ProductCard