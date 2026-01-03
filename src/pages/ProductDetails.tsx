import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productApi } from '../services/api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await productApi.getProductById(parseInt(id));
        setProduct(productData);

        // Fetch related products from same category
        const related = await productApi.getProductsByCategory(productData.category, 6);
        setRelatedProducts(
          related.products.filter((p) => p.id !== productData.id).slice(0, 5)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div>
        <ErrorMessage
          message={error || 'Product not found'}
          onRetry={() => window.location.reload()}
        />
        <div className="mt-4 text-center">
          <Link to="/inventory" className="btn-secondary">
            Back to Inventory
          </Link>
        </div>
      </div>
    );
  }

  const stockStatus = product.stock > 0 ? 'In Stock' : 'Out of Stock';
  const stockColor = product.stock > 0 ? 'text-accent-400' : 'text-red-400';

  return (
    <div>
      <Link
        to="/inventory"
        className="text-primary-400 hover:text-primary-300 mb-6 inline-block font-semibold transition-colors flex items-center gap-2"
      >
        <span>←</span> Back to Inventory
      </Link>

      <div className="card p-6 md:p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[currentImageIndex] || product.thumbnail}
                alt={product.title}
                className="w-full h-96 object-cover rounded-2xl border border-dark-600/50 shadow-2xl"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`border-2 rounded-xl overflow-hidden transition-all ${
                      currentImageIndex === index
                        ? 'border-primary-500 shadow-glow scale-105'
                        : 'border-dark-600/50 hover:border-primary-500/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">{product.title}</h1>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              {product.rating > 0 && (
                <div className="flex items-center gap-1 bg-dark-700/50 px-3 py-1.5 rounded-lg border border-dark-600/50">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-lg font-bold text-white">{product.rating.toFixed(1)}</span>
                </div>
              )}
              <span className="text-dark-500">|</span>
              <span className="text-dark-300 capitalize font-medium">{product.brand}</span>
              <span className="text-dark-500">|</span>
              <span className="text-dark-300 capitalize font-medium">{product.category}</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-extrabold text-gradient">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl text-accent-400 font-bold bg-accent-900/30 px-3 py-1 rounded-lg border border-accent-500/30">
                    {product.discountPercentage.toFixed(0)}% OFF
                  </span>
                )}
              </div>
              <p className={`font-bold text-lg ${stockColor} mb-4`}>
                {stockStatus} ({product.stock} units available)
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3 text-white">Description</h2>
              <p className="text-dark-300 leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-700/50 p-4 rounded-xl border border-dark-600/50">
                <p className="text-xs text-dark-400 mb-1 uppercase tracking-wide">Brand</p>
                <p className="font-bold text-white capitalize text-lg">{product.brand}</p>
              </div>
              <div className="bg-dark-700/50 p-4 rounded-xl border border-dark-600/50">
                <p className="text-xs text-dark-400 mb-1 uppercase tracking-wide">Category</p>
                <p className="font-bold text-white capitalize text-lg">{product.category}</p>
              </div>
              <div className="bg-dark-700/50 p-4 rounded-xl border border-dark-600/50">
                <p className="text-xs text-dark-400 mb-1 uppercase tracking-wide">Stock</p>
                <p className={`font-bold text-lg ${stockColor}`}>{product.stock} units</p>
              </div>
              <div className="bg-dark-700/50 p-4 rounded-xl border border-dark-600/50">
                <p className="text-xs text-dark-400 mb-1 uppercase tracking-wide">Rating</p>
                <p className="font-bold text-white text-lg">{product.rating.toFixed(1)} / 5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-extrabold mb-6 text-gradient">Browse Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

