import React from 'react'
import { useReducer } from 'react'

const initialState = {
    nama: "Keyboard Mechanical",
    harga: 35000,
    jumlah: 1
}

function reducer(state, action){
    switch (action.type) {
        case "TAMBAH":
            return {
                ...state,
                jumlah: state.jumlah + 1
            }

        case "KURANG":
            return {
                ...state,
                jumlah: state.jumlah > 0 ? state.jumlah - 1 : 0
            }

        default:
            return state
    }

}

const CartReducer = () => {
    const [item, dispatch] = useReducer(reducer, initialState)

    function handleIncrement(){
        dispatch({
            type: "TAMBAH"
        })
    }

    function handleDecrement(){
        dispatch({
            type: "KURANG"
        })
    }

  return (
    <div>
        <h1>{initialState.nama}</h1>
        <p> Rp {initialState.harga.toLocaleString('id-ID')}</p>
        <button onClick={handleDecrement}>-</button>
        <p>{item.jumlah}</p>
        <button onClick={handleIncrement}>+</button>
    </div>
  )
}

export default CartReducer