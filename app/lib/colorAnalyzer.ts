export function detectColor(
  fileName: string
) {

  const name =
    fileName.toLowerCase();

  if (
    name.includes("black")
  ) {
    return "Black";
  }

  if (
    name.includes("white")
  ) {
    return "White";
  }

  if (
    name.includes("green") ||
    name.includes("olive")
  ) {
    return "Olive Green";
  }

  if (
    name.includes("blue")
  ) {
    return "Navy Blue";
  }

  if (
    name.includes("grey") ||
    name.includes("gray")
  ) {
    return "Grey";
  }

  return "Unknown";
}