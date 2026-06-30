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

  static async loadProducts() {

    const res = await fetch("/api/products");

    if (!res.ok) {
      throw new Error("Unable to load products.");
    }

    const products =
      await res.json();

    return products as ImportedProduct[];

  }

}