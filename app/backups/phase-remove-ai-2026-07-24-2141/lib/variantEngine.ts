export interface VariantGroup {
  parentId: string;
  parentName: string;
  products: any[];
}

function normalizeName(name: string): string {
  return (name || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function groupProductsByName(products: any[]): VariantGroup[] {
  const groups = new Map<string, any[]>();

  for (const product of products) {
    const key = normalizeName(product.name);

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key)!.push(product);
  }

  return Array.from(groups.entries()).map(([key, items]) => ({
    parentId: items[0].id,
    parentName: items[0].name,
    products: items,
  }));
}

export function hasVariants(product: VariantGroup): boolean {
  return product.products.length > 1;
}

export function getVariantCount(product: VariantGroup): number {
  return product.products.length;
}