import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  showFullDetails?: boolean;
}

export default function ProductCard({ product, showFullDetails = false }: ProductCardProps) {
  const stockStatus = product.stock > 0 ? 'In Stock' : 'Out of Stock';
  const stockColor = product.stock > 0 ? 'text-accent-400' : 'text-red-400';

  if (showFullDetails) {
    return (
      <Link to={`/product/${product.id}`} className="card p-6 block group">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full md:w-48 h-48 object-cover rounded-xl border border-dark-600/50 group-hover:border-primary-500/50 transition-colors"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary-300 transition-colors">{product.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-dark-700/50 p-3 rounded-xl border border-dark-600/50">
                <span className="text-dark-400 text-xs block mb-1">Price</span>
                <p className="font-bold text-lg text-primary-400">${product.price.toFixed(2)}</p>
              </div>
              <div className="bg-dark-700/50 p-3 rounded-xl border border-dark-600/50">
                <span className="text-dark-400 text-xs block mb-1">Brand</span>
                <p className="font-semibold text-white capitalize">{product.brand}</p>
              </div>
              <div className="bg-dark-700/50 p-3 rounded-xl border border-dark-600/50">
                <span className="text-dark-400 text-xs block mb-1">Category</span>
                <p className="font-semibold text-white capitalize">{product.category}</p>
              </div>
              <div className="bg-dark-700/50 p-3 rounded-xl border border-dark-600/50">
                <span className="text-dark-400 text-xs block mb-1">Stock</span>
                <p className={`font-bold ${stockColor}`}>{stockStatus}</p>
                <p className="text-xs text-dark-400 mt-1">({product.stock} units)</p>
              </div>
            </div>
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-white font-semibold">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Compact card view for related products
  return (
    <Link to={`/product/${product.id}`} className="card p-4 block group">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-xl mb-3 border border-dark-600/50 group-hover:border-primary-500/50 transition-all group-hover:scale-105"
      />
      <h4 className="font-semibold text-sm mb-2 line-clamp-2 text-white group-hover:text-primary-300 transition-colors">{product.title}</h4>
      <p className="text-lg font-bold text-gradient">${product.price.toFixed(2)}</p>
    </Link>
  );
}

