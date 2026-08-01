export interface ProductGallery {

  primary: string;

  gallery: string[];

}

export class GalleryBuilder {

  static build(product: any): ProductGallery {

    const images = new Set<string>();

    if (
      product.image &&
      product.image.trim() !== ""
    ) {
      images.add(product.image);
    }

    if (Array.isArray(product.gallery)) {

      product.gallery.forEach((img: string) => {

        if (img && img.trim() !== "") {
          images.add(img);
        }

      });

    }

    return {

      primary:
        product.image ||
        [...images][0] ||
        "/products/product_0001.png",

      gallery: [...images],

    };

  }

}