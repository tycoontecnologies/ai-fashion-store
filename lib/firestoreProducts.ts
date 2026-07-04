import { getProducts as getAdminProducts } from "./adminProducts";

export async function getProducts() {
  return await getAdminProducts();
}

export async function getProductsForStore() {
  return await getAdminProducts();
}

export async function getProductById(id: string) {
  const products = await getAdminProducts();
  return products.find((p: any) => p.id === id) || null;
}

export async function getVariantGroup(group: string) {
  if (!group) return [];

  const products = await getAdminProducts();

  return products.filter(
    (p: any) => p.variantGroup === group
  );
}