export class ProductClassifier {

  static detectColor(name: string) {

    const text = name.toLowerCase();

    if (text.includes("black"))
      return "Black";

    if (text.includes("white"))
      return "White";

    if (text.includes("olive"))
      return "Olive";

    if (text.includes("green"))
      return "Green";

    if (text.includes("navy"))
      return "Navy";

    if (text.includes("blue"))
      return "Blue";

    if (text.includes("grey"))
      return "Grey";

    if (text.includes("gray"))
      return "Grey";

    if (text.includes("beige"))
      return "Beige";

    return "Unknown";

  }

  static detectCategory(name: string) {

    const text = name.toLowerCase();

    if (text.includes("tee"))
      return "T-Shirt";

    if (text.includes("shirt"))
      return "Shirt";

    if (text.includes("polo"))
      return "Polo Shirt";

    if (text.includes("hoodie"))
      return "Hoodie";

    if (text.includes("jacket"))
      return "Jacket";

    return "Fashion";

  }

}