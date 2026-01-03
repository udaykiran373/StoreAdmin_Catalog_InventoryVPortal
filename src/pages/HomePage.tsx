import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
          StoreAdmin Portal
        </h1>
        <p className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto">
          A centralized dashboard to organize, track, and explore your product inventory
          with clarity and speed.
        </p>
      </section>

      {/* Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <div className="rounded-2xl border border-dark-700 bg-dark-900 p-8 hover:shadow-xl transition">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-primary-500/10 text-primary-400">
              Inventory
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Product Inventory
          </h2>
          <p className="text-dark-300 mb-6 leading-relaxed">
            View all products in one place with essential details such as pricing,
            availability, brand, and category. Designed for fast lookup and easy analysis.
          </p>
          <Link
            to="/inventory"
            className="inline-flex items-center justify-center w-full py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition"
          >
            Go to Inventory
          </Link>
        </div>

        <div className="rounded-2xl border border-dark-700 bg-dark-900 p-8 hover:shadow-xl transition">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-accent-500/10 text-accent-400">
              Catalogue
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Category Catalogue
          </h2>
          <p className="text-dark-300 mb-6 leading-relaxed">
            Navigate products by category and understand how your inventory is structured.
            Ideal for browsing, grouping, and high-level insights.
          </p>
          <Link
            to="/catalogue"
            className="inline-flex items-center justify-center w-full py-3 rounded-lg bg-accent-600 hover:bg-accent-500 text-white font-medium transition"
          >
            Explore Catalogue
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-dark-900 border border-dark-700 rounded-2xl p-10">
        <h3 className="text-2xl font-semibold text-white mb-8">
          What You Can Do
        </h3>

        <div className="grid sm:grid-cols-2 gap-6 text-dark-200">
          <div className="flex gap-3">
            <span className="text-primary-400 font-bold">→</span>
            <p>
              Inspect complete product details including ratings, stock, and images.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-primary-400 font-bold">→</span>
            <p>
              Quickly find products using search, sorting, and filtering tools.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-primary-400 font-bold">→</span>
            <p>
              Browse inventory by category for structured analysis.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-primary-400 font-bold">→</span>
            <p>
              Use the portal seamlessly across desktop, tablet, and mobile devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
