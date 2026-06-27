export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">

      <h1 className="text-5xl font-bold mb-10">
        Checkout
      </h1>

      <form className="space-y-6">

        <input
          placeholder="Full Name"
          className="w-full border p-4 rounded-xl"
        />

        <input
          placeholder="Phone Number"
          className="w-full border p-4 rounded-xl"
        />

        <input
          placeholder="Address"
          className="w-full border p-4 rounded-xl"
        />

        <button
          className="bg-[#d6aa5a] px-8 py-4 rounded-full font-bold"
        >
          Place Order
        </button>

      </form>

    </div>
  )
}
