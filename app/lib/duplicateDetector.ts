export interface DuplicateGroup {

  parentName: string;

  products: any[];

}

export class DuplicateDetector {

  static normalizeName(name: string) {

    return name
      .toLowerCase()
      .replace(
        /\b(black|white|olive|green|grey|gray|blue|navy|beige|red|maroon|brown)\b/g,
        ""
      )
      .replace(/\s+/g, " ")
      .trim();

  }

  static group(products: any[]) {

    const map = new Map<string, any[]>();

    products.forEach((product) => {

      const key =
        this.normalizeName(product.name);

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(product);

    });

    return [...map.entries()].map(
      ([parentName, products]) => ({
        parentName,
        products,
      })
    );

  }

}