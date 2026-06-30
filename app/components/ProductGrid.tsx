import ProductCard from "./ProductCard";

type Props = {
  products: any[];
};

export default function ProductGrid({ products }: Props) {

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}