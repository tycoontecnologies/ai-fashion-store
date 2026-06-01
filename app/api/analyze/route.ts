import { NextResponse } from "next/server";

const colors = [
  "Black",
  "White",
  "Olive Green",
  "Navy Blue",
  "Grey",
];

const categories = [
  "T-Shirt",
  "Shirt",
  "Polo Shirt",
  "Streetwear",
];

const styles = [
  "Minimal",
  "Casual",
  "Luxury",
  "Streetwear",
];

const occasions = [
  "Everyday Wear",
  "Office",
  "Weekend",
  "Travel",
];

const patterns = [
  "Solid",
  "Striped",
  "Graphic",
  "Textured",
];

function randomItem(
  array: string[]
) {
  return array[
    Math.floor(
      Math.random() *
      array.length
    )
  ];
}

export async function POST() {

  const color =
    randomItem(colors);

  const category =
    randomItem(categories);

  const style =
    randomItem(styles);

  const occasion =
    randomItem(occasions);

  const pattern =
    randomItem(patterns);

  return NextResponse.json({

    color,

    pattern,

    category,

    style,

    occasion,

    name:
      `${color} ${category}`,

    description:
      `Premium ${color.toLowerCase()} ${category.toLowerCase()} designed for ${occasion.toLowerCase()} with a ${style.toLowerCase()} aesthetic.`,

  });

}