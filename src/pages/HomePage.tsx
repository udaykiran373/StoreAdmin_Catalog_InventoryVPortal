import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary-700 mb-4">
          Welcome to StoreAdmin
        </h1>
        <p className="text-xl text-gray-600">
          Your comprehensive catalog inventory management portal
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card p-8">
          <div className="text-primary-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Inventory Overview</h2>
          <p className="text-gray-600 mb-6">
            Browse and manage your complete product inventory. View all products with detailed
            information including price, brand, category, and stock status. Sort, filter, and
            search through your catalog efficiently.
          </p>
          <Link to="/inventory" className="btn-primary inline-block text-center w-full">
            View Inventory
          </Link>
        </div>

        <div className="card p-8">
          <div className="text-primary-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Catalogue Overview</h2>
          <p className="text-gray-600 mb-6">
            Explore your product catalog by category. Get a high-level view of all available
            categories and drill down into specific product groups. Perfect for organizing and
            analyzing your inventory structure.
          </p>
          <Link to="/catalogue" className="btn-primary inline-block text-center w-full">
            Browse Catalogue
          </Link>
        </div>
      </div>

      <div className="card p-8 bg-primary-50">
        <h2 className="text-2xl font-bold mb-4 text-primary-800">Key Features</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>
              <strong>Comprehensive Product View:</strong> See all product details including name,
              price, brand, category, and stock status
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>
              <strong>Smart Organization:</strong> Sort by price or name, filter by category, and
              search for specific products
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>
              <strong>Detailed Product Pages:</strong> View complete product information with
              images, descriptions, ratings, and related products
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>
              <strong>Category Navigation:</strong> Browse products by category with an intuitive
              hierarchical view
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>
              <strong>Responsive Design:</strong> Access your inventory from any device - desktop,
              tablet, or mobile
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

