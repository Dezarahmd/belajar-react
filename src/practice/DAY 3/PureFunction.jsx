function calculateDiscount(price, discountPercent){
    return price - (price * (discountPercent / 100))
}


let globalDiscount = 10;

function calculateDiscountImpure(price){
    return price - (price * (globalDiscount / 100))
}

function PriceTag({price, discountPercent}){
    const finalPrice = calculateDiscount(price, discountPercent)

    return (
        <div>
            <p>Harga Asli: {price.toLocaleString()}</p>
            <p>Diskon: {discountPercent}</p>
            <p>Harga Akhir: {finalPrice.toLocaleString()}</p>
        </div>
    )
}

export default function App(){
    return (
        <div>
            <PriceTag price={100000} discountPercent={20}/>
            <PriceTag price={250000} discountPercent={15}/>
        </div>
    )
}