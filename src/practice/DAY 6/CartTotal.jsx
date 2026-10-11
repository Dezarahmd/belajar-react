import React from 'react'

const CartTotal = ({ quantity, pricePerItem }) => {
  const totalPrice = quantity * pricePerItem

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl max-w-xs mt-3">
      <span className="text-sm font-medium text-gray-600">Total:</span>
      <span className="text-lg font-bold text-gray-900">
        Rp {totalPrice.toLocaleString('id-ID')}
      </span>
    </div>
  )
}

export default CartTotal