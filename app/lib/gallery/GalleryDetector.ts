export interface GalleryGroup {
  key: string;
  primary: any;
  gallery: any[];
}

export class GalleryDetector {

  static normalize(name: string) {

    return name
      .toLowerCase()
      .replace(
        /\b(front|back|side|left|right|detail|closeup|close-up)\b/g,
        ""
      )
      .replace(/\s+/g, " ")
      .trim();

  }

  static group(products: any[]): GalleryGroup[] {

    const map = new Map<string, any[]>();

    for (const product of products) {

      const key =
        this.normalize(product.name);

      if (!map.has(key))
        map.set(key, []);

      map.get(key)!.push(product);

    }

    return [...map.entries()].map(
      ([key, items]) => ({

        key,

        primary: items[0],

        gallery: items.map(p => p.image)

      })
    );

  }

}