export default function ProductFlags() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <label><input type="checkbox"/> Featured</label>
      <label><input type="checkbox"/> Trending</label>
      <label><input type="checkbox"/> Best Seller</label>
      <label><input type="checkbox"/> New Arrival</label>
    </div>
  );
}
