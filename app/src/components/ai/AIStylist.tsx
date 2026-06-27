export default function AIStylist() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="rounded-3xl bg-black text-white p-12">
        <h2 className="text-5xl font-black mb-4">
          AI Stylist
        </h2>

        <p className="text-xl text-gray-300">
          Get personalized fashion recommendations instantly.
        </p>

        <a
          href="/style-quiz"
          className="inline-block mt-8 px-8 py-4 rounded-full bg-[#d6aa5a] text-black font-bold"
        >
          Start AI Styling
        </a>
      </div>
    </section>
  );
}
