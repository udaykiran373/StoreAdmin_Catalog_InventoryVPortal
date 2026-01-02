import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '../services/api';
import type { Product, SortOption, SortDirection } from '../types';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function InventoryOverview() {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch categories
  useEffect(() => {
    productApi
      .getCategories()
      .then((cats) => {
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
        }
      })
      .catch((err) => {
        console.error('Failed to load categories:', err);
        // Silently fail for categories, not critical
      });
  }, []);

  // Update selectedCategory when category param changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('all');
    }
  }, [category]);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    setError(null);
    setSkip(0);
    setHasMore(true);

    const fetchProducts = async () => {
      try {
        let response;
        if (selectedCategory && selectedCategory !== 'all') {
          response = await productApi.getProductsByCategory(selectedCategory, 100);
        } else {
          response = await productApi.getAllProducts(0, 20);
        }
        if (response && response.products && Array.isArray(response.products)) {
          setProducts(response.products);
          setAllProducts(response.products);
          setHasMore(response.products.length >= (response.limit || 20));
        } else {
          throw new Error('Invalid response format from API');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Search functionality with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts(allProducts);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await productApi.searchProducts(searchQuery, 100);
        if (response && response.products && Array.isArray(response.products)) {
          setProducts(response.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError(err instanceof Error ? err.message : 'Search failed');
        setProducts([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, allProducts]);

  // Load more products
  const loadMore = async () => {
    if (loadingMore || !hasMore || selectedCategory !== 'all') return;

    setLoadingMore(true);
    try {
      const response = await productApi.getAllProducts(skip + 20, 20);
      setProducts((prev) => [...prev, ...response.products]);
      setAllProducts((prev) => [...prev, ...response.products]);
      setSkip((prev) => prev + 20);
      setHasMore(response.products.length >= response.limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more products');
    } finally {
      setLoadingMore(false);
    }
  };

  // Sort products
  const sortedProducts = useMemo(() => {
    if (sortBy === 'none') return products;

    const sorted = [...products].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [products, sortBy, sortDirection]);

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {category ? `Category: ${category}` : 'Inventory Overview'}
          </h1>
          <p className="text-gray-600">Browse and manage your product inventory</p>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {category ? `Category: ${category}` : 'Inventory Overview'}
          </h1>
        </div>
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {category ? `Category: ${category}` : 'Inventory Overview'}
        </h1>
        <p className="text-gray-600">Browse and manage your product inventory</p>
      </div>

      {/* Filters and Search */}
      <div className="card p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => {
                const categoryName = typeof cat === 'string' ? cat : (cat.slug || cat.name || String(cat));
                const displayName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
                return (
                  <option key={categoryName} value={categoryName}>
                    {displayName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="none">None</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
              {sortBy !== 'none' && (
                <button
                  onClick={() =>
                    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                  }
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                >
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error banner if there's an error but products are shown */}
      {error && products.length > 0 && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Products List */}
      <div className="space-y-4 mb-6">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} showFullDetails />
          ))
        )}
      </div>

      {/* Load More */}
      {hasMore && selectedCategory === 'all' && !searchQuery && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? 'Loading...' : 'Load More Products'}
          </button>
        </div>
      )}

      {/* Results count */}
      <div className="text-center text-gray-600 mt-6">
        Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

