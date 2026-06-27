const categories = [
  "Men",
  "Women",
  "Streetwear",
  "Hoodies",
  "T-Shirts",
  "Denim",
  "Jackets",
  "Activewear"
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-8 text-center font-bold shadow"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
