import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  showFullDetails?: boolean;
}

export default function ProductCard({ product, showFullDetails = false }: ProductCardProps) {
  const stockStatus = product.stock > 0 ? 'In Stock' : 'Out of Stock';
  const stockColor = product.stock > 0 ? 'text-green-600' : 'text-red-600';

  if (showFullDetails) {
    return (
      <Link to={`/product/${product.id}`} className="card p-6 block">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full md:w-48 h-48 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-500">Price:</span>
                <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-gray-500">Brand:</span>
                <p className="font-semibold">{product.brand}</p>
              </div>
              <div>
                <span className="text-gray-500">Category:</span>
                <p className="font-semibold capitalize">{product.category}</p>
              </div>
              <div>
                <span className="text-gray-500">Stock:</span>
                <p className={`font-semibold ${stockColor}`}>{stockStatus}</p>
                <p className="text-xs text-gray-500">({product.stock} units)</p>
              </div>
            </div>
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                <span className="text-sm">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Compact card view for related products
  return (
    <Link to={`/product/${product.id}`} className="card p-4 block hover:scale-105 transition-transform">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h4 className="font-semibold text-sm mb-2 line-clamp-2">{product.title}</h4>
      <p className="text-lg font-bold text-primary-600">${product.price.toFixed(2)}</p>
    </Link>
  );
}

