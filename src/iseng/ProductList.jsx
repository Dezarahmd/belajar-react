import ProductCard from "./ProductCard";

export default function ProductList({ products , onAddToCart}) {
  return products.map((product) => (
    <ProductCard key={product.id} {...product} onAddToCart={onAddToCart}/>
  ));
}