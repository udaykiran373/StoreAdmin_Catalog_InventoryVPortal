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
  const stockColor = product.stock > 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div>
      <Link
        to="/inventory"
        className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
      >
        ← Back to Inventory
      </Link>

      <div className="card p-6 md:p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[currentImageIndex] || product.thumbnail}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      currentImageIndex === index
                        ? 'border-primary-600'
                        : 'border-gray-200 hover:border-gray-300'
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
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              {product.rating > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="text-lg font-semibold">{product.rating.toFixed(1)}</span>
                </div>
              )}
              <span className="text-gray-500">|</span>
              <span className="text-gray-600 capitalize">{product.brand}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600 capitalize">{product.category}</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-primary-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-lg text-green-600 font-semibold">
                    {product.discountPercentage.toFixed(0)}% OFF
                  </span>
                )}
              </div>
              <p className={`font-semibold ${stockColor} mb-4`}>
                {stockStatus} ({product.stock} units available)
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Brand</p>
                <p className="font-semibold capitalize">{product.brand}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="font-semibold capitalize">{product.category}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Stock</p>
                <p className={`font-semibold ${stockColor}`}>{product.stock} units</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Rating</p>
                <p className="font-semibold">{product.rating.toFixed(1)} / 5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse Similar Products</h2>
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

