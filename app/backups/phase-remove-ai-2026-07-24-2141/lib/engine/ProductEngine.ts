import { GalleryDetector } from "../gallery/GalleryDetector";
import { DuplicateDetector } from "../duplicateDetector";
import { ProductImporter } from "../importer/ProductImporter";
import { ProductClassifier } from "../classifier/ProductClassifier";
import { GalleryBuilder } from "../gallery/GalleryBuilder";
import { VariantBuilder } from "../variant/VariantBuilder";

export class ProductEngine {

  static async analyze() {

    const products =
      await ProductImporter.loadProducts();

    const analyzed = products.map((product: any) => {

      const color =
        ProductClassifier.detectColor(
          product.name
        );

      const category =
        ProductClassifier.detectCategory(
          product.name
        );

      const gallery =
        GalleryBuilder.build(product);

      const variants =
        VariantBuilder.create({
          ...product,
          color,
          category,
          gallery: gallery.gallery,
        });

      return {

        ...product,

        color,

        category,

        image:
          gallery.primary,

        gallery:
          gallery.gallery,

        variants,

      };

    });

    const galleries =
  GalleryDetector.group(analyzed);

return galleries;

  }

}