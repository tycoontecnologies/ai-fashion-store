export interface ImportedImage {
  file: string;
  path: string;
}

export interface ImportedProduct {
  id: string;
  name: string;
  image: string;
  images: ImportedImage[];
  color?: string;
  category?: string;
}

export class ProductImporter {
  static async loadProducts(): Promise<ImportedProduct[]> {
    const res = await fetch("/api/cms/products");

    if (!res.ok) {
      throw new Error("Unable to load products.");
    }

    return (await res.json()) as ImportedProduct[];
  }
}
