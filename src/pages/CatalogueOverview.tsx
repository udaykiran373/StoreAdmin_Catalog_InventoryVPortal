import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function CatalogueOverview() {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const cats = await productApi.getCategories();
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
        } else {
          throw new Error('No categories found');
        }

        // Fetch a sample product from each category to get an image
        const imagePromises = cats.map(async (category) => {
          try {
            const response = await productApi.getProductsByCategory(category, 1);
            if (response.products.length > 0) {
              return { category, image: response.products[0].thumbnail };
            }
          } catch {
            // Ignore errors for individual category images
          }
          return { category, image: null };
        });

        const images = await Promise.all(imagePromises);
        const imageMap: Record<string, string> = {};
        images.forEach(({ category, image }) => {
          if (image) {
            imageMap[category] = image;
          }
        });
        setCategoryImages(imageMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catalogue Overview</h1>
          <p className="text-gray-600">Browse products by category</p>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catalogue Overview</h1>
        </div>
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gradient">Catalogue Overview</h1>
        <p className="text-dark-300 text-lg">
          Browse products by category. Click on a category to view all products in that category.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          // Handle both string and object category formats
          const categorySlug = typeof category === 'string' 
            ? category 
            : (category as any)?.slug || (category as any)?.name || String(category);
          const categoryName = typeof category === 'string' 
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : ((category as any)?.name || (category as any)?.slug || String(category));
          const displayName = typeof categoryName === 'string' 
            ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
            : String(categoryName);
          
          return (
            <Link
              key={categorySlug}
              to={`/catalogue/${categorySlug}`}
              className="card p-6 text-center group hover:border-primary-500/50"
            >
              {categoryImages[categorySlug] ? (
                <img
                  src={categoryImages[categorySlug]}
                  alt={displayName}
                  className="w-full h-48 object-cover rounded-xl mb-4 border border-dark-600/50 group-hover:border-primary-500/50 transition-all group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-48 bg-dark-700/50 rounded-xl mb-4 flex items-center justify-center border border-dark-600/50 group-hover:border-primary-500/50 transition-colors">
                  <svg
                    className="w-16 h-16 text-dark-400 group-hover:text-primary-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <h3 className="text-lg font-bold capitalize text-white group-hover:text-primary-300 transition-colors">{displayName}</h3>
            </Link>
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No categories found</p>
        </div>
      )}
    </div>
  );
}

