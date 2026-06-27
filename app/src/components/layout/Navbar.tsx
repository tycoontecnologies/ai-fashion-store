export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-2xl font-black">
          GUESS360
        </a>

        <nav className="hidden md:flex gap-8 font-medium">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/collections/men">Men</a>
          <a href="/collections/women">Women</a>
          <a href="/style-quiz">AI Stylist</a>
        </nav>

        <div className="flex gap-4">
          <a href="/wishlist">♡</a>
          <a href="/cart">🛒</a>
          <a href="/login">Login</a>
        </div>
      </div>
    </header>
  );
}
