import ProductCard from "./ProductCard";

type Props = {
  products: any[];
};

export default function ProductGrid({
  products,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}