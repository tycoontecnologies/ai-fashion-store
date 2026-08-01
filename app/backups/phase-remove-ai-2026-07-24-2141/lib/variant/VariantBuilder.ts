export interface ProductVariant {

  id: string;

  color: string;

  size: string;

  sku: string;

  stock: number;

  price: number;

  image: string;

  gallery: string[];

}

export class VariantBuilder {

  static create(product: any): ProductVariant[] {

    if (
      Array.isArray(product.variants) &&
      product.variants.length > 0
    ) {

      return product.variants.map((v: any) => ({

        id:
          v.id ||
          crypto.randomUUID(),

        color:
          v.color ||
          product.color ||
          "Unknown",

        size:
          v.size ||
          "M",

        sku:
          v.sku ||
          product.id,

        stock:
          Number(v.stock ?? 100),

        price:
          Number(v.price ?? product.price),

        image:
          product.image,

        gallery:
          product.gallery || [],

      }));

    }

    return [];

  }

}