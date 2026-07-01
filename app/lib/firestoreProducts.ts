import products from "@/data/cms/products.json";

export async function getProducts() {
  return products;
}

export async function getProductById(id: string) {
  return (
    (products as any[]).find(
      p => String(p.id) === String(id)
    ) || null
  );
}