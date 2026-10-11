import React from 'react'

const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="flex flex-col gap-3 p-5 bg-white border border-gray-200 rounded-xl shadow-sm max-w-xs">
      <div>
        <h1 className="text-lg font-bold text-gray-800">Kopi Susu</h1>
        <p className="text-sm text-gray-500">Harga: Rp 18.000</p>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onDecrement}
          className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors cursor-pointer"
        >
          -
        </button>
        
        <span className="w-8 text-center font-medium text-gray-800">{quantity}</span>
        
        <button 
          onClick={onIncrement}
          className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default QuantitySelector