import axios from 'axios';
import type { Product, ProductsResponse } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productApi = {
  // Get all products with pagination
  getAllProducts: async (skip: number = 0, limit: number = 20): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>(
        `/products?skip=${skip}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get a single product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get('/products/categories');
      // Handle different response formats
      let categories: any[] = [];
      
      if (Array.isArray(response.data)) {
        categories = response.data;
      } else if (response.data && Array.isArray(response.data.categories)) {
        categories = response.data.categories;
      } else if (typeof response.data === 'object' && response.data !== null) {
        categories = Object.values(response.data);
      }
      
      // Extract category names/slugs from objects
      return categories.map((cat) => {
        if (typeof cat === 'string') {
          return cat;
        } else if (cat && typeof cat === 'object') {
          // Handle {slug, name, url} format
          return cat.slug || cat.name || String(cat);
        }
        return String(cat);
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (
    category: string,
    limit: number = 6
  ): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>(
        `/products/category/${encodeURIComponent(category)}?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query: string, limit: number = 20): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>(
        `/products/search?q=${encodeURIComponent(query)}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
};

