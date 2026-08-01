export type Product = any;

const API = "/api/cms/products";

export async function getProducts() {
  const r = await fetch(API, { cache: "no-store" });
  return await r.json();
}

export async function getProduct(id: string) {
  const products = await getProducts();
  return products.find((p: any) => p.id === id || p.slug === id);
}

export async function getProductById(id: string) {
  return getProduct(id);
}

export async function getVariantGroup(groupId?: string) {
  if (!groupId) return [];
  const products = await getProducts();
  return products.filter((p: any) => p.variantGroup === groupId);
}

export async function saveProduct(product: any) {
  const r = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  return await r.json();
}

export async function updateProduct(id: string, product: any) {
  const r = await fetch(API, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...product, id }),
  });

  return await r.json();
}

export async function deleteProduct(id: string) {
  const r = await fetch(API, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  return await r.json();
}

export const products: Product[] = [];
