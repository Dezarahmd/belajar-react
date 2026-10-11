export default function ProductList({products, selectedCategory}) {

    const filteredProducts = selectedCategory === "semua" ? products : products.filter(product => product.category === selectedCategory);

    return (
        <div>
            {filteredProducts.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                </div>
            ))}
        </div>
    )
}