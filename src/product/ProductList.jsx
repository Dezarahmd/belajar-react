
import { useEffect, useState } from "react";
import Product from "./Product";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [load, setLoad]  = useState(false)


    function handleClick(){
        setLoad(true)
    }

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/products.json")
            const data = await res.json()
            setProducts(data)
        }
        if(load){
            fetchProducts()
        }
    })

    return (
        <>
            <h1>Product list</h1>
            <button onClick={handleClick}>Load Products</button>
            {products.map((product) => (
                <Product product={product} key={product.id} />
            ))}
        </>
    );
}
